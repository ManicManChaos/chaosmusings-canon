"use client";

/**
 * LOCKED
 * - Ornate PNG only
 * - No text
 * - Centered
 * - Subtle fade
 */

export default function SectionMarker({ src, size = 56 }) {
  if (!src) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "22px 0 14px",
        opacity: 0.85
      }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          width: size,
          height: "auto",
          filter: "drop-shadow(0 0 14px rgba(216,168,184,.22))",
          transition: "opacity .4s ease"
        }}
      />
    </div>
  );
}
