"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * LOCKED
 * - Right-edge swipe ONLY
 * - Glyph paths: /public/ui/ornate-priest/*.png
 * - No left hotspot
 */

const NAV = [
  { id: "today", glyph: "/ui/ornate-priest/glyph-today.png" },
  { id: "intake", glyph: "/ui/ornate-priest/glyph-intake.png" },
  { id: "roidboy", glyph: "/ui/ornate-priest/glyph-roidboy.png" },
  { id: "moments", glyph: "/ui/ornate-priest/glyph-moments.png" },
  { id: "ps", glyph: "/ui/ornate-priest/glyph-context.png" },
  { id: "summation", glyph: "/ui/ornate-priest/glyph-summation.png" },
  { id: "yearreview", glyph: "/ui/ornate-priest/glyph-yearreview.png" },
  { id: "seal", glyph: "/ui/ornate-priest/glyph-seal.png" }
];

export default function Sidebar({ active, onSelect }) {
  const [open, setOpen] = useState(false);
  const start = useRef({ x: 0, y: 0, tracking: false });

  useEffect(() => {
    const hot = document.getElementById("rightHotzone");
    if (!hot) return;

    const onStart = (e) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY, tracking: true };
    };

    const onMove = (e) => {
      if (!start.current.tracking) return;
      const t = e.touches[0];
      const dx = start.current.x - t.clientX;
      const dy = Math.abs(t.clientY - start.current.y);
      if (dy > 30) return;
      if (dx > 22) setOpen(true);
    };

    const onEnd = () => {
      start.current.tracking = false;
    };

    hot.addEventListener("touchstart", onStart, { passive: true });
    hot.addEventListener("touchmove", onMove, { passive: true });
    hot.addEventListener("touchend", onEnd, { passive: true });

    return () => {
      hot.removeEventListener("touchstart", onStart);
      hot.removeEventListener("touchmove", onMove);
      hot.removeEventListener("touchend", onEnd);
    };
  }, []);

  const items = useMemo(() => NAV, []);

  return (
    <>
      {/* RIGHT EDGE HOTZONE */}
      <div id="rightHotzone" className="rightHotzone" />

      {open && <div className="navScrim" onClick={() => setOpen(false)} />}

      <aside className={`sidePlane ${open ? "isOpen" : ""}`} aria-hidden={!open}>
        <div className="sidePlaneInner">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              className={`glyphNav ${active === it.id ? "isActive" : ""}`}
              onClick={() => {
                setOpen(false);
                onSelect?.(it.id);
              }}
              aria-label={it.id}
            >
              <img className="glyphImg" src={it.glyph} alt="" draggable={false} />
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
