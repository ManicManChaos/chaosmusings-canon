"use client";

/**
 * LIBRARY VIEW (CANON)
 * - NOT in sidebar
 * - Accessed from glyphs / context / future routing
 * - Houses:
 *   • App Info Book
 *   • System Map
 *   • Glyph Legend
 *   • Settings Book (programmable baselines)
 */

export default function LibraryView() {
  return (
    <section className="card">
      <div className="cardHead">LIBRARY</div>

      <div className="cardBody">
        <div className="libraryItem">APP INFO BOOK</div>
        <div className="libraryItem">SYSTEM MAP</div>
        <div className="libraryItem">GLYPH LEGEND</div>
        <div className="libraryItem">SETTINGS</div>
      </div>
    </section>
  );
}
