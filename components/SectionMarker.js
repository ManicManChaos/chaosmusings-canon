"use client";

import { useEffect, useState } from "react";

/**
 * SectionMarker (LOCKED)
 * Purpose: render ornate marker image (assessment/intake/context/summation)
 * Rules:
 *  - No helper text
 *  - Subtle fade
 *  - If image missing -> render nothing (no broken image icon)
 *
 * Props:
 *  - src: "/ui/png/<file>.png"  (must exist in /public)
 *  - size: number (px) default 56
 *  - alt: optional string (default "")
 */
export default function SectionMarker({ src, size = 56, alt = "" }) {
  const [ok, setOk] = useState(true);

  useEffect(() => {
    // reset when src changes
    setOk(true);
  }, [src]);

  if (!src || !ok) return null;

  return (
    <div style={S.wrap} aria-hidden="true">
      <img
        src={src}
        alt={alt}
        draggable={false}
        onError={() => setOk(false)}
        style={{
          ...S.img,
          width: size,
          height: size
        }}
      />
      {/* subtle fade line under marker */}
      <div style={S.fadeLine} />
    </div>
  );
}

const S = {
  wrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 8,
    pointerEvents: "none",
    userSelect: "none"
  },
  img: {
    objectFit: "contain",
    opacity: 0.92,
    filter:
      "drop-shadow(0 0 10px rgba(216,168,184,.10)) drop-shadow(0 0 18px rgba(176,141,43,.08))",
    transform: "translateZ(0)"
  },
  fadeLine: {
    marginTop: 10,
    width: "min(980px, 92vw)",
    height: 1,
    background:
      "linear-gradient(90deg, rgba(0,0,0,0), rgba(217,195,179,.12), rgba(0,0,0,0))",
    opacity: 0.55
  }
};
