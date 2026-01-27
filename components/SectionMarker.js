"use client";

/**
 * SectionMarker (LOCKED)
 * Ornate divider image used as a section marker.
 * - Subtle fade so it sits in the UI (not chunky)
 * - No text
 */
export default function SectionMarker({ src, size = 52 }) {
  if (!src) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "18px 0 10px",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          opacity: 0.82,
          filter: "blur(0.15px) drop-shadow(0 0 18px rgba(176,141,43,.10))",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
