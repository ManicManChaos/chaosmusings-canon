"use client";

/**
 * SectionMarker (LOCKED)
 * - Renders a centered ornate marker between hub sections.
 * - Size is controlled and cannot "blow up".
 * - No text.
 *
 * Props:
 *  - src: string (public path)
 *  - size: number (px) — applies to height; width auto by aspect ratio
 */
export default function SectionMarker({ src, size = 52 }) {
  const h = Number(size || 52);

  return (
    <div
      className="sectionMarker"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "14px 0 10px",
        pointerEvents: "none"
      }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          height: h,
          width: "auto",
          maxWidth: "92vw",
          objectFit: "contain",
          opacity: 0.92,
          filter: "drop-shadow(0 8px 18px rgba(0,0,0,.35))"
        }}
      />
    </div>
  );
}
