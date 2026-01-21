"use client";

import { useEffect, useState } from "react";
import { isoToday, readDay, updateDay } from "@/lib/mmocStore";

export default function PSView({ dateISO }) {
  const date = dateISO || isoToday();
  const empty = { reminders: [] }; // {whenDate, whenTime, description}

  const [state, setState] = useState(() => readDay(date)?.ps || empty);

  useEffect(() => {
    setState(readDay(date)?.ps || empty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const commit = (patch) => {
    setState((s) => {
      const next = { ...s, ...patch };
      updateDay(date, { ps: next });
      return next;
    });
  };

  const add = () => commit({ reminders: [...(state.reminders || []), { whenDate: "", whenTime: "", description: "" }] });

  const upd = (ix, patch) => {
    const arr = [...(state.reminders || [])];
    arr[ix] = { ...arr[ix], ...patch };
    commit({ reminders: arr });
  };

  const del = (ix) => {
    const arr = [...(state.reminders || [])];
    arr.splice(ix, 1);
    commit({ reminders: arr });
  };

  return (
    <section className="card">
      <div className="view">
        <div className="pageHeader">
          <div className="pageTitle">
            <img className="peacockIcon" src="/ui/glyphs/ps.svg" alt="" />
            <span>P.S.</span>
          </div>
          <div className="floatTools">
            <button type="button" className="glyphBtn" onClick={add} aria-label="Add reminder">+</button>
          </div>
        </div>

        {(state.reminders || []).map((r, ix) => (
          <div className="momentCard" key={ix}>
            <div className="grid2">
              <div className="field">
                <label>DATE</label>
                <input value={r.whenDate || ""} onChange={(e)=>upd(ix, { whenDate: e.target.value })} placeholder="YYYY-MM-DD" />
              </div>
              <div className="field">
                <label>TIME</label>
                <input value={r.whenTime || ""} onChange={(e)=>upd(ix, { whenTime: e.target.value })} placeholder="HH:MM" />
              </div>
              <div className="field span2">
                <label>DESCRIPTION</label>
                <textarea className="writerBox" value={r.description || ""} onChange={(e)=>upd(ix, { description: e.target.value })} />
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
