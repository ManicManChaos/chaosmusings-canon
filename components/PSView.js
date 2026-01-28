"use client";

export default function PSView({ day, onPatch }) {
  const items = Array.isArray(day?.ps) ? day.ps : [];
  const set = (next) => onPatch({ ps: next });

  const add = () => set([...items, { date: "", time: "", desc: "" }]);
  const del = (ix) => set(items.filter((_, i) => i !== ix));
  const patch = (ix, p) => set(items.map((it, i) => (i === ix ? { ...it, ...p } : it)));

  return (
    <div className="container">
      <section className="card">
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">P.S.</div>
            <button className="btn ghost" type="button" onClick={add}>
              ADD
            </button>
          </div>

          {items.length === 0 ? (
            <div className="list">NO REMINDERS YET.</div>
          ) : (
            <div className="list">
              {items.map((it, ix) => (
                <div key={ix} className="momentCard">
                  <div className="grid2">
                    <div className="field">
                      <label>DATE</label>
                      <input value={it.date || ""} onChange={(e) => patch(ix, { date: e.target.value })} placeholder="YYYY-MM-DD" />
                    </div>
                    <div className="field">
                      <label>TIME</label>
                      <input value={it.time || ""} onChange={(e) => patch(ix, { time: e.target.value })} placeholder="e.g., 2:30 PM" />
                    </div>
                    <div className="field" style={{ gridColumn: "1 / -1" }}>
                      <label>DESCRIPTION</label>
                      <textarea rows={3} value={it.desc || ""} onChange={(e) => patch(ix, { desc: e.target.value })} />
                    </div>
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <button className="btn danger" type="button" onClick={() => del(ix)}>
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
