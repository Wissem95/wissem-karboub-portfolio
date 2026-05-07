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
          border: "3px solid #C8B89A",
          borderRadius: 14,
          color: "#C8B89A",
          fontSize: 38,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: -2,
        }}
      >
        WK
      </div>
    ),
    { ...size },
  );
}
