from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
import base64
import torch
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import logging
import os
import gc
import psutil

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="DVisionAI", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model variables
model = None
processor = None
device = None

def get_memory_usage():
    """Get current memory usage in MB"""
    process = psutil.Process(os.getpid())
    return process.memory_info().rss / 1024 / 1024

def force_garbage_collection():
    """Force garbage collection and clear PyTorch cache"""
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
    logger.info(f"Memory after GC: {get_memory_usage():.2f} MB")

def initialize_model():
    """Initialize the BLIP model with maximum memory optimization"""
    global model, processor, device
    
    try:
        logger.info("🚀 Loading BLIP model with memory optimization...")
        logger.info(f"Initial memory: {get_memory_usage():.2f} MB")
        
        # Force CPU only
        device = torch.device("cpu")
        logger.info(f"✅ Using device: {device}")

        # Clear memory before loading
        force_garbage_collection()

        # Load processor first (lightweight)
        logger.info("Loading processor...")
        processor = BlipProcessor.from_pretrained(
            "Salesforce/blip-image-captioning-base",
            local_files_only=False  # Allow downloading if needed
        )
        logger.info(f"Memory after processor: {get_memory_usage():.2f} MB")

        # Load model with maximum memory optimization
        logger.info("Loading model with memory optimization...")
        
        # Use float16 to halve memory usage
        model = BlipForConditionalGeneration.from_pretrained(
            "Salesforce/blip-image-captioning-base",
            torch_dtype=torch.float16,  # Use half precision - CRITICAL for memory
            low_cpu_mem_usage=True,
            device_map=None,  # Don't use device map on CPU
        )
        
        # Move to device and set to eval
        model.to(device)
        model.eval()
        
        logger.info(f"Memory after model load: {get_memory_usage():.2f} MB")
        
        # Force garbage collection after model load
        force_garbage_collection()
        
        logger.info("✅ Model initialized successfully with memory optimization")
        
    except Exception as e:
        logger.exception(f"❌ Failed to load model: {e}")
        # Clear everything if failed - no need for global declaration here
        model = None
        processor = None
        force_garbage_collection()
        raise

@app.on_event("startup")
async def startup_event():
    """Initialize model on startup with retry logic"""
    max_retries = 3
    for attempt in range(max_retries):
        try:
            logger.info(f"Startup attempt {attempt + 1}/{max_retries}")
            initialize_model()
            break
        except Exception as e:
            logger.error(f"Attempt {attempt + 1} failed: {e}")
            if attempt == max_retries - 1:
                logger.error("All startup attempts failed")
                raise
            # Wait before retry
            import asyncio
            await asyncio.sleep(2)

@app.get("/")
async def root():
    return {"message": "DVisionAI Backend API is running!"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    memory_usage = get_memory_usage()
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "device": str(device),
        "memory_usage_mb": round(memory_usage, 2),
        "cuda_available": torch.cuda.is_available()
    }

def format_image_generation_prompt(description: str) -> str:
    """Convert a description into a proper text-to-image generation prompt"""
    description = description.strip()
    prompt_parts = [
        "high quality, detailed, professional photography",
        description,
        "sharp focus, excellent composition, vibrant colors"
    ]
    return ", ".join(prompt_parts)

def optimize_memory_before_processing():
    """Clear memory before processing each request"""
    force_garbage_collection()

@app.post("/generate-caption")
async def generate_caption(file: UploadFile = File(...)):
    """Generate caption with memory optimization"""
    try:
        if model is None or processor is None:
            raise HTTPException(status_code=503, detail="Model not loaded")

        # Optimize memory before processing
        optimize_memory_before_processing()
        
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Resize large images to reduce memory usage
        max_size = (512, 512)
        if image.size[0] > max_size[0] or image.size[1] > max_size[1]:
            image.thumbnail(max_size, Image.Resampling.LANCZOS)
            logger.info(f"Resized image to: {image.size}")

        logger.info(f"Processing image: {file.filename}, size: {image.size}")
        logger.info(f"Memory before processing: {get_memory_usage():.2f} MB")

        with torch.no_grad():
            # Use smaller parameters to save memory
            inputs = processor(images=image, return_tensors="pt")
            inputs = {k: v.to(device) for k, v in inputs.items()}
            
            # Generate only one caption to save memory
            out = model.generate(
                **inputs,
                max_length=100,  # Reduced from 150
                num_beams=3,     # Reduced from 5
                early_stopping=True,
                temperature=0.7,
                do_sample=False,  # Disable sampling to save memory
                repetition_penalty=1.1
            )
            
            caption = processor.decode(out[0], skip_special_tokens=True)
            
            # Use the same caption for both to avoid second generation
            detailed_description = caption
            image_generation_prompt = format_image_generation_prompt(caption)

        logger.info(f"Memory after processing: {get_memory_usage():.2f} MB")
        logger.info(f"Caption: {caption}")

        # Clean up
        force_garbage_collection()

        return {
            "caption": caption,
            "detailed_description": detailed_description,
            "image_generation_prompt": image_generation_prompt,
            "image_size": {"width": image.width, "height": image.height}
        }

    except Exception as e:
        logger.exception("Error generating caption")
        force_garbage_collection()
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/generate-caption-base64")
async def generate_caption_base64(data: dict):
    """Generate caption from base64 with memory optimization"""
    try:
        if model is None or processor is None:
            raise HTTPException(status_code=503, detail="Model not loaded")

        if "image" not in data:
            raise HTTPException(status_code=400, detail="No image provided")

        # Optimize memory before processing
        optimize_memory_before_processing()

        base64_string = data["image"].split(",")[-1]
        image_bytes = base64.b64decode(base64_string)
        image_data = io.BytesIO(image_bytes)
        image = Image.open(image_data).convert("RGB")
        
        # Resize large images
        max_size = (512, 512)
        if image.size[0] > max_size[0] or image.size[1] > max_size[1]:
            image.thumbnail(max_size, Image.Resampling.LANCZOS)

        logger.info(f"Processing base64 image, size: {image.size}")
        logger.info(f"Memory before processing: {get_memory_usage():.2f} MB")

        with torch.no_grad():
            # Single generation to save memory
            inputs = processor(images=image, return_tensors="pt")
            inputs = {k: v.to(device) for k, v in inputs.items()}
            
            out = model.generate(
                **inputs,
                max_length=100,
                num_beams=3,
                early_stopping=True,
                temperature=0.7,
                do_sample=False,
                repetition_penalty=1.1
            )
            
            caption = processor.decode(out[0], skip_special_tokens=True)
            detailed_description = caption
            image_generation_prompt = format_image_generation_prompt(caption)

        logger.info(f"Memory after processing: {get_memory_usage():.2f} MB")

        # Clean up
        force_garbage_collection()

        return {
            "caption": caption,
            "detailed_description": detailed_description,
            "image_generation_prompt": image_generation_prompt,
            "image_size": {"width": image.width, "height": image.height}
        }

    except Exception as e:
        logger.exception("Error generating caption: base64")
        force_garbage_collection()
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, workers=1)  # Single worker to save memory