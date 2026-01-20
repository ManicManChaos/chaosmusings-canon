// components/Weave.js
"use client";

export default function Weave({ show }) {
  if (!show) return null;

  return (
    <div className="weaveOverlay" aria-hidden="true">
      <div className="weaveFilm" />
    </div>
  );
}
