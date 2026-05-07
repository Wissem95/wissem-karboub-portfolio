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
          backgroundColor: "#C8B89A",
          backgroundImage:
            "linear-gradient(135deg, #C8B89A 0%, #8B7355 100%)",
          color: "#0D0D0D",
          fontSize: 88,
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
