import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Wissem Karboub — Développeur Full-Stack & Tech Lead";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0D0D0D",
          backgroundImage:
            "linear-gradient(135deg, rgba(200,184,154,0.16) 0%, rgba(13,13,13,0) 45%), linear-gradient(315deg, rgba(139,115,85,0.22) 0%, rgba(13,13,13,0) 50%)",
          color: "#F5F3EE",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0D0D0D",
                backgroundImage:
                  "linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontWeight: 900,
                  fontSize: 26,
                  letterSpacing: -1,
                  lineHeight: 1,
                  backgroundImage:
                    "linear-gradient(100deg, #F5F3EE 0%, #F5F3EE 30%, #C8B89A 50%, #F5F3EE 70%, #F5F3EE 100%)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                WK
              </div>
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#C8B89A",
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              Portfolio · 2026
            </div>
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#BBBBBB",
              letterSpacing: 2,
            }}
          >
            wissemkarboub.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: "#F5F3EE",
              display: "flex",
            }}
          >
            Wissem Karboub
          </div>
          <div
            style={{
              fontSize: 38,
              color: "#C8B89A",
              fontWeight: 600,
              display: "flex",
            }}
          >
            Développeur Full-Stack & Tech Lead
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#BBBBBB",
              maxWidth: 900,
              display: "flex",
            }}
          >
            SaaS multi-tenant · Next.js · FastAPI · NestJS · Stripe Connect ·
            Flutter · Master CTO HETIC 2026
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          {["Next.js", "TypeScript", "FastAPI", "NestJS", "Stripe", "Supabase"].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(200,184,154,0.4)",
                  background: "rgba(26,26,26,0.6)",
                  color: "#F5F3EE",
                  fontSize: 18,
                  fontFamily: "monospace",
                }}
              >
                {tech}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
