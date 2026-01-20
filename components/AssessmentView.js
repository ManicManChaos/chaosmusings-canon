"use client";

import { useMemo } from "react";

export default function AssessmentView() {
  const moods = useMemo(
    () => [
      "",
      "Horny for Peace",
      "Feral & Focused",
      "Violently Calm",
      "Plotting With a Semi",
      "Built Like a Threat",
      "Calm Like a Loaded Weapon",
      "Observing Before Engaging",
      "Silence Is Strategic",
      "Hyperfocused and Unreachable",
      "Overstimulated but Managing",
      "Unmasked and Exposed",
      "Indifferent and Relieved",
      "Regulated Enough",
      "Still Standing"
    ],
    []
  );

  const eras = useMemo(
    () => [
      "",
      "Villain Era",
      "Whore4More",
      "Plotting Season",
      "Built, Not Broken",
      "Hard Body, Harder Boundaries",
      "Detachment Training",
      "Gym God Ascension",
      "Strength Without Apology",
      "Discipline Over Desire",
      "Power Stabilization",
      "Hyperfocus Arc",
      "Manic Clarity Window",
      "Burnout Containment",
      "Knowing Exactly Who I Am"
    ],
    []
  );

  const singles = useMemo(
    () => [
      "",
      "Single and Self-Controlled",
      "Single, Not Looking",
      "Single but Curious",
      "Crushing Quietly",
      "Mutual Tension, No Labels",
      "Attracted but Guarded",
      "Emotionally Involved",
      "Unavailable by Design",
      "Heart Closed for Maintenance",
      "Choosing Myself"
    ],
    []
  );

  // Your request: snarky, explicit, active — no “low/high/awake/off” boring labels.
  const libido = useMemo(
    () => [
      "",
      "I’d ruin a man politely",
      "One compliment away from a crime",
      "If he texts “wyd” it’s over",
      "Ready to misbehave responsibly",
      "Down bad, but with standards",
      "Touch-starved and dangerous",
      "Flirting like it’s cardio",
      "Acting calm, thinking filthy",
      "Aroused by discipline",
      "Unholy but well-mannered",
      "Need a mouth, not a conversation",
      "I’m the problem and the solution",
      "If he’s tall, I’m folding",
      "Hunting, not hoping",
      "I could be convinced"
    ],
    []
  );

  return (
    <section className="card">
      <div className="cardHead" style={S.head}>
        <div style={S.left}>
          <img
            src="/ui/glyphs/sigil-eye.svg"
            alt=""
            draggable={false}
            style={S.eye}
          />
          <div style={S.title}>THE ASSESSMENT</div>
        </div>
      </div>

      <div className="cardBody" style={{ padding: 14 }}>
        <div className="grid2">
          <input className="inp" placeholder="TITLE OF THE DAY" />
          <input className="inp" placeholder="LOCATION" />
        </div>

        <div className="grid2" style={{ marginTop: 10 }}>
          <select className="inp" defaultValue="">
            {moods.map((t) => (
              <option key={t} value={t}>
                {t ? t.toUpperCase() : "MOOD…"}
              </option>
            ))}
          </select>

          <input className="inp" placeholder="WORD OF THE DAY" />
        </div>

        <div className="grid2" style={{ marginTop: 10 }}>
          <select className="inp" defaultValue="">
            {eras.map((t) => (
              <option key={t} value={t}>
                {t ? t.toUpperCase() : "ERA…"}
              </option>
            ))}
          </select>

          <select className="inp" defaultValue="">
            {singles.map((t) => (
              <option key={t} value={t}>
                {t ? t.toUpperCase() : "SINGLE STATUS…"}
              </option>
            ))}
          </select>
        </div>

        <div className="grid2" style={{ marginTop: 10 }}>
          <select className="inp" defaultValue="">
            {libido.map((t) => (
              <option key={t} value={t}>
                {t ? t.toUpperCase() : "LIBIDO STATUS…"}
              </option>
            ))}
          </select>

          {/* INTENT removed. HEAD HUMMER added. */}
          <input className="inp" placeholder="HEAD HUMMER (SONG OF THE DAY)" />
        </div>
      </div>
    </section>
  );
}

const S = {
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px 10px"
  },
  left: { display: "flex", alignItems: "center", gap: 10 },
  eye: {
    width: 22,
    height: 22,
    opacity: 0.95,
    filter: "drop-shadow(0 0 10px rgba(255,90,168,.18))"
  },
  title: {
    letterSpacing: ".22em",
    textTransform: "uppercase",
    fontWeight: 650
  }
};
