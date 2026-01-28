"use client";

const TYPES = ["WOW", "WTF", "PLOT TWIST"];

export default function MomentsView({ day, onPatch }) {
  const moments = Array.isArray(day?.moments) ? day.moments : [];

  const set = (next) => onPatch({ moments: next });

  const add = () => {
    set([...moments, { type: "WOW", desc: "", photo: "" }]);
  };

  const del = (ix) => set(moments.filter((_, i) => i !== ix));

  const patch = (ix, p) => set(moments.map((m, i) => (i === ix ? { ...m, ...p } : m)));

  return (
    <div className="container">
      <section className="card">
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">MOMENTS</div>
            <button className="btn ghost" type="button" onClick={add}>
              ADD
            </button>
          </div>

          {moments.length === 0 ? (
            <div className="list">NO MOMENTS YET.</div>
          ) : (
            <div className="list">
              {moments.map((m, ix) => (
                <div key={ix} className="momentCard">
                  <div className="grid2">
                    <div className="field">
                      <label>TYPE</label>
                      <select value={m.type || "WOW"} onChange={(e) => patch(ix, { type: e.target.value })}>
                        {TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field">
                      <label>PHOTO (URL OPTIONAL)</label>
                      <input
                        value={m.photo || ""}
                        onChange={(e) => patch(ix, { photo: e.target.value })}
                        placeholder="paste image url (optional)"
                      />
                    </div>

                    <div className="field" style={{ gridColumn: "1 / -1" }}>
                      <label>DESCRIBE THE MOMENT</label>
                      <textarea rows={4} value={m.desc || ""} onChange={(e) => patch(ix, { desc: e.target.value })} />
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
