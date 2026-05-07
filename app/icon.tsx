import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 900,
            fontFamily: "system-ui, sans-serif",
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
    ),
    { ...size },
  );
}
