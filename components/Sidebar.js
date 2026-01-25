"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * LOCKED GLYPH PATHS
 * These MUST match your repo folder:
 * public/ui/glyphs/*.svg
 *
 * Your screenshot shows:
 * eye.svg, intake.svg, roidboy.svg, moments.svg, ps.svg, summation.svg, year.svg, seal.svg, directory.svg, assessment.svg, library.svg
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

export default function Sidebar({ active, onSelect }) {
  const [open, setOpen] = useState(false);
  const start = useRef({ x: 0, y: 0, tracking: false, edge: "none" });

  const close = () => setOpen(false);
  const toggle = (v) => setOpen(!!v);

  // Swipe-open from RIGHT edge, swipe-close from LEFT edge (iPad reliable)
  useEffect(() => {
    const right = document.getElementById("rightHotzone");
    const left = document.getElementById("leftHotzone");
    if (!right || !left) return;

    const onStartRight = (e) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY, tracking: true, edge: "right" };
    };
    const onMoveRight = (e) => {
      if (!start.current.tracking || start.current.edge !== "right") return;
      const t = e.touches[0];
      const dx = start.current.x - t.clientX; // swipe left opens
      const dy = Math.abs(t.clientY - start.current.y);
      if (dy > 34) return;
      if (dx > 24) toggle(true);
    };
    const onEndRight = () => {
      start.current.tracking = false;
      start.current.edge = "none";
    };

    const onStartLeft = (e) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY, tracking: true, edge: "left" };
    };
    const onMoveLeft = (e) => {
      if (!start.current.tracking || start.current.edge !== "left") return;
      const t = e.touches[0];
      const dx = t.clientX - start.current.x; // swipe right closes
      const dy = Math.abs(t.clientY - start.current.y);
      if (dy > 34) return;
      if (dx > 24) toggle(false);
    };
    const onEndLeft = () => {
      start.current.tracking = false;
      start.current.edge = "none";
    };

    right.addEventListener("touchstart", onStartRight, { passive: true });
    right.addEventListener("touchmove", onMoveRight, { passive: true });
    right.addEventListener("touchend", onEndRight, { passive: true });

    left.addEventListener("touchstart", onStartLeft, { passive: true });
    left.addEventListener("touchmove", onMoveLeft, { passive: true });
    left.addEventListener("touchend", onEndLeft, { passive: true });

    return () => {
      right.removeEventListener("touchstart", onStartRight);
      right.removeEventListener("touchmove", onMoveRight);
      right.removeEventListener("touchend", onEndRight);

      left.removeEventListener("touchstart", onStartLeft);
      left.removeEventListener("touchmove", onMoveLeft);
      left.removeEventListener("touchend", onEndLeft);
    };
  }, []);

  const items = useMemo(() => NAV, []);

  return (
    <>
      {/* HOTZONES MUST EXIST (CSS controls width) */}
      <div id="rightHotzone" className="rightHotzone" />
      <div id="leftHotzone" className="leftHotzone" />

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
