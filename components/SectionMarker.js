"use client";

/**
 * SectionMarker (LOCKED)
 * - Ornate divider glyph ONLY (no text)
 * - Centered
 * - Used on Daily Hub section boundaries
 */
export default function SectionMarker({ src, alt = "", size = 46 }) {
  return (
    <div
      className="sectionMarker"
      aria-hidden="true"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "18px 0 12px",
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          opacity: 0.92,
          filter: "drop-shadow(0 0 14px rgba(176,141,43,.10))",
        }}
      />
    </div>
  );
}
