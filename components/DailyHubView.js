"use client";

import SectionMarker from "@/components/SectionMarker";
import AssessmentView from "@/components/AssessmentView";

/**
 * DailyHubView (LOCKED)
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
 *  - onPatch: (partial) => void
 *  - onGo: (routeId) => void
 */
export default function DailyHubView({ data, onPatch, onGo }) {
  const d = data || {};
  const assessment = d.assessment || {};

  // Intake snapshot (progress only)
  const intake = d.intake || {};
  const goals = intake.goals || {};
  const totals = intake.totals || {};

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
        roidboy.arrivalTime ||
        roidboy.libidoStatus)
    );

  const hasContext = moments.length > 0 || hasRoidboy || ps.length > 0;

  // Summation appears ONLY if it has anything
  const summation = d.summation || {};
  const hasSummation = !!(summation && (summation.text || summation.close || summation.sealNote));

  /**
   * ORNATE MARKERS (REAL REPO PATHS)
   * You showed these files exist in: /public/ui/png/
   * If you later create /public/ui/ornate/, only change these constants.
   */
  const ORNATE_ASSESS = "/ui/png/sigil-eye.png";
  const ORNATE_DIVIDER = "/ui/png/strip-triad-sigils.png";

  return (
    <div className="dailyHub">
      {/* ========== ASSESSMENT (PERMANENT) ========== */}
      <SectionMarker src={ORNATE_ASSESS} size={56} />

      <div className="zone">
        <div className="zoneHead">
          <div className="floatTools">
            {/* Return-to-hub glyph button (EYE) */}
            <button
              type="button"
              className="glyphBtn"
              aria-label="Go to Daily Hub"
              onClick={() => onGo?.("today")}
            >
              <img className="glyphImg" src="/ui/glyphs/eye.svg" alt="" />
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
      <SectionMarker src={ORNATE_DIVIDER} size={52} />

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
          <BarRow
            label="CALORIES"
            value={totals.calories}
            goal={goals.calories}
            percent={pct(totals.calories, goals.calories)}
          />
          <BarRow
            label="PROTEIN (G)"
            value={totals.proteinG}
            goal={goals.proteinG}
            percent={pct(totals.proteinG, goals.proteinG)}
          />
          <BarRow
            label="CARBS (G)"
            value={totals.carbsG}
            goal={goals.carbsG}
            percent={pct(totals.carbsG, goals.carbsG)}
          />
          <BarRow
            label="FAT (G)"
            value={totals.fatG}
            goal={goals.fatG}
            percent={pct(totals.fatG, goals.fatG)}
          />
          <BarRow
            label="WATER (OZ)"
            value={totals.waterOz}
            goal={goals.waterOz}
            percent={pct(totals.waterOz, goals.waterOz)}
          />
        </div>
      </div>

      {/* ========== THE CONTEXT (HIDDEN UNTIL FILLED) ========== */}
      {hasContext ? (
        <>
          <SectionMarker src={ORNATE_DIVIDER} size={52} />

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

            <div className="view">
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                {moments.length ? <MiniCount glyph="/ui/glyphs/moments.svg" count={moments.length} /> : null}
                {hasRoidboy ? <MiniDot glyph="/ui/glyphs/roidboy.svg" /> : null}
                {ps.length ? <MiniCount glyph="/ui/glyphs/ps.svg" count={ps.length} /> : null}
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* ========== SUMMATION (HIDDEN UNTIL FILLED) ========== */}
      {hasSummation ? (
        <>
          <SectionMarker src={ORNATE_DIVIDER} size={52} />

          <div className="zone">
            <div className="zoneHead">
              <div className="floatTools">
                <button
                  type="button"
                  className="glyphBtn"
                  aria-label="Open Summation"
                  onClick={() => onGo?.("summation")}
                >
                  <img className="glyphImg" src="/ui/glyphs/summation.svg" alt="" />
                </button>
              </div>
            </div>

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
   ========================= */

function BarRow({ label, value, goal, percent }) {
  const v = Number(value || 0);
  const g = Number(goal || 0);
  const p = Number(percent || 0);

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <label style={{ margin: 0 }}>{label}</label>
        <div style={{ fontFamily: "var(--serif)", letterSpacing: ".14em", fontSize: 11, opacity: 0.75 }}>
          {g > 0 ? `${v}/${g}` : `${v}`}
        </div>
      </div>

      <div className="bar" style={{ margin: "10px 0 0 0" }}>
        <div style={{ height: "100%", width: `${p}%`, background: "rgba(176,141,43,.45)" }} />
      </div>
    </div>
  );
}

function MiniCount({ glyph, count }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <img className="glyphImg" src={glyph} alt="" style={{ width: 22, height: 22, opacity: 0.9 }} />
      <div style={{ fontFamily: "var(--serif)", letterSpacing: ".18em", fontSize: 12, opacity: 0.8 }}>
        {String(count)}
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
