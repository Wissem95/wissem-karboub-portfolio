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
          border: "8px solid #C8B89A",
          borderRadius: 38,
          color: "#C8B89A",
          fontSize: 80,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: -3,
          lineHeight: 1,
          paddingTop: 6,
        }}
      >
        WK
      </div>
    ),
    { ...size },
  );
}
