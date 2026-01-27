"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Sidebar (LOCKED)
 * - Opens ONLY by swiping LEFT from the RIGHT edge (bottom-right works).
 * - Closes by tapping scrim OR selecting an item.
 * - Glyph paths are LOCKED to: public/ui/glyphs/*.svg
 */

const NAV = [
  { id: "today", glyph: "/ui/glyphs/sigil-eye.svg" },
  { id: "intake", glyph: "/ui/glyphs/intake.svg" },
  { id: "roidboy", glyph: "/ui/glyphs/roidboy.svg" },
  { id: "moments", glyph: "/ui/glyphs/moments.svg" },
  { id: "ps", glyph: "/ui/glyphs/ps.svg" },
  { id: "summation", glyph: "/ui/glyphs/summation.svg" },
  { id: "yearreview", glyph: "/ui/glyphs/year-review.svg" },
  { id: "seal", glyph: "/ui/glyphs/seal.svg" }
];

export default function Sidebar({ active, onSelect }) {
  const [open, setOpen] = useState(false);
  const start = useRef({ x: 0, y: 0, tracking: false });

  const close = () => setOpen(false);

  // RIGHT EDGE swipe-open hotzone
  useEffect(() => {
    const hot = document.getElementById("rightHotzone");
    if (!hot) return;

    const onStart = (e) => {
      const t = e.touches?.[0];
      if (!t) return;
      start.current = { x: t.clientX, y: t.clientY, tracking: true };
    };

    const onMove = (e) => {
      if (!start.current.tracking) return;
      const t = e.touches?.[0];
      if (!t) return;

      const dx = start.current.x - t.clientX; // swipe LEFT opens
      const dy = Math.abs(t.clientY - start.current.y);

      // keep it tight so it doesn't open on vertical scroll
      if (dy > 34) return;

      if (dx > 24) setOpen(true);
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
      {/* RIGHT EDGE HOTZONE (CSS controls width + position) */}
      <div id="rightHotzone" className="rightHotzone" />

      {open ? <div className="navScrim" onClick={close} /> : null}

      <aside className={`sidePlane ${open ? "isOpen" : ""}`} aria-hidden={!open}>
        <div className="sidePlaneInner">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              className={`glyphNav ${active === it.id ? "isActive" : ""}`}
              onClick={() => {
                close();
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
