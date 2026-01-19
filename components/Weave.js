"use client";

export default function Weave({ show = true }) {
  if (!show) return null;

  return (
    <div className="weaveOverlay" aria-hidden="true">
      <div className="weaveVeil" />
      <div className="weaveGrain" />
    </div>
  );
}
