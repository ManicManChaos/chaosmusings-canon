"use client";

import AssessmentView from "@/components/AssessmentView";

/**
 * DailyHubView — LOCKED
 * - NO helper text
 * - NO section titles
 * - NO in-section glyph clutter (navigation stays in sidebar + header)
 */

export default function DailyHubView({ data, onPatch, onGo }) {
  const d = data || {};
  const assessment = d.assessment || {};

  const intake = d.intake || {};
  const goals = intake.goals || {};
  const totals = intake.totals || {};

  const pct = (v, g) => {
    if (!g) return 0;
    return Math.min(100, Math.round((Number(v || 0) / Number(g)) * 100));
  };

  return (
    <div className="dailyHub">
      <div className="zone">
        <div className="view">
          <AssessmentView value={assessment} onChange={(next) => onPatch?.({ assessment: next })} />
        </div>
      </div>

      <div className="zone">
        <div className="view">
          <Bar label="CALORIES" v={totals.calories} g={goals.calories} p={pct(totals.calories, goals.calories)} />
          <Bar label="PROTEIN" v={totals.proteinG} g={goals.proteinG} p={pct(totals.proteinG, goals.proteinG)} />
          <Bar label="CARBS" v={totals.carbsG} g={goals.carbsG} p={pct(totals.carbsG, goals.carbsG)} />
          <Bar label="FAT" v={totals.fatG} g={goals.fatG} p={pct(totals.fatG, goals.fatG)} />
          <Bar label="WATER" v={totals.waterOz} g={goals.waterOz} p={pct(totals.waterOz, goals.waterOz)} />
        </div>
      </div>
    </div>
  );
}

function Bar({ label, v, g, p }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label>{label}</label>
      <div className="bar">
        <div style={{ width: `${p}%`, height: "100%", background: "rgba(214,179,106,.35)" }} />
      </div>
    </div>
  );
}
