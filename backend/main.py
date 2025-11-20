from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
import base64
import torch
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="DVisionAI", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend.vercel.app"
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model variables
model = None
processor = None
device = None


def initialize_model():
    """Initialize the BLIP model and processor on startup"""
    global model, processor, device

    try:
        logger.info("🚀 Loading BLIP model and processor...")

        # Determine device
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        logger.info(f"✅ Using device: {device}")

        # Load processor and model
        logger.info("Loading processor...")
        processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
        logger.info("✅ Processor loaded")

        logger.info("Loading model...")
        model = BlipForConditionalGeneration.from_pretrained(
            "Salesforce/blip-image-captioning-large",
            torch_dtype=torch.float32,
            low_cpu_mem_usage=True
        )
        logger.info("✅ Model loaded")

        # Move model to device
        model.to(device)
        model.eval()

        logger.info("✅ Model initialized successfully on {}".format(device))
    except Exception as e:
        logger.exception(f"❌ Failed to load model: {e}")
        raise


@app.on_event("startup")
async def startup_event():
    import asyncio
    """Initialize model on startup"""
    await asyncio.sleep(1)
    initialize_model()


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "device": str(device),
        "cuda_available": torch.cuda.is_available()
    }


def format_image_generation_prompt(description: str) -> str:
    """Convert a description into a proper text-to-image generation prompt"""
    # Clean the description
    description = description.strip()
    
    # Remove any repeated phrases and make it more prompt-like
    prompt_parts = []
    
    # Add quality and style indicators
    prompt_parts.append("high quality, detailed, professional photography")
    
    # Use the main description
    prompt_parts.append(description)
    
    # Add technical specifications for image generation
    prompt_parts.append("sharp focus, excellent composition, vibrant colors")
    
    # Join all parts
    full_prompt = ", ".join(prompt_parts)
    
    return full_prompt


@app.post("/generate-caption")
async def generate_caption(file: UploadFile = File(...)):
    """
    Generate a detailed caption and a detailed text-to-image prompt for the uploaded image
    """
    try:
        if model is None or processor is None or device is None:
            raise HTTPException(status_code=503, detail="Model not loaded")

        if not file.filename:
            raise HTTPException(status_code=400, detail="No filename provided")

        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        logger.info(f"Processing image: {file.filename}, size: {image.size}")

        with torch.no_grad():
            # Short caption (regular image caption)
            inputs_short = processor(images=image, return_tensors="pt")
            inputs_short = {k: v.to(device) for k, v in inputs_short.items()}
            out_short = model.generate(
                **inputs_short, 
                max_length=50, 
                num_beams=5, 
                early_stopping=True
            )
            caption = processor.decode(out_short[0], skip_special_tokens=True)

            # Generate detailed description for image generation
            text_prompt = "a detailed scene description:"
            inputs_prompt = processor(images=image, text=text_prompt, return_tensors="pt")
            inputs_prompt = {k: v.to(device) for k, v in inputs_prompt.items()}
            
            out_prompt = model.generate(
                **inputs_prompt,
                max_length=150,
                num_beams=4,
                no_repeat_ngram_size=2,
                early_stopping=True,
                temperature=0.8,
                do_sample=True,
                repetition_penalty=1.1
            )
            detailed_description = processor.decode(out_prompt[0], skip_special_tokens=True)

            # Clean up the detailed description
            if detailed_description.startswith("a detailed scene description:"):
                detailed_description = detailed_description.replace("a detailed scene description:", "").strip()

            # Format as a proper text-to-image generation prompt
            image_generation_prompt = format_image_generation_prompt(detailed_description)

        logger.info(f"Short Caption: {caption}")
        logger.info(f"Detailed Description: {detailed_description}")
        logger.info(f"Image Generation Prompt: {image_generation_prompt}")

        return {
            "caption": caption,
            "detailed_description": detailed_description,
            "image_generation_prompt": image_generation_prompt,
            "image_size": {"width": image.width, "height": image.height}
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Error generating caption")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")


@app.post("/generate-caption-base64")
async def generate_caption_base64(data: dict):
    """
    Generate a detailed caption and a detailed prompt from a base64 image
    """
    try:
        if model is None or processor is None or device is None:
            raise HTTPException(status_code=503, detail="Model not loaded")

        if "image" not in data:
            raise HTTPException(status_code=400, detail="No image provided")

        base64_string = data["image"].split(",")[-1]
        image_bytes = base64.b64decode(base64_string)
        image_data = io.BytesIO(image_bytes)
        image = Image.open(image_data).convert("RGB")

        logger.info(f"Processing base64 image, size: {image.size}")

        with torch.no_grad():
            # Short caption
            inputs_short = processor(images=image, return_tensors="pt")
            inputs_short = {k: v.to(device) for k, v in inputs_short.items()}
            out_short = model.generate(
                **inputs_short, 
                max_length=50, 
                num_beams=5, 
                early_stopping=True
            )
            caption = processor.decode(out_short[0], skip_special_tokens=True)

            # Generate detailed description for image generation
            text_prompt = "a detailed scene description:"
            inputs_prompt = processor(images=image, text=text_prompt, return_tensors="pt")
            inputs_prompt = {k: v.to(device) for k, v in inputs_prompt.items()}
            
            out_prompt = model.generate(
                **inputs_prompt,
                max_length=150,
                num_beams=4,
                no_repeat_ngram_size=2,
                early_stopping=True,
                temperature=0.8,
                do_sample=True,
                repetition_penalty=1.1
            )
            detailed_description = processor.decode(out_prompt[0], skip_special_tokens=True)

            # Clean up the detailed description
            if detailed_description.startswith("a detailed scene description:"):
                detailed_description = detailed_description.replace("a detailed scene description:", "").strip()

            # Format as a proper text-to-image generation prompt
            image_generation_prompt = format_image_generation_prompt(detailed_description)

        logger.info(f"Short Caption: {caption}")
        logger.info(f"Detailed Description: {detailed_description}")
        logger.info(f"Image Generation Prompt: {image_generation_prompt}")

        return {
            "caption": caption,
            "detailed_description": detailed_description,
            "image_generation_prompt": image_generation_prompt,
            "image_size": {"width": image.width, "height": image.height}
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Error generating caption: base64")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)