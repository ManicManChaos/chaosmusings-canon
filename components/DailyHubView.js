import React from "react";

const GLYPH = (name) => `/ui/ornate-priest/glyph-${name}.png`;

export default function DailyHubView({
  dateLabel = "",
  onOpenLibrary, // preserve: optional callback if you have it
  children,
}) {
  return (
    <div className="appRoot">
      <div className="container">
        {/* TELL NO LIES header with background overlay */}
        <div className="tnlHeaderBar">
          <div className="tnlHeaderInner">
            <h1 className="tnlTitle">TELL NO LIES</h1>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="dateChip">{dateLabel}</div>

              {/* Library next to date (NOT under it) */}
              <button
                className="navGlyphBtn"
                onClick={() => onOpenLibrary && onOpenLibrary()}
                aria-label="Library"
                title="Library"
                style={{
                  width: 74,
                  height: 74,
                  padding: 6,
                }}
              >
                <img className="navGlyphImg" src={GLYPH("library")} alt="Library" />
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="panel" style={{ padding: 18, marginTop: 14 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
