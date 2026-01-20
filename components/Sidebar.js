"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

export default function Sidebar({ active, onSelect }) {
  const [open, setOpen] = useState(false);
  const start = useRef({ x: 0, y: 0, tracking: false });

  const close = () => setOpen(false);
  const toggle = (v) => setOpen(!!v);

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
      const dx = start.current.x - t.clientX; // swipe left opens
      const dy = Math.abs(t.clientY - start.current.y);
      if (dy > 34) return;
      if (dx > 28) toggle(true);
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
              <img className="glyphImg" src={it.glyph} alt="" />
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
