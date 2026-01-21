"use client";

import { useEffect, useMemo, useState } from "react";
import { isoToday, readDay, updateDay } from "@/lib/mmocStore";

const MOODS = ["Select\u2026", "Horny for Peace", "Feral & Focused", "Violently Calm", "Sexually Frustrated but Contained", "Plotting With a Semi", "Muscle Memory and Trauma", "Built Like a Threat", "Calm Like a Loaded Weapon", "Hard Body, Closed Heart", "Wanting Touch, Refusing Attachment", "Desire Without Permission", "Attracted but Unavailable", "Crushing Quietly", "Sexually Awake, Emotionally Armed", "Detached for My Own Safety", "Heart Locked, Body Open", "Missing Someone I Shouldn\u2019t", "Grief With Good Posture", "Sad, Not Weak", "Petty but Correct", "Annoyed by Everyone", "Do Not Test Me", "Observing Before Engaging", "Silence Is Strategic", "Hyperfocused and Unreachable", "Overstimulated but Managing", "Brain on Fire", "Mask On, Emotions Offline", "Unmasked and Exposed", "Indifferent and Relieved", "Regulated Enough", "Resting in My Body", "Safe for Now", "Still Standing"];
const ERAS = ["(optional)", "Villain Era", "Whore4More", "Horny for Peace", "Muscle Memory and Trauma", "Plotting Season", "Built, Not Broken", "Hard Body, Harder Boundaries", "Flesh and Willpower", "Dangerous Crush Season", "Attachment Without Illusions", "Wanting Without Chasing", "Letting Someone Matter (Carefully)", "Post-Heartbreak Control Phase", "Emotional Scar Tissue", "Grief Without Collapse", "Detachment Training", "Gym God Ascension", "Strength Without Apology", "Discipline Over Desire", "Power Stabilization", "Hyperfocus Arc", "Manic Clarity Window", "Burnout Containment", "Re-Regulation Protocol", "Silence as Strategy", "No Negotiation Period", "Energy Preservation Mode", "Nothing to Prove", "Knowing Exactly Who I Am"];
const SINGLES = ["Select\u2026", "Single and Self-Controlled", "Single, Not Looking", "Single but Curious", "Crushing Quietly", "Mutual Tension, No Labels", "Attracted but Guarded", "Emotionally Involved", "Physically Attached, Emotionally Cautious", "Letting Someone In (Slowly)", "Complicated on Purpose", "Unavailable by Design", "Attached Against My Will", "Heart Closed for Maintenance", "Recovering From Someone", "Detaching With Intent", "Indifferent and Relieved", "Choosing Myself"];

export default function AssessmentView({ dateISO }) {
  const date = dateISO || isoToday();
  const [state, setState] = useState(() => readDay(date)?.assessment || {
    title: "",
    location: "",
    headHummer: "",
    mood: "",
    word: "",
    era: "",
    single: ""
  });

  useEffect(() => {
    setState(readDay(date)?.assessment || {
      title: "",
      location: "",
      headHummer: "",
      mood: "",
      word: "",
      era: "",
      single: ""
    });
  }, [date]);

  const commit = (patch) => {
    setState((s) => {
      const next = { ...s, ...patch };
      updateDay(date, { assessment: next });
      return next;
    });
  };

  return (
    <section className="card">
      <div className="view">
        <div className="pageHeader">
          <div className="pageTitle">
            <img className="peacockIcon" src="/ui/png/sigil-eye.png" alt="" />
            <span>ASSESSMENT</span>
          </div>
        </div>

        <div className="titleRow">
          <input
            className="titleInput"
            value={state.title}
            onChange={(e)=>commit({title:e.target.value})}
            placeholder="TITLE OF THE DAY"
            aria-label="Title of the day"
          />
        </div>

        <div className="grid2">
          <div className="field">
            <label>WHERE ARE YOU</label>
            <input value={state.location} onChange={(e)=>commit({location:e.target.value})} />
          </div>

          <div className="field">
            <label>HEAD HUMMER</label>
            <input value={state.headHummer} onChange={(e)=>commit({headHummer:e.target.value})} />
          </div>

          <div className="field">
            <label>MOOD</label>
            <select value={state.mood} onChange={(e)=>commit({mood:e.target.value})}>
              {MOODS.map((t,i)=>(
                <option key={i} value={i===0 ? "" : t}>{t.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>WORD OF THE DAY</label>
            <input value={state.word} onChange={(e)=>commit({word:e.target.value})} />
          </div>

          <div className="field">
            <label>ERA</label>
            <select value={state.era} onChange={(e)=>commit({era:e.target.value})}>
              {ERAS.map((t,i)=>(
                <option key={i} value={i===0 ? "" : t}>{t.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>SINGLENESS LEVEL</label>
            <select value={state.single} onChange={(e)=>commit({single:e.target.value})}>
              {SINGLES.map((t,i)=>(
                <option key={i} value={i===0 ? "" : t}>{t.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
