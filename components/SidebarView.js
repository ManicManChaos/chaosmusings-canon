"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * SidebarView (LOCKED)
 *
 * Rules:
 * - RIGHT EDGE swipe opens
 * - Tap scrim closes
 * - No left hotspot
 * - No helper text
 * - Glyphs only
 *
 * Glyph paths MUST exist in:
 * public/ui/glyphs/*.svg
 */

const NAV = [
  { id: "today", glyph: "/ui/glyphs/eye.svg" },
  { id: "intake", glyph: "/ui/glyphs/intake.svg" },
  { id: "roidboy", glyph: "/ui/glyphs/roidboy.svg" },
  { id: "moments", glyph: "/ui/glyphs/moments.svg" },
  { id: "ps", glyph: "/ui/glyphs/ps.svg" },
  { id: "summation", glyph: "/ui/glyphs/summation.svg" },
  { id: "yearreview", glyph: "/ui/glyphs/year.svg" },
  { id: "seal", glyph: "/ui/glyphs/seal.svg" }
];

export default function SidebarView({ active, onSelect }) {
  const [open, setOpen] = useState(false);
  const touch = useRef({ x: 0, y: 0, tracking: false });

  // RIGHT EDGE swipe open
  useEffect(() => {
    const HOTZONE_WIDTH = 18;

    const onTouchStart = (e) => {
      const t = e.touches[0];
      if (window.innerWidth - t.clientX <= HOTZONE_WIDTH) {
        touch.current = { x: t.clientX, y: t.clientY, tracking: true };
      }
    };

    const onTouchMove = (e) => {
      if (!touch.current.tracking) return;
      const t = e.touches[0];
      const dx = touch.current.x - t.clientX; // swipe LEFT
      const dy = Math.abs(t.clientY - touch.current.y);
      if (dy > 34) return;
      if (dx > 24) setOpen(true);
    };

    const onTouchEnd = () => {
      touch.current.tracking = false;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const items = useMemo(() => NAV, []);

  return (
    <>
      {open ? <div className="navScrim" onClick={() => setOpen(false)} /> : null}

      <aside className={`sidePlane ${open ? "isOpen" : ""}`} aria-hidden={!open}>
        <div className="sidePlaneInner">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              className={`glyphNav ${active === it.id ? "isActive" : ""}`}
              aria-label={it.id}
              onClick={() => {
                setOpen(false);
                onSelect?.(it.id);
              }}
            >
              <img
                src={it.glyph}
                alt=""
                className="glyphImg"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
