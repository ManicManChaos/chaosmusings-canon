"use client";

/* ===== APPROVED LOCKED LISTS ===== */

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

const SINGLE = [
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

/* ===== COMPONENT ===== */

export default function AssessmentView({ value, onChange }) {
  const v = value || {};
  const set = (p) => onChange?.({ ...v, ...p });

  return (
    <div className="assessment">

      {/* TITLE — top / centered */}
      <div className="titleRow">
        <input
          className="titleInput"
          value={v.title || ""}
          onChange={(e) => set({ title: e.target.value })}
        />
      </div>

      {/* GRID */}
      <div className="grid2">

        <div className="field">
          <label>HEAD HUMMER</label>
          <input
            value={v.headHummer || ""}
            onChange={(e) => set({ headHummer: e.target.value })}
          />
        </div>

        <div className="field">
          <label>LOCATION</label>
          <input
            value={v.location || ""}
            onChange={(e) => set({ location: e.target.value })}
          />
        </div>

        <div className="field">
          <label>MOOD</label>
          <select value={v.mood || ""} onChange={(e) => set({ mood: e.target.value })}>
            <option value="" />
            {MOODS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>WORD OF THE DAY</label>
          <input
            value={v.wordOfDay || ""}
            onChange={(e) => set({ wordOfDay: e.target.value })}
          />
        </div>

        <div className="field">
          <label>ERA</label>
          <select value={v.era || ""} onChange={(e) => set({ era: e.target.value })}>
            <option value="" />
            {ERAS.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>SINGLENESS LEVEL</label>
          <select value={v.single || ""} onChange={(e) => set({ single: e.target.value })}>
            <option value="" />
            {SINGLE.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}
