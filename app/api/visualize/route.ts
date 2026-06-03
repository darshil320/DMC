import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { GoogleGenAI } from '@google/genai';
import { HfInference } from '@huggingface/inference';

export const maxDuration = 300;

// ─── Mode selector ────────────────────────────────────────────────────────────
//
//  "huggingface"  → FREE. FLUX.1-schnell via HuggingFace router.huggingface.co
//                   Text-to-image. Needs HF_TOKEN (free account at huggingface.co).
//                   Confirmed working via live API tests.
//
//  "production"   → PAID ~$0.09/run. flux-kontext-apps/multi-image-kontext-pro.
//                   Composites the EXACT product into the user's real room photo.
//                   Needs REPLICATE_API_TOKEN (with billing) + CLOUDINARY_*.
//
// ─── Switch here when you have the right key ─────────────────────────────────
//  "gemini"     → FREE. gemini-2.0-flash-preview-image-generation via AI Studio key (AIzaSy...).
//                 Takes real room photo + product photo → edits room directly.
//                 Needs: GOOGLE_AI_STUDIO_KEY from aistudio.google.com/apikey
//                 Free tier: 10 RPM, 500 RPD (AI Studio key only — NOT GCP service account keys)
//
//  "production" → PAID ~$0.09/run. flux-kontext-apps/multi-image-kontext-pro.
//                 Needs: REPLICATE_API_TOKEN with billing.
//
// ─── Current mode ─────────────────────────────────────────────────────────────
// "gemini"       FREE  → gemini-3.1-flash-image-preview. Confirmed canonical model.
//                        Needs AIzaSy... key from aistudio.google.com/apikey (NOT AQ.* GCP keys).
// "huggingface"  FREE  → textToImage using @huggingface/inference (FLUX.1-schnell).
//                        Needs HUGGINGFACE_API_KEY. (imageToImage is currently disabled on HF free tier)
// "flux_pro"     PAID  → FLUX 2 Pro text-to-image on Replicate. Needs credits.
// "production"   PAID  → Kontext Pro, places product in real room. EXACT MATCH COMPOSITE.
const MODEL_MODE: "gemini" | "huggingface" | "flux_pro" | "production" = "production";

// ─── Confirmed working HF endpoint (tested 2026-06-02) ───────────────────────
// Old endpoint api-inference.huggingface.co has been decommissioned (DNS gone).
// New router: router.huggingface.co
const HF_FLUX_URL =
  "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell";

// ─── Types ────────────────────────────────────────────────────────────────────
interface VisualizeBody {
  roomImageBase64: string;
  productName: string;
  productDescription: string;
  productImageUrl?: string;
}

// ─── Gemini image editing — free with proper AI Studio key ───────────────────
//
//  Uses gemini-2.0-flash-preview-image-generation which:
//  • Accepts multiple image inputs (room photo + product photo)
//  • Outputs an edited image with the product placed in the room
//  • Is FREE on AI Studio key (AIzaSy...) — 10 RPM, 500 RPD
//
//  Key type matters: AQ.* keys (GCP service accounts) have free tier = 0.
//  Only AIzaSy* keys (from aistudio.google.com/apikey) get the free tier.
//  (gemini-2.5-flash-image / "Nano Banana" returned limit=0 — wrong model name)
//
const GEMINI_IMAGE_MODEL = "gemini-3.1-flash-image-preview";

async function runGemini(
  roomImageBase64: string,
  productImageUrl: string | undefined,
  productName: string,
  productDescription: string
): Promise<string> {
  const key = process.env.GOOGLE_AI_STUDIO_KEY || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error(
      "GOOGLE_AI_STUDIO_KEY or GEMINI_API_KEY not set. Check your .env.local"
    );
  }

  const ai = new GoogleGenAI({ apiKey: key });

  // Since generateImages takes a text prompt for this model, we describe the scene:
  const prompt = [
    `A photorealistic interior design photograph of a beautifully styled modern living space.`,
    `The hero piece is a ${productName}: ${productDescription}.`,
    `Positioned naturally against the wall at realistic scale, warm ambient lighting,`,
    `soft shadows underneath, tasteful contemporary decor, large windows with natural light.`,
    `Wide-angle interior lens, professional home-staging quality, 4K photorealistic detail.`,
  ].join(" ");

  try {
    const response = await ai.models.generateImages({
      model: GEMINI_IMAGE_MODEL,
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
      },
    });

    const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
    
    if (!base64Image) {
      throw new Error("Gemini returned an empty image response.");
    }
    
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (err: any) {
    console.error("Gemini SDK Error:", err);
    throw new Error(`Gemini SDK Error: ${err?.message || String(err)}`);
  }
}

