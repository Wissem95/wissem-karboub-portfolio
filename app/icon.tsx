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
          backgroundColor: "#C8B89A",
          backgroundImage:
            "linear-gradient(135deg, #C8B89A 0%, #8B7355 100%)",
          color: "#0D0D0D",
          fontSize: 30,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: -1,
          lineHeight: 1,
          paddingTop: 2,
        }}
      >
        WK
      </div>
    ),
    { ...size },
  );
}
