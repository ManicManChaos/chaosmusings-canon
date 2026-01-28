"use client";

import AssessmentView from "@/components/AssessmentView";

/**
 * DailyHubView — LOCKED
 *
 * Permanent visible:
 *  - Assessment
 *  - Intake progress bars
 *
 * Hidden until populated:
 *  - Context
 *  - Summation
 *
 * NO helper text
 * NO section titles
 * Glyphs + ornate only
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

  const moments = Array.isArray(d.moments) ? d.moments : [];
  const roidboy = d.roidboy || null;
  const ps = Array.isArray(d.ps) ? d.ps : [];

  const hasContext =
    moments.length ||
    (roidboy && Object.keys(roidboy).length) ||
    ps.length;

  const summation = d.summation || {};
  const hasSummation = !!(summation.text || summation.close || summation.sealNote);

  // ORNATE PATHS — MUST EXIST IN /public/ui/ornate/
  const ORNATE_ASSESS = "/ui/ornate/ornate-assessment.png";
  const ORNATE_INTAKE = "/ui/ornate/ornate-intake.png";
  const ORNATE_CONTEXT = "/ui/ornate/ornate-context.png";
  const ORNATE_SUMMATION = "/ui/ornate/ornate-summation.png";

  return (
    <div className="dailyHub">
      {/* ASSESSMENT */}
      <div className="zone">
        <div className="zoneHead">
          <div className="floatTools">
            <button className="glyphBtn" onClick={() => onGo("today")}>
              <img className="glyphImg" src="/ui/ornate/ornate-today.png" alt="" />
            </button>
          </div>
        </div>
        <div className="view">
          <AssessmentView
            value={assessment}
            onChange={(next) => onPatch?.({ assessment: next })}
          />
        </div>
      </div>

      {/* INTAKE PROGRESS */}
      <div className="zone">
        <div className="zoneHead">
          <div className="floatTools">
            <button className="glyphBtn" onClick={() => onGo("intake")}>
              <img className="glyphImg" src="/ui/ornate/ornate-intake.png" alt="" />
            </button>
          </div>
        </div>

        <div className="view">
          <Bar label="CALORIES" v={totals.calories} g={goals.calories} p={pct(totals.calories, goals.calories)} />
          <Bar label="PROTEIN" v={totals.proteinG} g={goals.proteinG} p={pct(totals.proteinG, goals.proteinG)} />
          <Bar label="CARBS" v={totals.carbsG} g={goals.carbsG} p={pct(totals.carbsG, goals.carbsG)} />
          <Bar label="FAT" v={totals.fatG} g={goals.fatG} p={pct(totals.fatG, goals.fatG)} />
          <Bar label="WATER" v={totals.waterOz} g={goals.waterOz} p={pct(totals.waterOz, goals.waterOz)} />
        </div>
      </div>

      {/* CONTEXT */}
      {hasContext && (
        <>
          <div className="zone">
            <div className="zoneHead">
              <div className="floatTools">
                <Glyph onClick={() => onGo("moments")} src="/ui/ornate/ornate-context.png" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* SUMMATION */}
      {hasSummation && (
        <>
          <div className="zone">
            <div className="zoneHead">
              <div className="floatTools">
                <Glyph onClick={() => onGo("summation")} src="/ui/ornate/ornate-summation.png" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Bar({ label, v, g, p }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label>{label}</label>
      <div className="bar">
        <div style={{ width: `${p}%`, height: "100%", background: "rgba(176,141,43,.45)" }} />
      </div>
    </div>
  );
}

function Glyph({ src, onClick }) {
  return (
    <button className="glyphBtn" onClick={onClick}>
      <img className="glyphImg" src={src} alt="" />
    </button>
  );
}
