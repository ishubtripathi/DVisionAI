export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
const rawBackend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export const BACKEND_URL = rawBackend.replace("localhost", "127.0.0.1");

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    console.log("📌 Received base64 length:", image.length);

    // Extract base64 content
    const base64Data = image.split(",")[1] || image;
    if (!base64Data) {
      throw new Error("Invalid base64 image data");
    }

    console.log("📌 Sending to backend:", BACKEND_URL);

    // Call the base64 endpoint with JSON
    const backendResponse = await fetch(`${BACKEND_URL}/generate-caption-base64`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: `data:image/jpeg;base64,${base64Data}` // Send as proper base64 data URL
      }),
    });

    console.log("📌 Backend status:", backendResponse.status);

    if (!backendResponse.ok) {
      const text = await backendResponse.text();
      console.error("❌ Backend error:", text);
      return NextResponse.json(
        { error: text || "Backend error" },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    console.log("✅ Backend response:", data); // Debug the full response
    
    // Log all the fields we're getting from backend
    console.log("✅ Caption:", data.caption);
    console.log("✅ Detailed Description:", data.detailed_description);
    console.log("✅ Image Generation Prompt:", data.image_generation_prompt);
    
    // Forward the exact response from backend to frontend
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("🔥 Route error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}