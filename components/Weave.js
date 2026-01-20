"use client";

export default function Weave() {
  // Simple universal overlay. Styling is driven by global.css.
  return (
    <div className="weaveOverlay" aria-hidden="true">
      <div className="weaveVeil" />
      <div className="weaveCenter" />
    </div>
  );
}
