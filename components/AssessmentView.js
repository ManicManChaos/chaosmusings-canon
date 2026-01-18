"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "mmoc_entries_v4";

const nowISODate = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const formatChipDate = (d) =>
  d
    .toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();

const formatChipDay = (d) => d.toLocaleDateString(undefined, { weekday: "long" }).toUpperCase();

const readEntries = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

const writeEntries = (arr) => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

const upsertEntry = (entry) => {
  const entries = readEntries();
  const ix = entries.findIndex((e) => e && e.date === entry.date);
  if (ix >= 0) entries[ix] = entry;
  else entries.unshift(entry);
  entries.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  writeEntries(entries);
};

export default function AssessmentView() {
  const [day, setDay] = useState("");
  const [dateLabel, setDateLabel] = useState("");

  const moods = useMemo(
    () => [
      "Select…",
      "Horny for Peace",
      "Feral & Focused",
      "Violently Calm",
      "Sexually Frustrated but Contained",
      "Plotting With a Semi",
      "Muscle Memory and Trauma",
      "Built Like a Threat",
      "Calm Like a Loaded Weapon",
      "Hard Body, Closed Heart",
      "Wanting Touch, Refusing Attachment",
      "Desire Without Permission",
      "Attracted but Unavailable",
      "Crushing Quietly",
      "Sexually Awake, Emotionally Armed",
      "Detached for My Own Safety",
      "Heart Locked, Body Open",
      "Missing Someone I Shouldn’t",
      "Grief With Good Posture",
      "Sad, Not Weak",
      "Petty but Correct",
      "Annoyed by Everyone",
      "Do Not Test Me",
      "Observing Before Engaging",
      "Silence Is Strategic",
      "Hyperfocused and Unreachable",
      "Overstimulated but Managing",
      "Brain on Fire",
      "Mask On, Emotions Offline",
      "Unmasked and Exposed",
      "Indifferent and Relieved",
      "Regulated Enough",
      "Resting in My Body",
      "Safe for Now",
      "Still Standing",
    ],
    []
  );

  const eras = useMemo(
    () => [
      "(optional)",
      "Villain Era",
      "Whore4More",
      "Horny for Peace",
      "Muscle Memory and Trauma",
      "Plotting Season",
      "Built, Not Broken",
      "Hard Body, Harder Boundaries",
      "Flesh and Willpower",
      "Dangerous Crush Season",
      "Attachment Without Illusions",
      "Wanting Without Chasing",
      "Letting Someone Matter (Carefully)",
      "Post-Heartbreak Control Phase",
      "Emotional Scar Tissue",
      "Grief Without Collapse",
      "Detachment Training",
      "Gym God Ascension",
      "Strength Without Apology",
      "Discipline Over Desire",
      "Power Stabilization",
      "Hyperfocus Arc",
      "Manic Clarity Window",
      "Burnout Containment",
      "Re-Regulation Protocol",
      "Silence as Strategy",
      "No Negotiation Period",
      "Energy Preservation Mode",
      "Nothing to Prove",
      "Knowing Exactly Who I Am",
    ],
    []
  );

  const singles = useMemo(
    () => [
      "Select…",
      "Single and Self-Controlled",
      "Single, Not Looking",
      "Single but Curious",
      "Crushing Quietly",
      "Mutual Tension, No Labels",
      "Attracted but Guarded",
      "Emotionally Involved",
      "Physically Attached, Emotionally Cautious",
      "Letting Someone In (Slowly)",
      "Complicated on Purpose",
      "Unavailable by Design",
      "Attached Against My Will",
      "Heart Closed for Maintenance",
      "Recovering From Someone",
      "Detaching With Intent",
      "Indifferent and Relieved",
      "Choosing Myself",
    ],
    []
  );

  const [form, setForm] = useState({
    title: "",
    location: "",
    intent: "",
    mood: "",
    word: "",
    era: "",
    single: "",
  });

  // init chips + load today
  useEffect(() => {
    const d = new Date();
    setDay(formatChipDay(d));
    setDateLabel(formatChipDate(d));

    const date = nowISODate();
    const e = readEntries().find((x) => x && x.date === date);
    if (e?.data) setForm((prev) => ({ ...prev, ...e.data }));
  }, []);

  // autosave
  useEffect(() => {
    const t = setTimeout(() => {
      const date = nowISODate();
      upsertEntry({
        date,
        updatedAt: Date.now(),
        data: { ...form },
      });
    }, 320);
    return () => clearTimeout(t);
  }, [form]);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <>
      {/* TOP BAR (canon): Eye + TELL NO LIES left, Date right */}
      <div className="topbar">
        <div className="brandPlate">
          <div className="brandRow">
            <img className="eyeMark" src="/glyphs/ornate/sigil-eye.png" alt="" aria-hidden="true" />
            <div className="brandTitle">TELL NO LIES</div>
          </div>
        </div>

        <div className="dateChips">
          <div className="chip">{day}</div>
          <div className="chip">{dateLabel}</div>
        </div>
      </div>

      <div className="container">
        <section className="card view">
          <div className="pageHeader">
            <div className="pageTitle">THE ASSESSMENT</div>
          </div>

          <div className="titleRow">
            <input
              className="titleInput"
              value={form.title}
              onChange={set("title")}
              placeholder="TITLE OF THE DAY"
            />
          </div>

          <div className="grid2">
            <div className="field">
              <label>LOCATION</label>
              <input value={form.location} onChange={set("location")} placeholder="Where are you?" />
            </div>

            <div className="field">
              <label>INTENT</label>
              <input value={form.intent} onChange={set("intent")} placeholder="What are you here to do?" />
            </div>

            <div className="field">
              <label>MOOD</label>
              <select value={form.mood} onChange={set("mood")}>
                {moods.map((m, i) => (
                  <option key={i} value={i === 0 ? "" : m}>
                    {m.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>WORD</label>
              <input value={form.word} onChange={set("word")} placeholder="One word to anchor today" />
            </div>

            <div className="field">
              <label>ERA</label>
              <select value={form.era} onChange={set("era")}>
                {eras.map((x, i) => (
                  <option key={i} value={i === 0 ? "" : x}>
                    {x.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>SINGLENESS LEVEL</label>
              <select value={form.single} onChange={set("single")}>
                {singles.map((s, i) => (
                  <option key={i} value={i === 0 ? "" : s}>
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
