"use client";

import { useEffect, useMemo, useState } from "react";
import { getEraForMonth, getMonthKey, listDays } from "@/lib/mmocStore";

const GLYPH_DIR = [
  { id: "today", label: "TODAY", meaning: "Daily Hub / Tell No Lies", src: "/ui/ornate-priest/glyph-today.png" },
  { id: "intake", label: "INTAKE", meaning: "Body + inputs", src: "/ui/ornate-priest/glyph-intake.png" },
  { id: "roidboy", label: "ROIDBOY", meaning: "Cycle / protocol tracking", src: "/ui/ornate-priest/glyph-roidboy.png" },
  { id: "moments", label: "MOMENTS", meaning: "Captures + highlights", src: "/ui/ornate-priest/glyph-moments.png" },
  { id: "ps", label: "PS", meaning: "Post-script / notes", src: "/ui/ornate-priest/glyph-context.png" },
  { id: "summation", label: "SUMMATION", meaning: "Wrap / totals", src: "/ui/ornate-priest/glyph-summation.png" },
  { id: "yearreview", label: "YEAR REVIEW", meaning: "Long-view synthesis", src: "/ui/ornate-priest/glyph-yearreview.png" },
  { id: "directory", label: "DIRECTORY", meaning: "Sections / navigation map", src: "/ui/ornate-priest/glyph-directory.png" },
  { id: "settings", label: "SETTINGS", meaning: "App systems + preferences", src: "/ui/ornate-priest/glyph-settings.png" },
  { id: "seal", label: "SEAL", meaning: "Ritual stamp / confirm", src: "/ui/ornate-priest/glyph-seal.png" },
  { id: "context", label: "CONTEXT", meaning: "Reference / background layer", src: "/ui/ornate-priest/glyph-context.png" },
  { id: "assessment", label: "ASSESSMENT", meaning: "Score / check-in", src: "/ui/ornate-priest/glyph-assessment.png" },
];

const SYSTEMS_MAP = [
  { k: "LOCAL STORE", v: "mmocStore (device cache + day index)" },
  { k: "CLOUD", v: "Supabase (auth + persistence)" },
  { k: "ROUTING", v: "Single app shell; view switch by id (no URL fan-out)" },
  { k: "GLYPHS", v: "Ornate gold PNGs only: /public/ui/ornate-priest/*.png" },
];

const APP_MAP = [
  { k: "TODAY", v: "Daily Hub (Tell No Lies) → primary entry" },
  { k: "INTAKE", v: "Inputs captured for the day" },
  { k: "ROIDBOY", v: "Cycle/protocol tracking" },
  { k: "MOMENTS", v: "Moments log" },
  { k: "PS", v: "Notes and post-script" },
  { k: "SUMMATION", v: "Daily summary" },
  { k: "YEAR REVIEW", v: "Long-view review" },
  { k: "LIBRARY", v: "Saved days + App Info Book" },
  { k: "SETTINGS", v: "Preferences + system status" },
];

const SETTINGS_MAP = [
  { k: "GLYPH SYSTEM", v: "Ornate gold only. No repeats. Medium size." },
  { k: "COLOR", v: "Nude/pink text throughout + gold accents" },
  { k: "GLOW", v: "Enabled (Tell No Lies + global soft glow)" },
  { k: "SIDEBAR", v: "Right-edge hotspot enlarged for swipe" },
];

function KV({ rows }) {
  return (
    <div className="kv">
      {rows.map((r) => (
        <div key={r.k} className="kvRow">
          <div className="kvK">{r.k}</div>
          <div className="kvV">{r.v}</div>
        </div>
      ))}
    </div>
  );
}

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

      {/* APP INFO BOOK — Library */}
      <section className="card" style={{ marginTop: 14 }}>
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">APP INFO BOOK</div>
          </div>

          <div className="zone">
            <div className="zoneHead">
              <div className="zoneTitle">SYSTEMS MAP</div>
            </div>
            <div className="view">
              <KV rows={SYSTEMS_MAP} />
            </div>
          </div>

          <div className="zone">
            <div className="zoneHead">
              <div className="zoneTitle">APP MAP</div>
            </div>
            <div className="view">
              <KV rows={APP_MAP} />
            </div>
          </div>

          <div className="zone">
            <div className="zoneHead">
              <div className="zoneTitle">SETTINGS</div>
            </div>
            <div className="view">
              <KV rows={SETTINGS_MAP} />
            </div>
          </div>

          <div className="zone">
            <div className="zoneHead">
              <div className="zoneTitle">GLYPH DIRECTORY</div>
            </div>

            <div className="view">
              <div className="glyphGrid">
                {GLYPH_DIR.map((g) => (
                  <div key={g.id} className="glyphCard">
                    <img className="glyphImg" src={g.src} alt={g.label} />
                    <div className="glyphText">
                      <div className="glyphName">{g.label}</div>
                      <div className="glyphMeaning">{g.meaning}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
