"use client";

import SectionMarker from "@/components/SectionMarker";
import AssessmentView from "@/components/AssessmentView";

/**
 * DailyHub (LOCKED)
 * Permanent visible:
 *  - Assessment (inputs)
 *  - Intake progress bars (READ-ONLY snapshot)
 *
 * NOT visible unless filled:
 *  - Context (only appears if any context exists)
 *  - Summation (only appears if any summation exists)
 *
 * No helper text. No extra titles.
 *
 * Props:
 *  - data: full app day state object (today)
 *  - onPatch: (partial) => void   // updates today state
 *  - onGo: (routeId) => void      // open a section via sidebar navigation (intake/moments/roidboy/ps/summation/etc)
 */
export default function DailyHub({ data, onPatch, onGo }) {
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

  const hasContext =
    (moments && moments.length > 0) ||
    !!(roidboy && (roidboy.mode || roidboy.gymLocation || roidboy.workoutType || (roidboy.exerciseLog || []).length)) ||
    (ps && ps.length > 0);

  // Summation appears ONLY if it has anything
  const summation = d.summation || {};
  const hasSummation =
    !!(summation && (summation.text || summation.close || summation.sealNote));

  // Ornate divider sources (LOCKED PATHS)
  // Put your ornate PNGs here. If you only have one ornate file, reuse it for all.
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
          {/* no text */}
          <div className="floatTools">
            <button
              type="button"
              className="glyphBtn"
              aria-label="Open Daily Hub (current)"
              onClick={() => onGo?.("today")}
            >
              <img className="glyphImg" src="/ui/glyphs/sigil-eye.svg" alt="" />
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

      {/* ========== INTAKE PROGRESS (PERMANENT - PROGRESS ONLY) ========== */}
      <SectionMarker src={ORNATE_INTAKE} size={52} />
      <div className="zone">
        <div className="zoneHead">
          <div className="floatTools">
            <button
              type="button"
              className="glyphBtn"
              aria-label="Open Intake"
              onClick={() => onGo?.("intake")}
            >
              <img className="glyphImg" src="/ui/glyphs/intake.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="view" style={{ paddingTop: 10 }}>
          <BarRow label="CALORIES" value={totals.calories} goal={goals.calories} percent={pct(totals.calories, goals.calories)} />
          <BarRow label="PROTEIN (G)" value={totals.proteinG} goal={goals.proteinG} percent={pct(totals.proteinG, goals.proteinG)} />
          <BarRow label="CARBS (G)" value={totals.carbsG} goal={goals.carbsG} percent={pct(totals.carbsG, goals.carbsG)} />
          <BarRow label="FAT (G)" value={totals.fatG} goal={goals.fatG} percent={pct(totals.fatG, goals.fatG)} />
          <BarRow label="WATER (OZ)" value={totals.waterOz} goal={goals.waterOz} percent={pct(totals.waterOz, goals.waterOz)} />
        </div>
      </div>

      {/* ========== THE CONTEXT (HIDDEN UNTIL FILLED) ========== */}
      {hasContext ? (
        <>
          <SectionMarker src={ORNATE_CONTEXT} size={52} />
          <div className="zone">
            <div className="zoneHead">
              <div className="floatTools">
                <button
                  type="button"
                  className="glyphBtn"
                  aria-label="Open Moments"
                  onClick={() => onGo?.("moments")}
                >
                  <img className="glyphImg" src="/ui/glyphs/moments.svg" alt="" />
                </button>
                <button
                  type="button"
                  className="glyphBtn"
                  aria-label="Open Roid Boy"
                  onClick={() => onGo?.("roidboy")}
                >
                  <img className="glyphImg" src="/ui/glyphs/roidboy.svg" alt="" />
                </button>
                <button
                  type="button"
                  className="glyphBtn"
                  aria-label="Open P.S."
                  onClick={() => onGo?.("ps")}
                >
                  <img className="glyphImg" src="/ui/glyphs/ps.svg" alt="" />
                </button>
              </div>
            </div>

            {/* Context on hub is DISPLAY ONLY. No helper text. */}
            <div className="view">
              {/* Moments presence */}
              {moments.length ? (
                <MiniCount glyph="/ui/glyphs/moments.svg" count={moments.length} />
              ) : null}

              {/* Roid Boy presence */}
              {roidboy ? <MiniDot glyph="/ui/glyphs/roidboy.svg" /> : null}

              {/* P.S. presence */}
              {ps.length ? (
                <MiniCount glyph="/ui/glyphs/ps.svg" count={ps.length} />
              ) : null}
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
                <button
                  type="button"
                  className="glyphBtn"
                  aria-label="Open Summation"
                  onClick={() => onGo?.("summation")}
                >
                  <img className="
