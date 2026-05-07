import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D0D0D",
          backgroundImage:
            "linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 100%)",
          borderRadius: 38,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 900,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: -3,
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
    ),
    { ...size },
  );
}
