"use client";

import { useEffect, useState } from "react";
import { ICONS } from "@/lib/assets";

const toParts = () => {
  const d = new Date();
  const day = d.toLocaleDateString(undefined, { weekday: "long" }).toUpperCase();
  const date = d
    .toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
  const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }).toUpperCase();
  return { day, date, time };
};

// CANON dropdown sets (FULL)
const MOODS = [
  "Select…",
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
  "(optional)",
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
  "Select…",
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

const renderOptions = (arr, firstValueEmpty = true) =>
  arr.map((t, i) => {
    const v = i === 0 && firstValueEmpty ? "" : t;
    return (
      <option key={`${t}-${i}`} value={v}>
        {String(t).toUpperCase()}
      </option>
    );
  });

export default function AssessmentView() {
  const [chip, setChip] = useState(() => toParts());

  useEffect(() => {
    const t = setInterval(() => setChip(toParts()), 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="view">
      <header className="tnlHeader" aria-label="Tell No Lies Header">
        <div className="tnlLeft" aria-hidden="true">
          <img className="tnlEye" src={ICONS.eye} alt="" />
        </div>

        <div className="tnlTitle">TELL NO LIES</div>

        <div className="tnlChips" aria-label="Date and Time">
          <div className="chip">{chip.day}</div>
          <div className="chip">{chip.date}</div>
          <div className="chip">{chip.time}</div>
        </div>
      </header>

      <section className="card assessmentCard">
        <div className="assessHead">
          <div className="assessTitle">THE ASSESSMENT</div>
          <div className="assessTools" aria-hidden="true">
            <div className="toolDot" />
            <div className="toolDot" />
            <div className="toolDot" />
            <div className="toolDot" />
          </div>
        </div>

        <div className="assessBody">
          <div className="titleRow">
            <input className="titleInput" name="entryTitle" placeholder="" autoComplete="off" />
          </div>

          <div className="grid2">
            <div className="field">
              <label>LOCATION</label>
              <input className="inp" name="entryLocation" placeholder="" autoComplete="off" />
            </div>

            <div className="field">
              <label>HEAD HUMMER</label>
              <input className="inp" name="entryIntent" placeholder="" autoComplete="off" />
            </div>

            <div className="field">
              <label>MOOD</label>
              <select className="inp" name="entryMood" defaultValue="">
                {renderOptions(MOODS, true)}
              </select>
            </div>

            <div className="field">
              <label>WORD OF THE DAY</label>
              <input className="inp" name="entryWord" placeholder="" autoComplete="off" />
            </div>

            <div className="field">
              <label>ERA</label>
              <select className="inp" name="entryEra" defaultValue="">
                {renderOptions(ERAS, true)}
              </select>
            </div>

            <div className="field">
              <label>SINGLENESS LEVEL</label>
              <select className="inp" name="entrySingle" defaultValue="">
                {renderOptions(SINGLES, true)}
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
