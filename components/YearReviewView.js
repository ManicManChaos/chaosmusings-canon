"use client";

import { useEffect, useMemo, useState } from "react";
import { listDays, loadDay } from "@/lib/mmocStore";

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function YearReviewView() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(listDays());
  }, []);

  const stats = useMemo(() => {
    if (days.length === 0) return null;

    let mealsCount = 0;
    let momentsCount = 0;
    let psCount = 0;
    let gymDays = 0;
    let calories = 0;
    let protein = 0;

    for (const iso of days) {
      const d = loadDay(iso);
      mealsCount += Array.isArray(d.intake?.meals) ? d.intake.meals.length : 0;
      momentsCount += Array.isArray(d.moments) ? d.moments.length : 0;
      psCount += Array.isArray(d.ps) ? d.ps.length : 0;

      const ex = Array.isArray(d.roidboy?.exercises) ? d.roidboy.exercises : [];
      if (ex.length > 0 || (d.roidboy?.cardioType || "")) gymDays += 1;

      const meals = Array.isArray(d.intake?.meals) ? d.intake.meals : [];
      for (const m of meals) {
        calories += num(m.calories);
        protein += num(m.protein);
      }
    }

    return {
      days: days.length,
      mealsCount,
      momentsCount,
      psCount,
      gymDays,
      avgCalories: Math.round(calories / days.length),
      avgProtein: Math.round(protein / days.length)
    };
  }, [days]);

  return (
    <div className="container">
      <section className="card">
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">YEAR REVIEW</div>
          </div>

          {!stats ? (
            <div className="list">NO DATA YET.</div>
          ) : (
            <div className="grid2">
              <div className="statCard">
                <div className="statNum">{stats.days}</div>
                <div className="statLabel">DAYS LOGGED</div>
              </div>
              <div className="statCard">
                <div className="statNum">{stats.gymDays}</div>
                <div className="statLabel">TRAINING DAYS</div>
              </div>
              <div className="statCard">
                <div className="statNum">{stats.mealsCount}</div>
                <div className="statLabel">MEALS</div>
              </div>
              <div className="statCard">
                <div className="statNum">{stats.momentsCount}</div>
                <div className="statLabel">MOMENTS</div>
              </div>
              <div className="statCard">
                <div className="statNum">{stats.psCount}</div>
                <div className="statLabel">P.S. ITEMS</div>
              </div>
              <div className="statCard">
                <div className="statNum">{stats.avgCalories}</div>
                <div className="statLabel">AVG CAL / DAY</div>
              </div>
              <div className="statCard">
                <div className="statNum">{stats.avgProtein}</div>
                <div className="statLabel">AVG PROTEIN / DAY</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
