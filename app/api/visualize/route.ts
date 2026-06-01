import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export const maxDuration = 300;

interface VisualizeBody {
  roomImageBase64: string;
  productName: string;
  productDescription: string;
}

function cloudinarySignature(params: Record<string, string>, secret: string): string {
  const paramString = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(paramString + secret).digest("hex");
}

async function uploadToCloudinary(base64Image: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary configuration missing");
  }

  const timestamp = String(Math.round(Date.now() / 1000));
  const folder = "ai-visualizer";
  const signature = cloudinarySignature({ folder, timestamp }, apiSecret);

  // Cloudinary requires application/x-www-form-urlencoded when the file is a
  // base64 data URI — multipart/form-data does not support data URI file values.
  const params = new URLSearchParams();
  params.append("file", base64Image);
  params.append("api_key", apiKey);
  params.append("timestamp", timestamp);
  params.append("folder", folder);
  params.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: params }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary upload failed: ${text}`);
  }

  const json = await res.json();
  return json.secure_url as string;
}

async function runReplicateKontext(
  imageUrl: string,
  productName: string,
  productDescription: string
): Promise<string> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error("REPLICATE_API_TOKEN not configured");

  const prompt = [
    `A photorealistic interior photograph of the exact same room with a ${productDescription} placed naturally in the space.`,
    `The ${productName} is positioned to suit the room's layout, fitting the scale, perspective, and lighting perfectly.`,
    `The room's walls, flooring, ceiling, windows, existing furniture, and all decor remain completely identical to the original photo.`,
    `Only the ${productName} has been added. The new furniture integrates seamlessly with the room's existing style and light conditions.`,
    `Ultra-realistic interior photography, 4K quality, professional home staging. Do not add any other objects or change anything about the room.`,
  ].join(" ");

  const createRes = await fetch(
    "https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-pro/predictions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        input: {
          prompt,
          input_image: imageUrl,
          aspect_ratio: "match_input_image",
          output_format: "jpg",
          output_quality: 90,
          safety_tolerance: 5,
        },
      }),
    }
  );

  if (!createRes.ok) {
    const text = await createRes.text();
    throw new Error(`Replicate API error: ${text}`);
  }

  const prediction = await createRes.json();

  // "Prefer: wait" makes Replicate wait up to 60s synchronously
  if (prediction.status === "succeeded") {
    return extractOutput(prediction.output);
  }

  if (prediction.status === "failed" || prediction.status === "canceled") {
    throw new Error(`Replicate prediction ${prediction.status}: ${prediction.error ?? ""}`);
  }

  // Poll for remaining time
  const predictionId = prediction.id;
  for (let attempt = 0; attempt < 48; attempt++) {
    await sleep(5000);

    const pollRes = await fetch(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!pollRes.ok) continue;

    const status = await pollRes.json();

    if (status.status === "succeeded") return extractOutput(status.output);

    if (status.status === "failed" || status.status === "canceled") {
      throw new Error(
        `Replicate prediction ${status.status}: ${status.error ?? "Unknown error"}`
      );
    }
  }

  throw new Error("Replicate prediction timed out after 4 minutes");
}

function extractOutput(output: unknown): string {
  if (Array.isArray(output)) return output[0] as string;
  if (typeof output === "string") return output;
  throw new Error("Unexpected Replicate output format");
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(request: NextRequest) {
  try {
    let body: VisualizeBody;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { roomImageBase64, productName, productDescription } = body;

    if (!roomImageBase64 || !productName || !productDescription) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!roomImageBase64.startsWith("data:image/")) {
      return NextResponse.json(
        { success: false, error: "Invalid image format" },
        { status: 400 }
      );
    }

    const imageUrl = await uploadToCloudinary(roomImageBase64);
    const resultUrl = await runReplicateKontext(imageUrl, productName, productDescription);

    return NextResponse.json({ success: true, data: { resultUrl } });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[visualize] Error:", message);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        success: false,
        error: isDev
          ? message
          : "Failed to generate visualization. Please try again.",
      },
      { status: 500 }
    );
  }
}
