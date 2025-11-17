export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
const rawBackend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export const BACKEND_URL = rawBackend.replace("localhost", "127.0.0.1");

// const BACKEND_URL =
//   process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

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

    // Convert base64 to Buffer
    const buffer = Buffer.from(base64Data, "base64");
    console.log("📌 Buffer size:", buffer.length);

    // Create FormData with File (NOT JSON)
    const formData = new FormData();
    const file = new File([buffer], "image.jpg", { type: "image/jpeg" });
    formData.append("file", file);

    console.log("📌 Sending to backend:", BACKEND_URL);

    const backendResponse = await fetch(`${BACKEND_URL}/generate-caption`, {
      method: "POST",
      body: formData, // Send FormData directly, not JSON
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
    console.log("✅ Caption:", data.caption);
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("🔥 Route error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}