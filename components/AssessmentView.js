"use client";

const MOODS = [
  "SELECT…",
  "RADIANT",
  "FOCUSED",
  "RESTLESS",
  "UNBOTHERED",
  "SWEET & SHARP",
  "CHAOTIC GOOD",
  "SOFT BUT SERIOUS",
  "MAIN CHARACTER ENERGY",
  "DO NOT PLAY WITH ME",
  "PEACEFUL"
];

const ERAS = [
  "SELECT…",
  "THE GLOW-UP",
  "THE GRIND",
  "THE SOFT LIFE",
  "THE RECOMP ARC",
  "THE MONK MODE",
  "THE LOVE SEASON",
  "THE VILLAIN ERA",
  "THE HEALING",
  "THE LEGEND BUILD"
];

const SINGLE = [
  "SELECT…",
  "UNASSIGNED",
  "SINGLE & UNBOTHERED",
  "SINGLE & DANGEROUS",
  "ENTANGLED (SITUATIONSHIP)",
  "LOCKED IN",
  "COMPLICATED"
];

export default function AssessmentView({ value, onChange }) {
  const v = value || {};

  const set = (p) => onChange?.({ ...v, ...p });

  return (
    <div>
      <div className="pageHeader" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/ui/png/eye.png"
            alt=""
            style={{ width: 28, height: 28, objectFit: "contain", opacity: 0.92 }}
          />
          <div className="pageTitle" style={{ margin: 0, color: "var(--gold)" }}>
            ASSESSMENT
          </div>
        </div>
      </div>

      <div className="grid2">
        <div className="field">
          <label>TITLE OF THE DAY</label>
          <input value={v.title || ""} onChange={(e) => set({ title: e.target.value })} />
        </div>

        <div className="field">
          <label>LOCATION</label>
          <input value={v.location || ""} onChange={(e) => set({ location: e.target.value })} />
        </div>

        <div className="field">
          <label>MOOD</label>
          <select value={v.mood || ""} onChange={(e) => set({ mood: e.target.value })}>
            {MOODS.map((m, i) => (
              <option key={i} value={i === 0 ? "" : m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>WORD OF THE DAY</label>
          <input value={v.wordOfDay || ""} onChange={(e) => set({ wordOfDay: e.target.value })} />
        </div>

        <div className="field">
          <label>ERA</label>
          <select value={v.era || ""} onChange={(e) => set({ era: e.target.value })}>
            {ERAS.map((m, i) => (
              <option key={i} value={i === 0 ? "" : m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>SINGLENESS LEVEL</label>
          <select value={v.single || ""} onChange={(e) => set({ single: e.target.value })}>
            {SINGLE.map((m, i) => (
              <option key={i} value={i === 0 ? "" : m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label>HEAD HUMMER</label>
          <input
            value={v.headHummer || ""}
            onChange={(e) => set({ headHummer: e.target.value })}
            placeholder="song of the day (Spotify pull later)"
          />
        </div>
      </div>
    </div>
  );
}
