"use client";

import { useEffect, useMemo, useState } from "react";
import { isoToday, readDay, updateDay } from "@/lib/mmocStore";

const MODES = ["RECOMP","BULK","LEANING","BOOKED"];

export default function IntakeView({ dateISO }) {
  const date = dateISO || isoToday();

  const empty = {
    mode: "",
    macroGoal: { calories: 0, protein: 0, carbs: 0, fats: 0 },
    waterGoalOz: 0,
    waterOz: 0,
    meals: [], // {name, protein, carbs, fats, calories}
    cheatWed: { used: false, damage: { calories: 0, protein: 0, carbs: 0, fats: 0 } },
    cheatSat: { used: false, damage: { calories: 0, protein: 0, carbs: 0, fats: 0 } }
  };

  const [state, setState] = useState(() => readDay(date)?.intake || empty);

  useEffect(() => {
    setState(readDay(date)?.intake || empty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const commit = (patch) => {
    setState((s) => {
      const next = { ...s, ...patch };
      updateDay(date, { intake: next });
      return next;
    });
  };

  const totals = useMemo(() => {
    const t = { calories: 0, protein: 0, carbs: 0, fats: 0 };
    for (const m of (state.meals || [])) {
      t.calories += Number(m.calories || 0);
      t.protein += Number(m.protein || 0);
      t.carbs += Number(m.carbs || 0);
      t.fats += Number(m.fats || 0);
    }
    return t;
  }, [state.meals]);

  const pct = (v, g) => {
    const goal = Number(g || 0);
    if (!goal) return 0;
    return Math.max(0, Math.min(100, (Number(v || 0) / goal) * 100));
  };

  const addMeal = () => {
    const nextMeals = [...(state.meals || []), { name: "", protein: 0, carbs: 0, fats: 0, calories: 0 }];
    commit({ meals: nextMeals });
  };

  const updateMeal = (ix, patch) => {
    const arr = [...(state.meals || [])];
    arr[ix] = { ...arr[ix], ...patch };
    commit({ meals: arr });
  };

  const removeMeal = (ix) => {
    const arr = [...(state.meals || [])];
    arr.splice(ix, 1);
    commit({ meals: arr });
  };

  const CheatBlock = ({ label, keyName }) => {
    const block = state[keyName] || { used: false, damage: { calories: 0, protein: 0, carbs: 0, fats: 0 } };
    const dmg = block.damage || {};
    const setBlock = (patch) => commit({ [keyName]: { ...block, ...patch } });
    const setDamage = (patch) => setBlock({ damage: { ...dmg, ...patch } });

    return (
      <div className="zone">
        <div className="zoneHead">
          <div className="zoneTitle">{label}</div>
          <div className="floatTools">
            <button
              type="button"
              className="glyphBtn"
              onClick={() => setBlock({ used: !block.used })}
              aria-label="Toggle"
              title="Toggle"
            >
              {block.used ? "✓" : "—"}
            </button>
          </div>
        </div>

        <div className="grid2">
          <div className="field">
            <label>HOW MUCH DAMAGE DID I HIT — CALORIES</label>
            <input inputMode="numeric" value={dmg.calories || ""} onChange={(e)=>setDamage({ calories: Number(e.target.value||0) })} />
          </div>
          <div className="field">
            <label>PROTEIN (G)</label>
            <input inputMode="numeric" value={dmg.protein || ""} onChange={(e)=>setDamage({ protein: Number(e.target.value||0) })} />
          </div>
          <div className="field">
            <label>CARBS (G)</label>
            <input inputMode="numeric" value={dmg.carbs || ""} onChange={(e)=>setDamage({ carbs: Number(e.target.value||0) })} />
          </div>
          <div className="field">
            <label>FATS (G)</label>
            <input inputMode="numeric" value={dmg.fats || ""} onChange={(e)=>setDamage({ fats: Number(e.target.value||0) })} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="card">
      <div className="view">
        <div className="pageHeader">
          <div className="pageTitle">
            <img className="peacockIcon" src="/ui/glyphs/intake.svg" alt="" />
            <span>INTAKE</span>
          </div>
        </div>

        <div className="grid2">
          <div className="field">
            <label>MODE</label>
            <select value={state.mode || ""} onChange={(e)=>commit({ mode: e.target.value })}>
              <option value="">SELECT…</option>
              {MODES.map((m)=>(
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>WATER GOAL (OZ)</label>
            <input inputMode="numeric" value={state.waterGoalOz || ""} onChange={(e)=>commit({ waterGoalOz: Number(e.target.value||0) })} />
          </div>

          <div className="field">
            <label>WATER INTAKE (OZ)</label>
            <input inputMode="numeric" value={state.waterOz || ""} onChange={(e)=>commit({ waterOz: Number(e.target.value||0) })} />
          </div>
        </div>

        <div className="zone">
          <div className="zoneHead">
            <div className="zoneTitle">MACRO DAILY GOAL</div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>CALORIES</label>
              <input inputMode="numeric" value={state.macroGoal?.calories || ""} onChange={(e)=>commit({ macroGoal: { ...state.macroGoal, calories: Number(e.target.value||0) } })} />
            </div>
            <div className="field">
              <label>PROTEIN (G)</label>
              <input inputMode="numeric" value={state.macroGoal?.protein || ""} onChange={(e)=>commit({ macroGoal: { ...state.macroGoal, protein: Number(e.target.value||0) } })} />
            </div>
            <div className="field">
              <label>CARBS (G)</label>
              <input inputMode="numeric" value={state.macroGoal?.carbs || ""} onChange={(e)=>commit({ macroGoal: { ...state.macroGoal, carbs: Number(e.target.value||0) } })} />
            </div>
            <div className="field">
              <label>FATS (G)</label>
              <input inputMode="numeric" value={state.macroGoal?.fats || ""} onChange={(e)=>commit({ macroGoal: { ...state.macroGoal, fats: Number(e.target.value||0) } })} />
            </div>
          </div>

          <div className="list">
            <label>PROGRESS (VIEW ONLY)</label>
            <div className="bar"><div id="cycleFill" style={{ width: `${pct(totals.calories, state.macroGoal?.calories)}%` }} /></div>
            <div className="bar"><div id="cycleFill" style={{ width: `${pct(totals.protein, state.macroGoal?.protein)}%` }} /></div>
            <div className="bar"><div id="cycleFill" style={{ width: `${pct(totals.carbs, state.macroGoal?.carbs)}%` }} /></div>
            <div className="bar"><div id="cycleFill" style={{ width: `${pct(totals.fats, state.macroGoal?.fats)}%` }} /></div>
          </div>
        </div>

        <div className="zone">
          <div className="zoneHead">
            <div className="zoneTitle">MEAL LOG</div>
            <div className="floatTools">
              <button type="button" className="glyphBtn" onClick={addMeal} aria-label="Add meal">+</button>
            </div>
          </div>

          {(state.meals || []).map((m, ix)=>(
            <div className="momentCard" key={ix} style={{ paddingTop: 12 }}>
              <div className="grid2">
                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label>NAME OF MEAL</label>
                  <input value={m.name || ""} onChange={(e)=>updateMeal(ix, { name: e.target.value })} />
                </div>
                <div className="field">
                  <label>PROTEIN (G)</label>
                  <input inputMode="numeric" value={m.protein ?? ""} onChange={(e)=>updateMeal(ix, { protein: Number(e.target.value||0) })} />
                </div>
                <div className="field">
                  <label>CARBS (G)</label>
                  <input inputMode="numeric" value={m.carbs ?? ""} onChange={(e)=>updateMeal(ix, { carbs: Number(e.target.value||0) })} />
                </div>
                <div className="field">
                  <label>FATS (G)</label>
                  <input inputMode="numeric" value={m.fats ?? ""} onChange={(e)=>updateMeal(ix, { fats: Number(e.target.value||0) })} />
                </div>
                <div className="field">
                  <label>CALORIES</label>
                  <input inputMode="numeric" value={m.calories ?? ""} onChange={(e)=>updateMeal(ix, { calories: Number(e.target.value||0) })} />
                </div>
              </div>

              <div className="actions">
                <button type="button" className="btn" onClick={()=>removeMeal(ix)}>DELETE</button>
              </div>
            </div>
          ))}
        </div>

        <CheatBlock label="CHEAT MEAL — WEDNESDAY" keyName="cheatWed" />
        <CheatBlock label="CHEAT MEAL — SATURDAY" keyName="cheatSat" />
      </div>
    </section>
  );
}