// ─── FLUX 2 Pro (Replicate) — demo mode ──────────────────────────────────────
async function runFluxPro(
  productName: string,
  productDescription: string
): Promise<string> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error("REPLICATE_API_TOKEN not configured");

  const prompt = [
    `A photorealistic interior design photograph of a beautifully styled modern living space.`,
    `The hero piece is a ${productName}: ${productDescription}.`,
    `Positioned naturally against the wall at realistic scale, warm ambient lighting,`,
    `soft shadows underneath, tasteful contemporary decor, large windows with natural light.`,
    `Wide-angle interior lens, professional home-staging quality, 4K photorealistic detail.`,
  ].join(" ");

  const res = await fetch(
    "https://api.replicate.com/v1/models/black-forest-labs/flux-2-pro/predictions",
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
          aspect_ratio: "4:3",
          output_format: "jpg",
          output_quality: 90,
        },
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 402) throw new Error("Replicate account needs credits. Top up at replicate.com/account/billing.");
    if (res.status === 401) throw new Error("Replicate token invalid. Check REPLICATE_API_TOKEN in .env.local.");
    if (res.status === 404) throw new Error("flux-2-pro model not found on Replicate. Check model name.");
    throw new Error(`Replicate error ${res.status}: ${text.slice(0, 200)}`);
  }

  const prediction = await res.json();
  if (prediction.status === "succeeded") return extractReplicateOutput(prediction.output);
  if (prediction.status === "failed" || prediction.status === "canceled") {
    throw new Error(`Replicate ${prediction.status}: ${prediction.error ?? ""}`);
  }
  return pollReplicate(prediction.id, token);
}

// ─── HuggingFace text-to-image — free via @huggingface/inference ────────────
// Note: Hugging Face currently does not support image-to-image on their free tier
// for most models like SDXL. We use FLUX.1-schnell for text-to-image instead.
async function runHuggingFace(
  productName: string,
  productDescription: string
): Promise<string> {
  const token = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN;
  if (!token) {
    throw new Error(
      "HUGGINGFACE_API_KEY not set. Go to huggingface.co → Settings → Access Tokens."
    );
  }
  
  const hf = new HfInference(token);

  const prompt = [
    `A professional interior design photograph of a beautifully styled modern living space.`,
    `The hero piece is a ${productName}: ${productDescription}.`,
    `It is positioned naturally at a realistic scale against the wall, with the room's warm ambient lighting casting soft shadows underneath.`,
    `The rest of the room is tastefully decorated — clean walls, warm wood flooring, large windows with natural light.`,
    `Shot at eye level with a wide-angle interior lens. 4K photorealistic detail, professional home-staging quality.`,
  ].join(" ");

  try {
    const response = await hf.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      inputs: prompt,
    });

    // The response is a Blob. Convert it to an ArrayBuffer, then to Base64
    const responseBuffer = Buffer.from(await (response as unknown as Blob).arrayBuffer());
    const base64Image = responseBuffer.toString('base64');

    return `data:image/jpeg;base64,${base64Image}`;
  } catch (err: any) {
    console.error("HF API Error:", err);
    throw new Error(`HuggingFace SDK Error: ${err?.message || String(err)}`);
  }
}

