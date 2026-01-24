"use client";

import SectionMarker from "@/components/SectionMarker";
import AssessmentView from "@/components/AssessmentView";

/**
 * DailyHubView (LOCKED)
 * Permanent visible:
 *  - Assessment (inputs)
 *  - Intake progress bars (READ-ONLY snapshot)  ← NO numbers, no helper text
 *
 * NOT visible unless filled:
 *  - Context (only appears if any context exists)
 *  - Summation (only appears if any summation exists)
 *
 * Text doctrine:
 *  - ONLY field/section labels (e.g., MOOD / ERA / etc.)
 *  - NO helper text
 *  - NO totals text like "120/180"
 *  - Glyphs are the navigation language
 *
 * Props:
 *  - data: full app day state object (today)
 *  - onPatch: (partial) => void
 *  - onGo: (routeId) => void
 */
export default function DailyHubView({ data, onPatch, onGo }) {
  const d = data || {};
  const assessment = d.assessment || {};

  // Intake snapshot (progress only)
  const intake = d.intake || {};
  const goals = intake.goals || {}; // { calories, proteinG, carbsG, fatG, waterOz }
  const totals = intake.totals || {}; // { calories, proteinG, carbsG, fatG, waterOz }

  const pct = (v, g) => {
    const goal = Number(g || 0);
    const val = Number(v || 0);
    if (!goal || goal <= 0) return 0;
    return Math.max(0, Math.min(100, Math.round((val / goal) * 100)));
  };

  // Context appears ONLY if any context exists
  const moments = Array.isArray(d.moments) ? d.moments : [];
  const roidboy = d.roidboy || null;
  const ps = Array.isArray(d.ps) ? d.ps : [];

  const hasRoidboy =
    !!(
      roidboy &&
      (roidboy.mode ||
        roidboy.gymLocation ||
        roidboy.workoutType ||
        (Array.isArray(roidboy.exerciseLog) && roidboy.exerciseLog.length) ||
        roidboy.sessionDuration ||
        roidboy.arrivalTime)
    );

  const hasContext = (moments && moments.length > 0) || hasRoidboy || (ps && ps.length > 0);

  // Summation appears ONLY if it has anything
  const summation = d.summation || {};
  const hasSummation = !!(summation && (summation.text || summation.close || summation.sealNote));

  // Ornate divider sources (LOCKED PATHS)
  const ORNATE_ASSESS = "/ui/ornate/ornate-assessment.png";
  const ORNATE_INTAKE = "/ui/ornate/ornate-intake.png";
  const ORNATE_CONTEXT = "/ui/ornate/ornate-context.png";
  const ORNATE_SUMMATION = "/ui/ornate/ornate-summation.png";

  return (
    <div className="dailyHub">
      {/* ========== ASSESSMENT (PERMANENT) ========== */}
      <SectionMarker src={ORNATE_ASSESS} size={52} />
      <div className="zone">
        <div className="zoneHead">
          <div className="floatTools">
            <button type="button" className="glyphBtn" aria-label="Daily Hub" onClick={() => onGo?.("today")}>
              <img className="glyphImg" src="/ui/glyphs/sigil-eye.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="view">
          <AssessmentView value={assessment} onChange={(next) => onPatch?.({ assessment: next })} />
        </div>
      </div>

      {/* ========== INTAKE PROGRESS (PERMANENT - PROGRESS ONLY) ========== */}
      <SectionMarker src={ORNATE_INTAKE} size={52} />
      <div className="zone">
        <div className="zoneHead">
          <div className="floatTools">
            <button type="button" className="glyphBtn" aria-label="Intake" onClick={() => onGo?.("intake")}>
              <img className="glyphImg" src="/ui/glyphs/intake.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="view" style={{ paddingTop: 10 }}>
          <BarRow label="CALORIES" percent={pct(totals.calories, goals.calories)} />
          <BarRow label="PROTEIN (G)" percent={pct(totals.proteinG, goals.proteinG)} />
          <BarRow label="CARBS (G)" percent={pct(totals.carbsG, goals.carbsG)} />
          <BarRow label="FAT (G)" percent={pct(totals.fatG, goals.fatG)} />
          <BarRow label="WATER (OZ)" percent={pct(totals.waterOz, goals.waterOz)} />
        </div>
      </div>

      {/* ========== THE CONTEXT (HIDDEN UNTIL FILLED) ========== */}
      {hasContext ? (
        <>
          <SectionMarker src={ORNATE_CONTEXT} size={52} />
          <div className="zone">
            <div className="zoneHead">
              <div className="floatTools">
                <button type="button" className="glyphBtn" aria-label="Moments" onClick={() => onGo?.("moments")}>
                  <img className="glyphImg" src="/ui/glyphs/moments.svg" alt="" />
                </button>

                <button type="button" className="glyphBtn" aria-label="Roid Boy" onClick={() => onGo?.("roidboy")}>
                  <img className="glyphImg" src="/ui/glyphs/roidboy.svg" alt="" />
                </button>

                <button type="button" className="glyphBtn" aria-label="P.S." onClick={() => onGo?.("ps")}>
                  <img className="glyphImg" src="/ui/glyphs/ps.svg" alt="" />
                </button>
              </div>
            </div>

            {/* Context on hub is DISPLAY ONLY. No text. */}
            <div className="view">
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                {moments.length ? <MiniDot glyph="/ui/glyphs/moments.svg" /> : null}
                {hasRoidboy ? <MiniDot glyph="/ui/glyphs/roidboy.svg" /> : null}
                {ps.length ? <MiniDot glyph="/ui/glyphs/ps.svg" /> : null}
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* ========== SUMMATION (HIDDEN UNTIL FILLED) ========== */}
      {hasSummation ? (
        <>
          <SectionMarker src={ORNATE_SUMMATION} size={52} />
          <div className="zone">
            <div className="zoneHead">
              <div className="floatTools">
                <button type="button" className="glyphBtn" aria-label="Summation" onClick={() => onGo?.("summation")}>
                  <img className="glyphImg" src="/ui/glyphs/summation.svg" alt="" />
                </button>
              </div>
            </div>

            {/* Summation on hub is DISPLAY ONLY. No text. */}
            <div className="view">
              <MiniDot glyph="/ui/glyphs/summation.svg" />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

/* =========================
   Subcomponents (LOCKED)
   Labels-only doctrine.
   ========================= */

function BarRow({ label, percent }) {
  const p = Number(percent || 0);

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ margin: 0 }}>{label}</label>
      <div className="bar" style={{ margin: "10px 0 0 0" }}>
        <div style={{ height: "100%", width: `${p}%`, background: "rgba(176,141,43,.45)" }} />
      </div>
    </div>
  );
}

function MiniDot({ glyph }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <img className="glyphImg" src={glyph} alt="" style={{ width: 22, height: 22, opacity: 0.9 }} />
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 99,
          background: "rgba(216,168,184,.55)",
          boxShadow: "0 0 14px rgba(216,168,184,.18)",
          opacity: 0.9
        }}
      />
    </div>
  );
}
