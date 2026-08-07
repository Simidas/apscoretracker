import { ImageResponse } from "next/og";

export const alt = "AP Score Tracker — see progress across practice tests";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#07111f",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ color: "#2dd4bf", display: "flex", fontSize: 28 }}>
          AP SCORE TRACKER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            marginTop: 28,
            maxWidth: 980,
            textAlign: "center",
          }}
        >
          See your AP practice progress, not just one score.
        </div>
        <div
          style={{
            color: "#94a3b8",
            display: "flex",
            fontSize: 30,
            marginTop: 30,
          }}
        >
          Estimate free · Sign in to save and sync
        </div>
      </div>
    ),
    size
  );
}
