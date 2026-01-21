"use client";

import { useEffect, useState } from "react";
import { isoToday, readDay, updateDay } from "@/lib/mmocStore";

export default function SummationView({ dateISO }) {
  const date = dateISO || isoToday();
  const empty = { text: "" };

  const [state, setState] = useState(() => readDay(date)?.summation || empty);

  useEffect(() => {
    setState(readDay(date)?.summation || empty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const commit = (patch) => {
    setState((s) => {
      const next = { ...s, ...patch };
      updateDay(date, { summation: next });
      return next;
    });
  };

  return (
    <section className="card">
      <div className="view">
        <div className="pageHeader">
          <div className="pageTitle">
            <img className="peacockIcon" src="/ui/glyphs/summation.svg" alt="" />
            <span>SUMMATION</span>
          </div>
        </div>

        <div className="zone">
          <div className="grid2">
            <div className="field span2">
              <label>SUMMATION</label>
              <textarea className="writerBox" value={state.text || ""} onChange={(e)=>commit({ text: e.target.value })} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
