"use client";

import AssessmentView from "./AssessmentView";

const pct = (v, goal) => {
  const n = Number(v || 0);
  const g = Number(goal || 0);
  if (!g) return 0;
  return Math.max(0, Math.min(100, Math.round((n / g) * 100)));
};

export default function DailyHubView({ dayISO, day, onPatch, onGo }) {
  const intake = day?.intake || {};
  const g = intake.macroGoal || {};
  const meals = Array.isArray(intake.meals) ? intake.meals : [];

  const totals = meals.reduce(
    (acc, m) => {
      const p = Number(m.protein || 0);
      const c = Number(m.carbs || 0);
      const f = Number(m.fats || 0);
      const cal = Number(m.calories || 0);
      return {
        protein: acc.protein + (Number.isFinite(p) ? p : 0),
        carbs: acc.carbs + (Number.isFinite(c) ? c : 0),
        fats: acc.fats + (Number.isFinite(f) ? f : 0),
        calories: acc.calories + (Number.isFinite(cal) ? cal : 0)
      };
    },
    { protein: 0, carbs: 0, fats: 0, calories: 0 }
  );

  const momentsCount = Array.isArray(day?.moments) ? day.moments.length : 0;
  const psCount = Array.isArray(day?.ps) ? day.ps.length : 0;

  return (
    <div className="container">
      {/* Assessment block (permanent start-of-day) */}
      <section className="card">
        <div className="view">
          <AssessmentView value={day?.assessment} onChange={(assessment) => onPatch({ assessment })} />
        </div>
      </section>

      {/* Intake summary */}
      <section className="card" style={{ marginTop: 12 }}>
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">INTAKE</div>
            <button className="btn ghost" type="button" onClick={() => onGo?.("intake")}>
              OPEN
            </button>
          </div>

          <div className="barRow">
            <div className="barLabel">CALORIES</div>
            <div className="bar">
              <div className="barFill" style={{ width: `${pct(totals.calories, g.calories)}%` }} />
            </div>
            <div className="barMeta">
              {totals.calories} / {g.calories || "—"}
            </div>
          </div>

          <div className="barRow">
            <div className="barLabel">PROTEIN</div>
            <div className="bar">
              <div className="barFill" style={{ width: `${pct(totals.protein, g.protein)}%` }} />
            </div>
            <div className="barMeta">
              {totals.protein}g / {g.protein || "—"}g
            </div>
          </div>

          <div className="barRow">
            <div className="barLabel">CARBS</div>
            <div className="bar">
              <div className="barFill" style={{ width: `${pct(totals.carbs, g.carbs)}%` }} />
            </div>
            <div className="barMeta">
              {totals.carbs}g / {g.carbs || "—"}g
            </div>
          </div>

          <div className="barRow">
            <div className="barLabel">FATS</div>
            <div className="bar">
              <div className="barFill" style={{ width: `${pct(totals.fats, g.fats)}%` }} />
            </div>
            <div className="barMeta">
              {totals.fats}g / {g.fats || "—"}g
            </div>
          </div>

          <div className="miniRow">
            <div className="miniPill">MOMENTS: {momentsCount}</div>
            <div className="miniPill">P.S.: {psCount}</div>
          </div>
        </div>
      </section>

      {/* Context shortcuts */}
      <section className="card" style={{ marginTop: 12 }}>
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">THE CONTEXT</div>
          </div>

          <div className="grid2">
            <button className="btn" type="button" onClick={() => onGo?.("moments")}>
              MOMENTS
            </button>
            <button className="btn" type="button" onClick={() => onGo?.("roidboy")}>
              ROID BOY
            </button>
            <button className="btn" type="button" onClick={() => onGo?.("ps")}>
              P.S.
            </button>
            <button className="btn" type="button" onClick={() => onGo?.("summation")}>
              SUMMATION
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
