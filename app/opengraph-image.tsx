import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const alt = `${SITE_NAME} - websites, ecommerce and AI visualizers for local businesses`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f2eb",
          color: "#111111",
          padding: "72px",
          fontFamily: "Arial, Helvetica, sans-serif",
          border: "20px solid #111111",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <span>{SITE_NAME}</span>
          <span style={{ color: "#1f52ff" }}>dmctech.in</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 0.94,
              fontWeight: 900,
              letterSpacing: -3,
              textTransform: "uppercase",
              maxWidth: 900,
            }}
          >
            Take Your Local Business Online.
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 760,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#333333",
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 24,
            fontWeight: 700,
            color: "#1f52ff",
          }}
        >
          <span>Websites</span>
          <span>/</span>
          <span>Ecommerce</span>
          <span>/</span>
          <span>AI Visualizers</span>
        </div>
      </div>
    ),
    size
  );
}
