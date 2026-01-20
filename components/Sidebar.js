"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const NAV = [
  { id: "today", glyph: "/ui/glyphs/sigil-eye.svg" }, // Daily Hub landing
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

  const items = useMemo(() => NAV, []);

  useEffect(() => {
    // Swipe-only RIGHT EDGE hotzone (bottom-right doctrine)
    const onStart = (e) => {
      const t = e.touches?.[0];
      if (!t) return;

      // Only begin tracking if touch starts near the right edge
      const vw = window.innerWidth || 1024;
      const rightEdge = vw - 26;
      if (t.clientX < rightEdge) return;

      start.current = { x: t.clientX, y: t.clientY, tracking: true };
    };

    const onMove = (e) => {
      if (!start.current.tracking) return;
      const t = e.touches?.[0];
      if (!t) return;

      // swipe LEFT opens
      const dx = start.current.x - t.clientX;
      const dy = Math.abs(t.clientY - start.current.y);

      // ignore vertical drags
      if (dy > 34) return;

      if (dx > 26) setOpen(true);
    };

    const onEnd = () => {
      start.current.tracking = false;
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      {/* scrim */}
      {open ? (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 55,
            background: "rgba(0,0,0,.55)"
          }}
        />
      ) : null}

      {/* plane */}
      <aside
        aria-hidden={!open}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: 92,
          zIndex: 60,
          transform: open ? "translateX(0)" : "translateX(110%)",
          transition: "transform .24s cubic-bezier(.2,.8,.2,1)",
          background: "rgba(5,8,6,.70)",
          borderLeft: "1px solid rgba(216,194,178,.14)",
          backdropFilter: "blur(16px) saturate(120%)",
          WebkitBackdropFilter: "blur(16px) saturate(120%)",
          display: "flex"
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "18px 10px",
            gap: 12
          }}
        >
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => {
                  close();
                  onSelect?.(it.id);
                }}
                aria-label={it.id}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                  border: "1px solid rgba(216,194,178,.16)",
                  background: "rgba(0,0,0,.18)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,.05) inset",
                  cursor: "pointer",
                  padding: 0,
                  display: "grid",
                  placeItems: "center",
                  outline: "none",
                  transform: isActive ? "scale(1.02)" : "scale(1.0)"
                }}
              >
                <img
                  src={it.glyph}
                  alt=""
                  draggable={false}
                  style={{
                    width: 26,
                    height: 26,
                    opacity: 0.95,
                    filter: isActive
                      ? "drop-shadow(0 0 10px rgba(255,90,168,.28))"
                      : "drop-shadow(0 0 8px rgba(255,90,168,.14))"
                  }}
                />
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
