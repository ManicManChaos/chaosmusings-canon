// components/AssessmentView.js
"use client";

export default function AssessmentView() {
  // DO NOT import any lib/assets. Everything visual comes from CSS + public/.
  // This file is intentionally UI-only right now (no helper text, no invented copy).
  return (
    <section className="card">
      <div className="cardHead">THE ASSESSMENT</div>

      <div className="assessGrid">
        <div className="assessRow full">
          <div className="assessLabel">TITLE</div>
          <input className="inp" placeholder="" />
        </div>

        <div className="assessRow">
          <div className="assessLabel">LOCATION</div>
          <input className="inp" placeholder="" />
        </div>

        <div className="assessRow">
          <div className="assessLabel">INTENT / FOCUS</div>
          <input className="inp" placeholder="" />
        </div>

        <div className="assessRow">
          <div className="assessLabel">MOOD</div>
          <select className="inp">
            <option value="">SELECT…</option>
          </select>
        </div>

        <div className="assessRow">
          <div className="assessLabel">WORD OF THE DAY</div>
          <input className="inp" placeholder="" />
        </div>

        <div className="assessRow">
          <div className="assessLabel">ERA</div>
          <select className="inp">
            <option value="">(OPTIONAL)</option>
          </select>
        </div>

        <div className="assessRow">
          <div className="assessLabel">SINGLENESS LEVEL</div>
          <select className="inp">
            <option value="">SELECT…</option>
          </select>
        </div>

        <div className="assessRow full">
          <div className="assessLabel">HEAD HUMMER</div>
          <input className="inp" placeholder="" />
        </div>
      </div>
    </section>
  );
}
