import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Addis Eats — Authentic Organic Ethiopian Dining & Delivery";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Read authentic Addis Eats logo from public/images/logo.png
  let logoBase64 = "";
  try {
    const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
    const logoBuffer = await fs.readFile(logoPath);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  } catch (err) {
    console.error("Failed to load logo in opengraph-image:", err);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px 64px",
          backgroundColor: "#073b22",
          backgroundImage:
            "radial-gradient(circle at 82% 35%, rgba(16, 185, 129, 0.28) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(251, 191, 36, 0.12) 0%, transparent 45%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header / Branding Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
                border: "3px solid #10b981",
                overflow: "hidden",
              }}
            >
              {logoBase64 ? (
                <img
                  src={logoBase64}
                  alt="Addis Eats Logo"
                  width="72"
                  height="72"
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ fontSize: "36px" }}>🌼</span>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "38px",
                  fontWeight: "900",
                  letterSpacing: "-1px",
                  lineHeight: 1.1,
                }}
              >
                Addis<span style={{ color: "#a7f3d0" }}>Eats</span>
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#d1fae5",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Fresh Organic Dining &bull; Addis Ababa
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "10px 22px",
              borderRadius: "999px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "#a7f3d0",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Highland Culinary Kitchen
            </span>
          </div>
        </div>

        {/* Center Main Content Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: "40px",
            margin: "20px 0",
          }}
        >
          {/* Left Text Block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "700px",
            }}
          >
            <div
              style={{
                fontSize: "54px",
                fontWeight: "900",
                lineHeight: 1.12,
                letterSpacing: "-1.5px",
                color: "#ffffff",
              }}
            >
              Savor Handcrafted Wats, Sizzling Tibs &amp; Fresh Injera
            </div>
            <div
              style={{
                fontSize: "21px",
                color: "#d1fae5",
                lineHeight: 1.45,
                maxWidth: "660px",
              }}
            >
              Farm-to-table highland ingredients with instant citywide delivery across Bole, Kazanchis, Piassa &amp; CMC.
            </div>
          </div>

          {/* Right Logo Feature Showcase Badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "2px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "28px",
              padding: "24px 34px",
              boxShadow: "0 16px 36px rgba(0, 0, 0, 0.25)",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 28px rgba(0, 0, 0, 0.3)",
                border: "4px solid #fbbf24",
                overflow: "hidden",
              }}
            >
              {logoBase64 ? (
                <img
                  src={logoBase64}
                  alt="Addis Eats Emblem"
                  width="140"
                  height="140"
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ fontSize: "56px" }}>🌼</span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "900",
                  color: "#fbbf24",
                  letterSpacing: "0.5px",
                }}
              >
                100% ORGANIC
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#d1fae5",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Addis Ababa Original
              </span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee Badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "2px solid rgba(255, 255, 255, 0.16)",
            paddingTop: "20px",
            fontSize: "17px",
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
