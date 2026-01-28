"use client";

import { useEffect, useMemo, useState } from "react";
import { getEraForMonth, getMonthKey, listDays } from "@/lib/mmocStore";

export default function LibraryView({ onOpenDate, onGo }) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(listDays());
  }, []);

  const groups = useMemo(() => {
    const m = new Map();
    for (const iso of days) {
      const mk = getMonthKey(iso);
      if (!m.has(mk)) m.set(mk, []);
      m.get(mk).push(iso);
    }
    const keys = Array.from(m.keys()).sort((a, b) => (b || "").localeCompare(a || ""));
    return keys.map((k) => ({ month: k, era: getEraForMonth(k), days: m.get(k) }));
  }, [days]);

  return (
    <div className="container">
      <section className="card">
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">LIBRARY</div>
            <button className="btn ghost" type="button" onClick={() => onGo?.("today")}>
              BACK
            </button>
          </div>

          {groups.length === 0 ? (
            <div className="list">NO SAVED DAYS YET.</div>
          ) : (
            <div className="list">
              {groups.map((g) => (
                <div key={g.month} className="zone">
                  <div className="zoneHead">
                    <div className="zoneTitle">{g.month}</div>
                    <div className="chip">{(g.era || "ERA NOT SET").toUpperCase()}</div>
                  </div>

                  <div className="grid2">
                    {g.days.map((iso) => (
                      <button
                        key={iso}
                        className="btn"
                        type="button"
                        onClick={() => {
                          onOpenDate?.(iso);
                          onGo?.("today");
                        }}
                      >
                        {iso}
                      </button>
                    ))}
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
