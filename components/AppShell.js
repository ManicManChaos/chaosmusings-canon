"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import Weave from "./Weave";
import OpeningFlow from "./OpeningFlow";

import DailyHubView from "./DailyHubView";
import IntakeView from "./IntakeView";
import RoidBoyView from "./RoidBoyView";
import MomentsView from "./MomentsView";
import PSView from "./PSView";
import SummationView from "./SummationView";
import YearReviewView from "./YearReviewView";
import LibraryView from "./LibraryView";
import SealView from "./SealView";

import { getTodayISO, loadDay, ensureDay, saveDayPartial } from "@/lib/mmocStore";

const VIEW_ORDER = [
  "today",
  "intake",
  "roidboy",
  "moments",
  "ps",
  "summation",
  "yearreview",
  "seal",
  "library"
];

export default function AppShell() {
  const [openingDone, setOpeningDone] = useState(false);
  const [active, setActive] = useState("today");
  const [weaving, setWeaving] = useState(false);

  const [dayISO, setDayISO] = useState(getTodayISO());
  const [day, setDay] = useState(() => ensureDay(loadDay(getTodayISO()), getTodayISO()));

  useEffect(() => {
    const next = ensureDay(loadDay(dayISO), dayISO);
    setDay(next);
  }, [dayISO]);

  const nav = useMemo(
    () => (id) => {
      const next = VIEW_ORDER.includes(id) ? id : "today";
      setWeaving(true);
      window.setTimeout(() => {
        setActive(next);
        setWeaving(false);
        try {
          const desired = `#${next}`;
          if (window.location.hash !== desired) window.history.replaceState(null, "", desired);
        } catch {}
      }, 520);
    },
    []
  );

  useEffect(() => {
    const applyHash = () => {
      const raw = (window.location.hash || "").replace("#", "").trim();
      if (!raw) return;
      if (!VIEW_ORDER.includes(raw)) return;
      setActive(raw);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const patchDay = (partial) => {
    setDay((prev) => {
      const merged = { ...prev, ...partial };
      saveDayPartial(dayISO, partial);
      return merged;
    });
  };

  const headerDate = useMemo(() => {
    const d = new Date(dayISO + "T00:00:00");
    return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" }).toUpperCase();
  }, [dayISO]);

  if (!openingDone) {
    return <OpeningFlow onDone={() => setOpeningDone(true)} />;
  }

  return (
    <div className="appRoot">
      <Sidebar active={active} onSelect={nav} />

      <header className="topbar topbarGrid">
        <div className="topbarLeft" />

        <div className="topbarCenter">
          <div className="brandTitle glowTitle">TELL NO LIES</div>
        </div>

        <div className="topbarRight">
          <div className="chip">{headerDate}</div>

          <button type="button" className="glyphBtn" aria-label="Open Library" onClick={() => nav("library")}>
            <img className="glyphImg" src="/ui/glyphs/directory.svg" alt="" draggable={false} />
          </button>
        </div>
      </header>

      <main className="mainStage">
        {active === "today" ? <DailyHubView data={day} onPatch={patchDay} onGo={nav} /> : null}
        {active === "intake" ? <IntakeView dayISO={dayISO} day={day} onPatch={patchDay} /> : null}
        {active === "roidboy" ? <RoidBoyView dayISO={dayISO} day={day} onPatch={patchDay} /> : null}
        {active === "moments" ? <MomentsView dayISO={dayISO} day={day} onPatch={patchDay} /> : null}
        {active === "ps" ? <PSView dayISO={dayISO} day={day} onPatch={patchDay} /> : null}
        {active === "summation" ? <SummationView dayISO={dayISO} day={day} onPatch={patchDay} /> : null}
        {active === "yearreview" ? <YearReviewView dayISO={dayISO} day={day} onPatch={patchDay} /> : null}
        {active === "seal" ? <SealView dayISO={dayISO} day={day} onPatch={patchDay} /> : null}

        {active === "library" ? (
          <LibraryView
            onOpenDate={(iso) => {
              setDayISO(iso);
              nav("today");
            }}
            onGo={nav}
          />
        ) : null}
      </main>

      {weaving ? <Weave /> : null}
    </div>
  );
}
