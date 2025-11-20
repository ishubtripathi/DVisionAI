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
    # allow_origins=["*"],
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend.vercel.app"
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
        # model = BlipForConditionalGeneration.from_pretrained(
        #     "Salesforce/blip-image-captioning-large",
        #     torch_dtype=torch.float32
        # )
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

        # Instruction to produce a detailed prompt suitable for image generation
        instruction = (
            "Provide a detailed image-generation prompt suitable for a text-to-image model. "
            "Include subject, scene, colors, lighting, mood, composition, camera/lens details, "
            "materials/textures, clothing/styles (if any), art/style references, and suggested aspect ratio. "
            "Keep it precise and comma-separated."
        )

        with torch.no_grad():
            # Short caption (regular image caption)
            inputs_short = processor(images=image, return_tensors="pt")
            inputs_short = {k: v.to(device) for k, v in inputs_short.items()}
            out_short = model.generate(**inputs_short, max_length=50, num_beams=5, early_stopping=True)
            caption = processor.decode(out_short[0], skip_special_tokens=True)

            # Detailed prompt (condition on same image + instruction text)
            inputs_prompt = processor(images=image, text=instruction, return_tensors="pt")
            inputs_prompt = {k: v.to(device) for k, v in inputs_prompt.items()}
            out_prompt = model.generate(
                **inputs_prompt,
                max_length=220,
                num_beams=5,
                no_repeat_ngram_size=3,
                early_stopping=True
            )
            detailed_prompt = processor.decode(out_prompt[0], skip_special_tokens=True)

        logger.info(f"Caption: {caption}")
        logger.info(f"Detailed prompt: {detailed_prompt}")

        return {
            "caption": caption,
            "detailed_prompt": detailed_prompt,
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

        instruction = (
            "Provide a detailed image-generation prompt suitable for a text-to-image model. "
            "Include subject, scene, colors, lighting, mood, composition, camera/lens details, "
            "materials/textures, clothing/styles (if any), art/style references, and suggested aspect ratio. "
            "Keep it precise and comma-separated."
        )

        with torch.no_grad():
            inputs_short = processor(images=image, return_tensors="pt")
            inputs_short = {k: v.to(device) for k, v in inputs_short.items()}
            out_short = model.generate(**inputs_short, max_length=50, num_beams=5, early_stopping=True)
            caption = processor.decode(out_short[0], skip_special_tokens=True)

            inputs_prompt = processor(images=image, text=instruction, return_tensors="pt")
            inputs_prompt = {k: v.to(device) for k, v in inputs_prompt.items()}
            out_prompt = model.generate(
                **inputs_prompt,
                max_length=220,
                num_beams=5,
                no_repeat_ngram_size=3,
                early_stopping=True
            )
            detailed_prompt = processor.decode(out_prompt[0], skip_special_tokens=True)

        logger.info(f"Caption: {caption}")
        logger.info(f"Detailed prompt: {detailed_prompt}")

        return {
            "caption": caption,
            "detailed_prompt": detailed_prompt,
            "image_size": {"width": image.width, "height": image.height}
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Error generating caption: base64")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")


if __name__ == "__main__":
    # import uvicorn
    # uvicorn.run(app, host="0.0.0.0", port=8000)
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
