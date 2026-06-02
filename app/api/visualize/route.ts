import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

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
const MODEL_MODE: "huggingface" | "flux_pro" | "production" = "production";

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

// ─── HuggingFace FLUX.1-schnell — free, text-to-image ────────────────────────
async function runHuggingFace(
  productName: string,
  productDescription: string
): Promise<string> {
  const token = process.env.HF_TOKEN;
  if (!token) {
    throw new Error(
      "HF_TOKEN not set. Go to huggingface.co → Settings → Access Tokens → New token, then add HF_TOKEN=hf_xxx to .env.local and restart the server."
    );
  }

  const prompt = [
    `A professional interior design photograph of a beautifully styled modern living space.`,
    `The hero piece is a ${productName}: ${productDescription}.`,
    `It is positioned naturally at a realistic scale against the wall, with the room's warm ambient lighting casting soft shadows underneath.`,
    `The rest of the room is tastefully decorated — clean walls, warm wood flooring, large windows with natural light.`,
    `Shot at eye level with a wide-angle interior lens. 4K photorealistic detail, professional home-staging quality.`,
  ].join(" ");

  let res: Response;
  try {
    res = await fetch(HF_FLUX_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-wait-for-model": "true", // wait for cold-start instead of getting 503
      },
      body: JSON.stringify({ inputs: prompt }),
      signal: AbortSignal.timeout(120_000), // 2-min timeout
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Network error reaching HuggingFace (${msg}). Check your internet connection and that router.huggingface.co is accessible.`
    );
  }

  if (!res.ok) {
    let body = "";
    try { body = await res.text(); } catch { /* ignore */ }

    if (res.status === 401) throw new Error("HuggingFace token rejected. Check HF_TOKEN in .env.local.");
    if (res.status === 400) throw new Error(`HuggingFace bad request: ${body.slice(0, 200)}`);
    if (res.status === 503) throw new Error("HuggingFace model is loading. Retry in 20 seconds.");
    if (res.status === 429) throw new Error("HuggingFace rate limit. Free tier allows ~10 req/min. Wait a moment.");
    throw new Error(`HuggingFace error ${res.status}: ${body.slice(0, 200)}`);
  }

  // Response is raw binary image bytes
  const imageBytes = await res.arrayBuffer();
  const buf = Buffer.from(imageBytes);

  // Validate it's actually an image
  const header = buf.subarray(0, 4);
  const isJpeg = header[0] === 0xff && header[1] === 0xd8;
  const isPng  = header[0] === 0x89 && header[1] === 0x50;
  const isWebp = buf.subarray(8, 12).toString("ascii") === "WEBP";

  if (!isJpeg && !isPng && !isWebp) {
    const preview = buf.toString("utf8", 0, 200);
    throw new Error(`HuggingFace returned unexpected content: ${preview}`);
  }

  const mime = isJpeg ? "image/jpeg" : isPng ? "image/png" : "image/webp";
  return `data:${mime};base64,${buf.toString("base64")}`;
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

    if (MODEL_MODE === "huggingface") {
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
