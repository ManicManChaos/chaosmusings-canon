"use client";

import { useEffect, useRef, useState } from "react";

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
  const start = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const zone = document.getElementById("rightHotzone");
    if (!zone) return;

    const startTouch = (e) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    };

    const moveTouch = (e) => {
      const t = e.touches[0];
      const dx = start.current.x - t.clientX;
      const dy = Math.abs(start.current.y - t.clientY);

      if (dy > 30) return;
      if (dx > 24) setOpen(true);
    };

    zone.addEventListener("touchstart", startTouch, { passive: true });
    zone.addEventListener("touchmove", moveTouch, { passive: true });

    return () => {
      zone.removeEventListener("touchstart", startTouch);
      zone.removeEventListener("touchmove", moveTouch);
    };
  }, []);

  return (
    <>
      <div id="rightHotzone" className="rightHotzone" />

      {open && <div className="navScrim" onClick={() => setOpen(false)} />}

      <aside className={`sidePlane ${open ? "isOpen" : ""}`}>
        <div className="sidePlaneInner">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`glyphNav ${active === n.id ? "isActive" : ""}`}
              onClick={() => {
                setOpen(false);
                onSelect(n.id);
              }}
            >
              <img src={n.glyph} className="glyphImg" alt="" />
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