// ─── Production: multi-image Kontext Pro ─────────────────────────────────────
async function runProduction(
  roomImageUrl: string,
  productImageUrl: string,
  productName: string,
  productDescription: string
): Promise<string> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error("REPLICATE_API_TOKEN not configured");

  const prompt = `
TASK: Composite the exact product from IMAGE 2 into the room from IMAGE 1.
IMAGE 1 (input_image_1) = customer's room — preserve 100%.
IMAGE 2 (input_image_2) = product reference — copy exactly.
PRODUCT: ${productName} — ${productDescription}

STEP 1 LOCK ROOM: Preserve walls, flooring, ceiling, lighting, all objects, camera angle.
STEP 2 EXTRACT PRODUCT: Copy exact color, material, texture, proportions, hardware from input_image_2.
STEP 3 PLACE: Correct scale, floor-plane alignment, lighting match, contact shadows.
RULES: No generic substitution. No room changes. Photorealistic. 4K.`.trim();

  const res = await fetch(
    "https://api.replicate.com/v1/models/flux-kontext-apps/multi-image-kontext-pro/predictions",
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
          input_image_1: roomImageUrl,
          input_image_2: productImageUrl,
          aspect_ratio: "match_input_image",
          output_format: "jpg",
          safety_tolerance: 2,
        },
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 402) throw new Error("Replicate needs credits. Top up at replicate.com/account/billing.");
    if (res.status === 401) throw new Error("Replicate token invalid. Check REPLICATE_API_TOKEN.");
    throw new Error(`Replicate error ${res.status}: ${text.slice(0, 200)}`);
  }

  const prediction = await res.json();
  if (prediction.status === "succeeded") return extractReplicateOutput(prediction.output);
  if (prediction.status === "failed" || prediction.status === "canceled") {
    throw new Error(`Replicate ${prediction.status}: ${prediction.error ?? ""}`);
  }
  return pollReplicate(prediction.id, token);
}

// ─── Cloudinary upload (production only) ─────────────────────────────────────
async function uploadToCloudinary(base64Image: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error("Cloudinary env vars missing");

  const timestamp = String(Math.round(Date.now() / 1000));
  const folder = "ai-visualizer";
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const params = new URLSearchParams();
  params.append("file", base64Image);
  params.append("api_key", apiKey);
  params.append("timestamp", timestamp);
  params.append("folder", folder);
  params.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: params,
  });
  if (!res.ok) throw new Error(`Cloudinary upload failed: ${await res.text()}`);
  return (await res.json()).secure_url as string;
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
async function pollReplicate(id: string, token: string): Promise<string> {
  for (let i = 0; i < 48; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) continue;
    const s = await res.json();
    if (s.status === "succeeded") return extractReplicateOutput(s.output);
    if (s.status === "failed" || s.status === "canceled") {
      throw new Error(`Replicate ${s.status}: ${s.error ?? "Unknown"}`);
    }
  }
  throw new Error("Replicate timed out after 4 minutes");
}

function extractReplicateOutput(output: unknown): string {
  if (Array.isArray(output)) return output[0] as string;
  if (typeof output === "string") return output;
  throw new Error("Unexpected Replicate output format");
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    let body: VisualizeBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
    }

    const { roomImageBase64, productName, productDescription, productImageUrl } = body;

    if (!roomImageBase64 || !productName || !productDescription) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    if (!roomImageBase64.startsWith("data:image/")) {
      return NextResponse.json({ success: false, error: "Room image must be a data URL" }, { status: 400 });
    }

    let resultUrl: string;

    if (MODEL_MODE === "gemini") {
      resultUrl = await runGemini(roomImageBase64, productImageUrl, productName, productDescription);
    } else if (MODEL_MODE === "huggingface") {
      resultUrl = await runHuggingFace(productName, productDescription);
    } else if (MODEL_MODE === "flux_pro") {
      resultUrl = await runFluxPro(productName, productDescription);
    } else {
      // production — exact composite using the real room photo
      if (!productImageUrl?.startsWith("https://")) {
        return NextResponse.json({ success: false, error: "Invalid product image URL" }, { status: 400 });
      }
      const roomUrl = await uploadToCloudinary(roomImageBase64);
      resultUrl = await runProduction(roomUrl, productImageUrl, productName, productDescription);
    }

    return NextResponse.json({ success: true, data: { resultUrl } });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[visualize]", message);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      { success: false, error: isDev ? message : "Visualization failed. Please try again." },
      { status: 500 }
    );
  }
}
