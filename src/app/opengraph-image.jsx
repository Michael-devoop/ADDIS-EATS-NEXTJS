import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Addis Eats — Authentic Organic Ethiopian Dining & Delivery";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "60px",
          backgroundColor: "#084228",
          color: "#ffffff",
          fontFamily: "sans-serif",
          backgroundImage: "radial-gradient(circle at 85% 25%, #10b981 0%, transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            🌿
          </div>
          <span style={{ fontSize: "40px", fontWeight: "900", letterSpacing: "-1px" }}>
            Addis<span style={{ color: "#a7f3d0" }}>Eats</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              padding: "8px 20px",
              borderRadius: "999px",
              alignSelf: "flex-start",
            }}
          >
            <span style={{ fontSize: "16px", color: "#a7f3d0", fontWeight: "700", textTransform: "uppercase" }}>
              Authentic Organic Ethiopian Cuisine &bull; Addis Ababa
            </span>
          </div>
          <div
            style={{
              fontSize: "58px",
              fontWeight: "900",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              maxWidth: "960px",
            }}
          >
            Savor Handcrafted Wats, Sizzling Tibs &amp; Fresh Injera
          </div>
          <div style={{ fontSize: "22px", color: "#d1fae5", maxWidth: "860px", lineHeight: 1.4 }}>
            Farm-to-table highland ingredients with instant citywide delivery across Bole, Kazanchis, Piassa &amp; CMC.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "2px solid rgba(255, 255, 255, 0.2)",
            paddingTop: "20px",
            fontSize: "18px",
            color: "#a7f3d0",
            fontWeight: "600",
          }}
        >
          <span>🌱 100% Organic Certified</span>
          <span>⚡ 30-Min Fast Dispatch</span>
          <span>💳 Telebirr, CBE &amp; Cash on Delivery</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
