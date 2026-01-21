"use client";

import { useEffect, useState } from "react";
import { isoToday, readDay, updateDay } from "@/lib/mmocStore";

const TYPES = ["WOW","WTF","PLOT TWIST"];

export default function MomentsView({ dateISO }) {
  const date = dateISO || isoToday();
  const empty = { items: [] }; // {type, desc, photoUrl}

  const [state, setState] = useState(() => readDay(date)?.moments || empty);

  useEffect(() => {
    setState(readDay(date)?.moments || empty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const commit = (patch) => {
    setState((s) => {
      const next = { ...s, ...patch };
      updateDay(date, { moments: next });
      return next;
    });
  };

  const add = () => commit({ items: [...(state.items || []), { type: "", desc: "", photoUrl: "" }] });

  const upd = (ix, patch) => {
    const arr = [...(state.items || [])];
    arr[ix] = { ...arr[ix], ...patch };
    commit({ items: arr });
  };

  const del = (ix) => {
    const arr = [...(state.items || [])];
    arr.splice(ix, 1);
    commit({ items: arr });
  };

  return (
    <section className="card">
      <div className="view">
        <div className="pageHeader">
          <div className="pageTitle">
            <img className="peacockIcon" src="/ui/glyphs/moments.svg" alt="" />
            <span>MOMENTS</span>
          </div>
          <div className="floatTools">
            <button type="button" className="glyphBtn" onClick={add} aria-label="Add moment">+</button>
          </div>
        </div>

        {(state.items || []).map((m, ix) => (
          <div className="momentCard" key={ix}>
            <div className="grid2">
              <div className="field">
                <label>TYPE</label>
                <select value={m.type || ""} onChange={(e)=>upd(ix, { type: e.target.value })}>
                  <option value="">SELECT…</option>
                  {TYPES.map((t)=>(<option key={t} value={t}>{t}</option>))}
                </select>
              </div>

              <div className="field span2">
                <label>DESCRIBE</label>
                <textarea className="writerBox" value={m.desc || ""} onChange={(e)=>upd(ix, { desc: e.target.value })} />
              </div>

              <div className="field span2">
                <label>PHOTO (URL FOR NOW)</label>
                <input value={m.photoUrl || ""} onChange={(e)=>upd(ix, { photoUrl: e.target.value })} />
              </div>
            </div>

            <div className="actions">
              <button type="button" className="btn" onClick={()=>del(ix)}>DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
