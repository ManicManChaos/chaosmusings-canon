"use client";

/**
 * AssessmentView (LOCKED)
 * - Controlled component: value + onChange
 * - Labels-only doctrine: NO helper text, NO placeholders, NO extra titles
 * - Layout:
 *   - Title (center top)
 *   - Left column: Head Hummer / Mood / Era
 *   - Right column: Location / Word of the Day / Singleness Level
 */

const MOODS = [
  "Horny for Peace",
  "Feral & Focused",
  "Violently Calm",
  "Sexually Frustrated but Contained",

  "Plotting With a Semi",
  "Muscle Memory and Trauma",
  "Built Like a Threat",
  "Calm Like a Loaded Weapon",
  "Hard Body, Closed Heart",

  "Wanting Touch, Refusing Attachment",
  "Desire Without Permission",
  "Attracted but Unavailable",
  "Crushing Quietly",
  "Sexually Awake, Emotionally Armed",

  "Detached for My Own Safety",
  "Heart Locked, Body Open",
  "Missing Someone I Shouldn’t",
  "Grief With Good Posture",
  "Sad, Not Weak",

  "Petty but Correct",
  "Annoyed by Everyone",
  "Do Not Test Me",
  "Observing Before Engaging",
  "Silence Is Strategic",

  "Hyperfocused and Unreachable",
  "Overstimulated but Managing",
  "Brain on Fire",
  "Mask On, Emotions Offline",
  "Unmasked and Exposed",

  "Indifferent and Relieved",
  "Regulated Enough",
  "Resting in My Body",
  "Safe for Now",
  "Still Standing"
];

const ERAS = [
  "Villain Era",
  "Whore4More",
  "Horny for Peace",

  "Muscle Memory and Trauma",
  "Plotting Season",
  "Built, Not Broken",
  "Hard Body, Harder Boundaries",
  "Flesh and Willpower",

  "Dangerous Crush Season",
  "Attachment Without Illusions",
  "Wanting Without Chasing",
  "Letting Someone Matter (Carefully)",

  "Post-Heartbreak Control Phase",
  "Emotional Scar Tissue",
  "Grief Without Collapse",
  "Detachment Training",

  "Gym God Ascension",
  "Strength Without Apology",
  "Discipline Over Desire",
  "Power Stabilization",

  "Hyperfocus Arc",
  "Manic Clarity Window",
  "Burnout Containment",
  "Re-Regulation Protocol",

  "Silence as Strategy",
  "No Negotiation Period",
  "Energy Preservation Mode",

  "Nothing to Prove",
  "Knowing Exactly Who I Am"
];

const SINGLES = [
  "Single and Self-Controlled",
  "Single, Not Looking",
  "Single but Curious",
  "Crushing Quietly",
  "Mutual Tension, No Labels",
  "Attracted but Guarded",
  "Emotionally Involved",
  "Physically Attached, Emotionally Cautious",
  "Letting Someone In (Slowly)",
  "Complicated on Purpose",
  "Unavailable by Design",
  "Attached Against My Will",
  "Heart Closed for Maintenance",
  "Recovering From Someone",
  "Detaching With Intent",
  "Indifferent and Relieved",
  "Choosing Myself"
];

export default function AssessmentView({ value, onChange }) {
  const v = value || {};
  const set = (patch) => onChange?.({ ...v, ...patch });

  return (
    <div>
      {/* TITLE (CENTER TOP) */}
      <div className="titleRow">
        <div className="field" style={{ marginTop: 0 }}>
          <label>TITLE OF THE DAY</label>
          <input
            className="titleInput"
            value={v.title || ""}
            onChange={(e) => set({ title: e.target.value })}
            inputMode="text"
            autoCapitalize="characters"
            autoCorrect="off"
          />
        </div>
      </div>

      {/* TWO COLUMNS: LEFT vs RIGHT (LOCKED ORDER) */}
      <div
        className="grid2"
        style={{
          gridTemplateColumns: "1fr 1fr",
          alignItems: "start"
        }}
      >
        {/* LEFT COLUMN */}
        <div className="field" style={{ gridColumn: "1 / 2" }}>
          <label>HEAD HUMMER</label>
          <input
            value={v.headHummer || ""}
            onChange={(e) => set({ headHummer: e.target.value })}
            inputMode="text"
            autoCorrect="off"
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="field" style={{ gridColumn: "2 / 3" }}>
          <label>LOCATION</label>
          <input
            value={v.location || ""}
            onChange={(e) => set({ location: e.target.value })}
            inputMode="text"
            autoCorrect="off"
          />
        </div>

        <div className="field" style={{ gridColumn: "1 / 2" }}>
          <label>MOOD</label>
          <select value={v.mood || ""} onChange={(e) => set({ mood: e.target.value })}>
            <option value="">SELECT…</option>
            {MOODS.map((m) => (
              <option key={m} value={m}>
                {m.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="field" style={{ gridColumn: "2 / 3" }}>
          <label>WORD OF THE DAY</label>
          <input
            value={v.wordOfDay || ""}
            onChange={(e) => set({ wordOfDay: e.target.value })}
            inputMode="text"
            autoCorrect="off"
          />
        </div>

        <div className="field" style={{ gridColumn: "1 / 2" }}>
          <label>ERA</label>
          <select value={v.era || ""} onChange={(e) => set({ era: e.target.value })}>
            <option value="">SELECT…</option>
            {ERAS.map((m) => (
              <option key={m} value={m}>
                {m.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="field" style={{ gridColumn: "2 / 3" }}>
          <label>SINGLENESS LEVEL</label>
          <select value={v.single || ""} onChange={(e) => set({ single: e.target.value })}>
            <option value="">SELECT…</option>
            {SINGLES.map((m) => (
              <option key={m} value={m}>
                {m.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
