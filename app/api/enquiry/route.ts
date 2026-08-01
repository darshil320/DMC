import { NextResponse } from "next/server";
import { enquirySchema, type EnquiryResponse } from "@/lib/enquiry";

/**
 * Enquiry intake.
 *
 * Exists because the form previously POSTed straight to a Google Apps Script
 * with `mode: "no-cors"`. An opaque response always resolves — a 500, a revoked
 * deployment, or a quota block all looked identical to success, so leads could
 * be dropped silently with the UI still showing "Sent". Everything here exists
 * to make a failure observable: validate, forward with a readable status, and
 * report the truth back to the client.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const SINK_TIMEOUT_MS = 8000;

/**
 * Per-instance sliding window. Fluid Compute reuses instances, so this stops
 * the obvious flood from one address; it is not a distributed limiter and does
 * not pretend to be. Move to Upstash/Edge Config if abuse becomes real.
 */
const requestLog = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (requestLog.get(ip) ?? []).filter((at) => at > cutoff);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  requestLog.set(ip, [...recent, now]);

  // Opportunistic sweep so the map cannot grow without bound on a long-lived
  // instance. Cheap: only runs on the request that trips the threshold.
  if (requestLog.size > 500) {
    for (const [key, stamps] of requestLog) {
      const live = stamps.filter((at) => at > cutoff);
      if (live.length === 0) requestLog.delete(key);
      else requestLog.set(key, live);
    }
  }

  return false;
}

function json(body: EnquiryResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (isRateLimited(ip)) {
    return json(
      { success: false, error: "Too many enquiries from this connection. Try again shortly, or message us on WhatsApp." },
      429
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ success: false, error: "Malformed request." }, 400);
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json({ success: false, error: "Please check the highlighted fields.", fieldErrors }, 422);
  }

  const enquiry = parsed.data;

  // Honeypot: accept and discard so the bot sees a normal success and does not
  // retry with the field removed.
  if (enquiry.website.length > 0) {
    return json({ success: true }, 200);
  }

  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[enquiry] ENQUIRY_WEBHOOK_URL is not configured — enquiry could not be stored", {
      email: enquiry.email,
      projectType: enquiry.projectType,
    });
    return json(
      { success: false, error: "We could not record your enquiry right now. Please email or WhatsApp us — we'll reply within 24 hours." },
      500
    );
  }

  const payload = {
    ...enquiry,
    website: undefined,
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "",
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SINK_TIMEOUT_MS);

    // Server-to-server: no CORS constraint, so unlike the old client call the
    // status is actually readable.
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const body = await response.text().catch(() => "<unreadable>");
      console.error("[enquiry] sink rejected the enquiry", {
        status: response.status,
        body: body.slice(0, 500),
        email: enquiry.email,
        projectType: enquiry.projectType,
        budgetRange: enquiry.budgetRange,
      });
      return json(
        { success: false, error: "We could not record your enquiry right now. Please email or WhatsApp us — we'll reply within 24 hours." },
        502
      );
    }

    return json({ success: true }, 200);
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    console.error("[enquiry] sink unreachable", {
      reason: aborted ? "timeout" : String(error),
      email: enquiry.email,
      projectType: enquiry.projectType,
      budgetRange: enquiry.budgetRange,
      message: enquiry.message.slice(0, 500),
    });
    return json(
      { success: false, error: "We could not record your enquiry right now. Please email or WhatsApp us — we'll reply within 24 hours." },
      502
    );
  }
}
