"use client";

export default function SummationView({ day, onPatch }) {
  const s = day?.summation || {};
  const set = (v) => onPatch({ summation: { ...s, text: v } });

  return (
    <div className="container">
      <section className="card">
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">SUMMATION</div>
          </div>

          <div className="field">
            <label>THE WRAP</label>
            <textarea rows={10} value={s.text || ""} onChange={(e) => set(e.target.value)} />
          </div>
        </div>
      </section>
    </div>
  );
}
