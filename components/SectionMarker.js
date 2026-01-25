"use client";

export default function SectionMarker({ src, size = 52 }) {
  if (!src) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "18px 0 10px 0",
        opacity: 0.9
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          height: size,
          width: "auto",
          objectFit: "contain",
          pointerEvents: "none"
        }}
      />
    </div>
  );
}
