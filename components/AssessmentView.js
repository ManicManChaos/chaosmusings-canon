// components/AssessmentView.js
"use client";

import { useMemo, useState } from "react";

function formatDayParts(d) {
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toUpperCase();
  return { weekday, date, time };
}

export default function AssessmentView() {
  const now = useMemo(() => new Date(), []);
  const parts = useMemo(() => formatDayParts(now), [now]);

  // Minimal state (no helper copy)
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [mood, setMood] = useState("");
  const [era, setEra] = useState("");
  const [headHummer, setHeadHummer] = useState(""); // Song of the day input
  const [word, setWord] = useState("");
  const [singleness, setSingleness] = useState("");

  // Keep options light here; you can paste your canon lists later without layout changes.
  const MOOD = useMemo(() => ["LOCKED IN", "CALM", "HEATED", "SOFT", "SAVAGE"], []);
  const ERA = useMemo(() => ["(OPTIONAL)"], []);
  const SINGLE = useMemo(() => ["AWARE", "UNBOTHERED", "TEMPTED", "ON ONE"], []);

  return (
    <section className="card">
      {/* Top header row */}
      <div className="hubHeader">
        <div className="hubLeft">
          <img className="hubEye" src="/ui/glyphs/sigil-eye.svg" alt="" />
        </div>

        <div className="hubCenter">TELL NO LIES</div>

        <div className="hubRight">
          <div className="chip">{parts.weekday}</div>
          <div className="chip">{parts.date}</div>
          <div className="chip">{parts.time}</div>
        </div>
      </div>

      <div className="view">
        <div className="zone">
          <div className="zoneHead">
            <div className="zoneTitle">THE ASSESSMENT</div>

            {/* Four small rune buttons (visual only for now) */}
            <div className="floatTools" aria-hidden="true">
              <button className="glyphBtn" type="button" tabIndex={-1} />
              <button className="glyphBtn" type="button" tabIndex={-1} />
              <button className="glyphBtn" type="button" tabIndex={-1} />
              <button className="glyphBtn" type="button" tabIndex={-1} />
            </div>
          </div>

          <div className="titleRow">
            <input
              className="titleInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="TITLE"
              aria-label="Title"
            />
          </div>

          <div className="grid2">
            <div className="field">
              <label>LOCATION</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="—" />
            </div>

            <div className="field">
              <label>HEAD HUMMER</label>
              <input
                value={headHummer}
                onChange={(e) => setHeadHummer(e.target.value)}
                placeholder="—"
              />
            </div>

            <div className="field">
              <label>MOOD</label>
              <select value={mood} onChange={(e) => setMood(e.target.value)}>
                <option value="">SELECT…</option>
                {MOOD.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>WORD OF THE DAY</label>
              <input value={word} onChange={(e) => setWord(e.target.value)} placeholder="—" />
            </div>

            <div className="field">
              <label>ERA</label>
              <select value={era} onChange={(e) => setEra(e.target.value)}>
                <option value="">(OPTIONAL)</option>
                {ERA.filter((x) => x !== "(OPTIONAL)").map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>SINGLENESS LEVEL</label>
              <select value={singleness} onChange={(e) => setSingleness(e.target.value)}>
                <option value="">SELECT…</option>
                {SINGLE.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
