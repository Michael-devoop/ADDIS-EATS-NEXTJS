import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { getDishes } from "@/lib/dishes";
import { toSlug } from "../slug";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug } = await params;
  const dishes = await getDishes();
  const dish = dishes.find((d) => toSlug(d.name) === slug || d.id === slug) || {
    name: "Authentic Ethiopian Dish",
    category: "Specialty",
    price: 350,
    description: "Experience handcrafted traditional Ethiopian cuisine delivered fresh across Addis Ababa.",
  };

  let logoBase64 = "";
  try {
    const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
    const logoBuffer = await fs.readFile(logoPath);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  } catch (err) {
    console.error("Failed to load logo in menu opengraph-image:", err);
  }

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
          backgroundColor: "#073b22",
          color: "#ffffff",
          fontFamily: "sans-serif",
          backgroundImage: "radial-gradient(circle at 85% 20%, #10b981 0%, transparent 45%)",
        }}
      >
        {/* Top Branding Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #10b981",
                overflow: "hidden",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              {logoBase64 ? (
                <img
                  src={logoBase64}
                  alt="Addis Eats Logo"
                  width="60"
                  height="60"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ fontSize: "30px" }}>🌼</span>
              )}
            </div>
            <span style={{ fontSize: "38px", fontWeight: "900", letterSpacing: "-1px" }}>
              Addis<span style={{ color: "#a7f3d0" }}>Eats</span>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "16px",
              color: "#a7f3d0",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {dish.category} Specialty
          </div>
        </div>

        {/* Center Dish Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: "900",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "#ffffff",
            }}
          >
            {dish.name}
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#d1fae5",
              lineHeight: 1.4,
              maxWidth: "880px",
            }}
          >
            {dish.description}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                backgroundColor: "#fbbf24",
                color: "#1f2937",
                padding: "10px 24px",
                borderRadius: "16px",
                fontWeight: "900",
              }}
            >
              <span style={{ fontSize: "36px", lineHeight: 1 }}>{dish.price}</span>
              <span style={{ fontSize: "18px", fontWeight: "800" }}>Birr / ETB</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                padding: "10px 20px",
                borderRadius: "16px",
                fontSize: "18px",
                color: "#f0fdf4",
              }}
            >
              <span>🌱 100% Organic Highland Spices</span>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
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
          <span>⚡ Fresh Dispatch within 25–35 Mins</span>
          <span>🛵 Delivery to Bole, Kazanchis, Piassa &amp; CMC</span>
          <span>💳 Telebirr &amp; Cash on Delivery</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
