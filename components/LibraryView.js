"use client";

import { useEffect, useMemo, useState } from "react";
import { listDays, monthKey, readDay } from "@/lib/mmocStore";

export default function LibraryView({ onOpenDay }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x)=>x+1), 1000);
    return ()=>clearInterval(t);
  }, []);

  const grouped = useMemo(() => {
    const days = listDays();
    const out = {};
    for (const d of days) {
      const k = monthKey(d);
      out[k] = out[k] || [];
      out[k].push(d);
    }
    return out;
  }, [tick]);

  const keys = useMemo(() => Object.keys(grouped).sort((a,b)=>a.localeCompare(b)).reverse(), [grouped]);

  const titleFor = (dateISO) => {
    const day = readDay(dateISO);
    const era = day?.assessment?.era || "";
    const t = day?.assessment?.title || "";
    // month era is the label in library; title optional
    return (t || era || "UNTITLED").toUpperCase();
  };

  return (
    <section className="card">
      <div className="view">
        <div className="pageHeader">
          <div className="pageTitle">
            <img className="peacockIcon" src="/ui/glyphs/library.svg" alt="" />
            <span>LIBRARY</span>
          </div>
        </div>

        <div className="libraryList">
          {keys.map((k)=>(
            <div key={k} className="monthBlock">
              <div className="monthTitle">{k}</div>
              {grouped[k].map((d)=>(
                <button
                  key={d}
                  type="button"
                  className="libraryItem"
                  onClick={()=>onOpenDay?.(d)}
                >
                  <div className="libraryMain">
                    <strong>{d} — {titleFor(d)}</strong>
                    <small>{(readDay(d)?.assessment?.mood || "").toUpperCase()}</small>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
