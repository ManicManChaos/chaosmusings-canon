"use client";

import { useMemo } from "react";

const MODES = ["RECOMP", "BULK", "LEANING", "BOOKED"];

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function IntakeView({ day, onPatch }) {
  const intake = day?.intake || {};
  const goal = intake.macroGoal || {};
  const meals = Array.isArray(intake.meals) ? intake.meals : [];

  const totals = useMemo(() => {
    return meals.reduce(
      (acc, m) => ({
        calories: acc.calories + num(m.calories),
        protein: acc.protein + num(m.protein),
        carbs: acc.carbs + num(m.carbs),
        fats: acc.fats + num(m.fats)
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [meals]);

  const set = (partial) => onPatch({ intake: { ...intake, ...partial } });

  const setGoal = (k, v) => set({ macroGoal: { ...goal, [k]: v } });

  const setMeal = (ix, patch) => {
    const next = meals.map((m, i) => (i === ix ? { ...m, ...patch } : m));
    set({ meals: next });
  };

  const addMeal = () => {
    set({
      meals: [
        ...meals,
        { name: "", protein: "", carbs: "", fats: "", calories: "" }
      ]
    });
  };

  const delMeal = (ix) => {
    set({ meals: meals.filter((_, i) => i !== ix) });
  };

  const toggleCheat = (dayKey, happened) => {
    const cheat = intake.cheat || { wed: { happened: false, damage: "" }, sat: { happened: false, damage: "" } };
    set({ cheat: { ...cheat, [dayKey]: { ...(cheat[dayKey] || {}), happened: !!happened } } });
  };

  const setCheatDamage = (dayKey, v) => {
    const cheat = intake.cheat || { wed: { happened: false, damage: "" }, sat: { happened: false, damage: "" } };
    set({ cheat: { ...cheat, [dayKey]: { ...(cheat[dayKey] || {}), damage: v } } });
  };

  const pct = (value, goalVal) => {
    const g = num(goalVal);
    if (!g) return 0;
    return Math.max(0, Math.min(100, Math.round((num(value) / g) * 100)));
  };

  return (
    <div className="container">
      <section className="card">
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">INTAKE</div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>MODE</label>
              <select value={intake.mode || ""} onChange={(e) => set({ mode: e.target.value })}>
                <option value="">SELECT…</option>
                {MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>WATER (OZ)</label>
              <input
                value={intake.waterOz || ""}
                onChange={(e) => set({ waterOz: e.target.value })}
                inputMode="numeric"
                placeholder="e.g., 96"
              />
            </div>

            <div className="field">
              <label>WATER GOAL (OZ)</label>
              <input
                value={intake.waterGoalOz ?? ""}
                onChange={(e) => set({ waterGoalOz: e.target.value })}
                inputMode="numeric"
                placeholder="e.g., 128"
              />
            </div>
          </div>

          <div className="zone">
            <div className="zoneHead">
              <div className="zoneTitle">DAILY MACRO GOALS</div>
            </div>

            <div className="grid2">
              <div className="field">
                <label>CALORIES</label>
                <input value={goal.calories ?? ""} onChange={(e) => setGoal("calories", e.target.value)} inputMode="numeric" />
              </div>
              <div className="field">
                <label>PROTEIN (G)</label>
                <input value={goal.protein ?? ""} onChange={(e) => setGoal("protein", e.target.value)} inputMode="numeric" />
              </div>
              <div className="field">
                <label>CARBS (G)</label>
                <input value={goal.carbs ?? ""} onChange={(e) => setGoal("carbs", e.target.value)} inputMode="numeric" />
              </div>
              <div className="field">
                <label>FATS (G)</label>
                <input value={goal.fats ?? ""} onChange={(e) => setGoal("fats", e.target.value)} inputMode="numeric" />
              </div>
            </div>

            <div className="barRow">
              <div className="barLabel">CALORIES</div>
              <div className="bar">
                <div className="barFill" style={{ width: `${pct(totals.calories, goal.calories)}%` }} />
              </div>
              <div className="barMeta">
                {totals.calories} / {goal.calories || "—"}
              </div>
            </div>

            <div className="barRow">
              <div className="barLabel">PROTEIN</div>
              <div className="bar">
                <div className="barFill" style={{ width: `${pct(totals.protein, goal.protein)}%` }} />
              </div>
              <div className="barMeta">
                {totals.protein}g / {goal.protein || "—"}g
              </div>
            </div>

            <div className="barRow">
              <div className="barLabel">CARBS</div>
              <div className="bar">
                <div className="barFill" style={{ width: `${pct(totals.carbs, goal.carbs)}%` }} />
              </div>
              <div className="barMeta">
                {totals.carbs}g / {goal.carbs || "—"}g
              </div>
            </div>

            <div className="barRow">
              <div className="barLabel">FATS</div>
              <div className="bar">
                <div className="barFill" style={{ width: `${pct(totals.fats, goal.fats)}%` }} />
              </div>
              <div className="barMeta">
                {totals.fats}g / {goal.fats || "—"}g
              </div>
            </div>
          </div>

          <div className="zone" style={{ marginTop: 12 }}>
            <div className="zoneHead">
              <div className="zoneTitle">CHEAT MEAL</div>
            </div>

            <div className="grid2">
              <div className="field">
                <label>WEDNESDAY</label>
                <select
                  value={(intake.cheat?.wed?.happened ? "YES" : "NO")}
                  onChange={(e) => toggleCheat("wed", e.target.value === "YES")}
                >
                  <option>NO</option>
                  <option>YES</option>
                </select>
              </div>
              <div className="field">
                <label>DAMAGE (PROTEIN/CARBS/FATS/CALS)</label>
                <input
                  value={intake.cheat?.wed?.damage || ""}
                  onChange={(e) => setCheatDamage("wed", e.target.value)}
                  placeholder="e.g., +20P +80C +30F +900"
                />
              </div>

              <div className="field">
                <label>SATURDAY</label>
                <select
                  value={(intake.cheat?.sat?.happened ? "YES" : "NO")}
                  onChange={(e) => toggleCheat("sat", e.target.value === "YES")}
                >
                  <option>NO</option>
                  <option>YES</option>
                </select>
              </div>
              <div className="field">
                <label>DAMAGE (PROTEIN/CARBS/FATS/CALS)</label>
                <input
                  value={intake.cheat?.sat?.damage || ""}
                  onChange={(e) => setCheatDamage("sat", e.target.value)}
                  placeholder="e.g., +20P +80C +30F +900"
                />
              </div>
            </div>
          </div>

          <div className="zone" style={{ marginTop: 12 }}>
            <div className="zoneHead">
              <div className="zoneTitle">MEAL LOG</div>
              <div className="floatTools">
                <button className="glyphBtn" type="button" onClick={addMeal} aria-label="Add meal">
                  +
                </button>
              </div>
            </div>

            {meals.length === 0 ? (
              <div className="list">NO MEALS YET.</div>
            ) : (
              <div className="list">
                {meals.map((m, ix) => (
                  <div key={ix} className="momentCard">
                    <div className="grid2">
                      <div className="field">
                        <label>NAME OF MEAL</label>
                        <input value={m.name || ""} onChange={(e) => setMeal(ix, { name: e.target.value })} />
                      </div>
                      <div className="field">
                        <label>CALORIES</label>
                        <input value={m.calories ?? ""} onChange={(e) => setMeal(ix, { calories: e.target.value })} inputMode="numeric" />
                      </div>
                      <div className="field">
                        <label>PROTEIN (G)</label>
                        <input value={m.protein ?? ""} onChange={(e) => setMeal(ix, { protein: e.target.value })} inputMode="numeric" />
                      </div>
                      <div className="field">
                        <label>CARBS (G)</label>
                        <input value={m.carbs ?? ""} onChange={(e) => setMeal(ix, { carbs: e.target.value })} inputMode="numeric" />
                      </div>
                      <div className="field">
                        <label>FATS (G)</label>
                        <input value={m.fats ?? ""} onChange={(e) => setMeal(ix, { fats: e.target.value })} inputMode="numeric" />
                      </div>
                    </div>

                    <div style={{ marginTop: 10 }}>
                      <button className="btn danger" type="button" onClick={() => delMeal(ix)}>
                        DELETE MEAL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
