zimport React, { useMemo, useRef } from "react";

const GLYPH = (name) => `/ui/ornate-priest/glyph-${name}.png`;

export default function Sidebar({
  isOpen,
  setIsOpen,
  activeKey,
  onNavigate, // preserve: parent handles routing/state
}) {
  const startX = useRef(null);

  const items = useMemo(() => ([
    { key: "today", label: "Today", src: GLYPH("today") },
    { key: "intake", label: "Intake", src: GLYPH("intake") },
    { key: "roidboy", label: "RoidBoy", src: GLYPH("roidboy") },
    { key: "moments", label: "Moments", src: GLYPH("moments") },
    { key: "context", label: "Context", src: GLYPH("context") },
    { key: "summation", label: "Summation", src: GLYPH("summation") },
    { key: "yearreview", label: "Year Review", src: GLYPH("yearreview") },
    { key: "settings", label: "Settings", src: GLYPH("settings") },
  ]), []);

  function onHotspotPointerDown(e){ startX.current = e.clientX; }
  function onHotspotPointerUp(e){
    const sx = startX.current;
    startX.current = null;
    if (sx == null) return;

    const dx = sx - e.clientX; // swipe left
    if (!isOpen && dx > 14) setIsOpen(true);
    if (!isOpen && dx <= 14) setIsOpen(true); // forgiving open
  }

  return (
    <>
      {!isOpen && (
        <div
          className="sidebarHotspot"
          onPointerDown={onHotspotPointerDown}
          onPointerUp={onHotspotPointerUp}
          aria-hidden="true"
        />
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: 104,
          transform: isOpen ? "translateX(0)" : "translateX(112%)",
          transition: "transform 220ms ease",
          zIndex: 70,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          background: "rgba(6,6,6,0.62)",
          borderLeft: "1px solid rgba(199,184,141,0.16)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Seal = close */}
        <button
          className="navGlyphBtn"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
          title="Close"
        >
          <img className="navGlyphImg" src={GLYPH("seal")} alt="Seal" />
        </button>

        {items.map((it) => {
          const isActive = activeKey === it.key;
          return (
            <button
              key={it.key}
              className="navGlyphBtn"
              onClick={() => {
                setIsOpen(false);
                if (onNavigate) onNavigate(it.key);
              }}
              aria-label={it.label}
              title={it.label}
              style={{
                borderColor: isActive ? "rgba(199,184,141,0.34)" : undefined,
                boxShadow: isActive ? "0 0 18px rgba(199,184,141,0.14)" : undefined,
              }}
            >
              <img className="navGlyphImg" src={it.src} alt={it.label} />
              <div className="navGlyphText">{it.label}</div>
            </button>
          );
        })}
      </div>
    </>
  );
}
