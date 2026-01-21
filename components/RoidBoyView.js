"use client";

import { useEffect, useState } from "react";
import { isoToday, readDay, updateDay } from "@/lib/mmocStore";

const MODES = ["RECOMP","BULK","LEANING","BOOKED"];
const WORKOUT_TYPES = ["UPPER","LOWER","FULL BODY","ISOLATION"];
const CARDIO_TYPES = ["OUTDOOR WALK","OUTDOOR RUN","PILATES","RUN CLUB","POLE DANCE CLASS","CROSSFIT","CYCLE","YOGA"];
const LIBIDO = ["Select\u2026", "Locked & Loaded", "Staring at Men Like a Crime", "High Heat, No Mercy", "Petty, Pretty, & Horny", "Temptation on Sight", "Feral but Disciplined", "Thirsty With Standards", "Touch-Starved, Still Dangerous", "Flirting as Cardio", "Wanting It, Not Chasing It", "Off Limits, Still Looking", "Emotionally Armed, Physically Ready", "Low Heat, Still Cute", "Dry Spell & Irritated", "Celibate-ish (Don\u2019t Ask)", "Peaceful. Untouchable.", "Safe Mode (For My Sanity)"];

export default function RoidBoyView({ dateISO }) {
  const date = dateISO || isoToday();

  const empty = {
    mode: "",
    arrivalTime: "",
    durationMin: "",
    gymLocation: "",
    workoutType: "",
    bodyStatsLocked: { weightLbs: "", bodyFatPct: "", inbodyDate: "" },
    libido: "",
    exercises: [],
    cardio: { type: "", clubName: "", location: "", startTime: "", durationMin: "" },
    notes: ""
  };

  const [state, setState] = useState(() => readDay(date)?.roidboy || empty);

  useEffect(() => {
    setState(readDay(date)?.roidboy || empty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const commit = (patch) => {
    setState((s) => {
      const next = { ...s, ...patch };
      updateDay(date, { roidboy: next });
      return next;
    });
  };

  const addExercise = () => {
    commit({ exercises: [...(state.exercises || []), { name: "", sets: "", weight: "", reps: "" }] });
  };

  const updateExercise = (ix, patch) => {
    const arr = [...(state.exercises || [])];
    arr[ix] = { ...arr[ix], ...patch };
    commit({ exercises: arr });
  };

  const removeExercise = (ix) => {
    const arr = [...(state.exercises || [])];
    arr.splice(ix, 1);
    commit({ exercises: arr });
  };

  return (
    <section className="card">
      <div className="view">
        <div className="pageHeader">
          <div className="pageTitle">
            <img className="peacockIcon" src="/ui/glyphs/roidboy.svg" alt="" />
            <span>ROID BOY</span>
          </div>
        </div>

        <div className="zone">
          <div className="zoneHead">
            <div className="zoneTitle">MODE</div>
          </div>
          <div className="grid2">
            <div className="field">
              <label>MODE</label>
              <select value={state.mode || ""} onChange={(e) => commit({ mode: e.target.value })}>
                <option value="">SELECT…</option>
                {MODES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>LIBIDO STATUS</label>
              <select value={state.libido || ""} onChange={(e) => commit({ libido: e.target.value })}>
                {LIBIDO.map((t, i) => (
                  <option key={i} value={i === 0 ? "" : t}>{t.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="zone">
          <div className="zoneHead">
            <div className="zoneTitle">SESSION</div>
          </div>
          <div className="grid2">
            <div className="field">
              <label>TIME OF ARRIVAL</label>
              <input value={state.arrivalTime || ""} onChange={(e) => commit({ arrivalTime: e.target.value })} />
            </div>
            <div className="field">
              <label>SESSION DURATION (MIN)</label>
              <input inputMode="numeric" value={state.durationMin || ""} onChange={(e) => commit({ durationMin: e.target.value })} />
            </div>
            <div className="field span2">
              <label>GYM LOCATION</label>
              <input value={state.gymLocation || ""} onChange={(e) => commit({ gymLocation: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="zone">
          <div className="zoneHead">
            <div className="zoneTitle">WEIGHTS</div>
            <div className="floatTools">
              <button type="button" className="glyphBtn" onClick={addExercise} aria-label="Add exercise">+</button>
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>WORKOUT TYPE</label>
              <select value={state.workoutType || ""} onChange={(e) => commit({ workoutType: e.target.value })}>
                <option value="">SELECT…</option>
                {WORKOUT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {(state.exercises || []).map((ex, ix) => (
            <div className="momentCard" key={ix} style={{ paddingTop: 12 }}>
              <div className="grid2">
                <div className="field span2">
                  <label>NAME OF EXERCISE</label>
                  <input value={ex.name || ""} onChange={(e) => updateExercise(ix, { name: e.target.value })} />
                </div>
                <div className="field">
                  <label>SETS</label>
                  <input inputMode="numeric" value={ex.sets || ""} onChange={(e) => updateExercise(ix, { sets: e.target.value })} />
                </div>
                <div className="field">
                  <label>WEIGHT</label>
                  <input inputMode="numeric" value={ex.weight || ""} onChange={(e) => updateExercise(ix, { weight: e.target.value })} />
                </div>
                <div className="field">
                  <label>REPS</label>
                  <input inputMode="numeric" value={ex.reps || ""} onChange={(e) => updateExercise(ix, { reps: e.target.value })} />
                </div>
              </div>
              <div className="actions">
                <button type="button" className="btn" onClick={() => removeExercise(ix)}>DELETE</button>
              </div>
            </div>
          ))}
        </div>

        <div className="zone">
          <div className="zoneHead">
            <div className="zoneTitle">CARDIO</div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>TYPE</label>
              <select
                value={state.cardio?.type || ""}
                onChange={(e) => commit({ cardio: { ...state.cardio, type: e.target.value } })}
              >
                <option value="">SELECT…</option>
                {CARDIO_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>LOCATION</label>
              <input
                value={state.cardio?.location || ""}
                onChange={(e) => commit({ cardio: { ...state.cardio, location: e.target.value } })}
              />
            </div>

            <div className="field">
              <label>START TIME</label>
              <input
                value={state.cardio?.startTime || ""}
                onChange={(e) => commit({ cardio: { ...state.cardio, startTime: e.target.value } })}
              />
            </div>

            <div className="field">
              <label>DURATION (MIN)</label>
              <input
                inputMode="numeric"
                value={state.cardio?.durationMin || ""}
                onChange={(e) => commit({ cardio: { ...state.cardio, durationMin: e.target.value } })}
              />
            </div>

            <div className="field span2">
              <label>RUN CLUB / CLASS / STUDIO</label>
              <input
                value={state.cardio?.clubName || ""}
                onChange={(e) => commit({ cardio: { ...state.cardio, clubName: e.target.value } })}
              />
            </div>
          </div>
        </div>

        <div className="zone">
          <div className="zoneHead">
            <div className="zoneTitle">TRAINING NOTES</div>
          </div>
          <div className="grid2">
            <div className="field span2">
              <label>NOTES</label>
              <textarea className="writerBox" value={state.notes || ""} onChange={(e) => commit({ notes: e.target.value })} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
