"use client";

export default function Weave() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        pointerEvents: "none",
        background:
          "radial-gradient(900px 700px at 55% 42%, rgba(255,90,168,.10), rgba(0,0,0,.62))",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        animation: "mmocWeave .52s cubic-bezier(.2,.8,.2,1) forwards"
      }}
    >
      <style>{`
        @keyframes mmocWeave {
          0%   { opacity: 0; transform: scale(1.02); }
          45%  { opacity: .95; }
          100% { opacity: 0; transform: scale(1.0); }
        }
      `}</style>
    </div>
  );
}
