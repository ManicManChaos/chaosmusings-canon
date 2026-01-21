"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { isoToday, readDay } from "@/lib/mmocStore";

import OpeningFlow from "@/components/OpeningFlow";
import Sidebar from "@/components/Sidebar";
import Weave from "@/components/Weave";

import AssessmentView from "@/components/AssessmentView";
import IntakeView from "@/components/IntakeView";
import RoidBoyView from "@/components/RoidBoyView";
import MomentsView from "@/components/MomentsView";
import PSView from "@/components/PSView";
import SummationView from "@/components/SummationView";
import LibraryView from "@/components/LibraryView";
import YearReviewView from "@/components/YearReviewView";
import SealView from "@/components/SealView";

/**
 * CANON APP SHELL (LOCKED):
 * - OpeningFlow gates the app until auth is present.
 * - Sidebar is swipe-from-right-edge only.
 * - Weave runs between sections.
 * - Today (Daily Hub) block order:
 *   1) Assessment
 *   2) Intake
 *   3) The Context (Moments + Roid Boy + P.S.)
 *   4) Summation
 */
export default function AppShell() {
  const [unlocked, setUnlocked] = useState(false);
  const [active, setActive] = useState("today");
  const [weaveOn, setWeaveOn] = useState(false);
  const [openDay, setOpenDay] = useState(isoToday());

  const changing = useRef(false);

  useEffect(() => {
    // If already authed, skip opening quickly
    const boot = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) setUnlocked(true);
    };
    boot();
  }, []);

  const runWeaveThen = (nextId) => {
    if (changing.current) return;
    changing.current = true;
    setWeaveOn(true);
    window.setTimeout(() => {
      setActive(nextId);
      setWeaveOn(false);
      changing.current = false;
    }, 520);
  };

  const onSelect = (id) => runWeaveThen(id);

  const dateLabel = useMemo(() => {
    try {
      const d = new Date(openDay + "T00:00:00");
      return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }).toUpperCase();
    } catch {
      return openDay;
    }
  }, [openDay]);

  const ContextSummary = () => {
    const day = readDay(openDay);
    const moments = (day?.moments?.items || []).filter(Boolean);
    const ps = (day?.ps?.reminders || []).filter(Boolean);
    const roid = day?.roidboy || null;

    return (
      <section className="card">
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">
              <img className="peacockIcon" src="/ui/glyphs/moments.svg" alt="" />
              <span>THE CONTEXT</span>
            </div>
          </div>

          {roid ? (
            <div className="zone">
              <div className="zoneHead">
                <div className="zoneTitle">ROID BOY</div>
              </div>
              <div className="notePill">
                {(roid.mode || "").toUpperCase()} · {(roid.workoutType || "").toUpperCase()} · {(roid.gymLocation || "").toUpperCase()}
              </div>
            </div>
          ) : null}

          {moments.length ? (
            <div className="zone">
              <div className="zoneHead">
                <div className="zoneTitle">MOMENTS</div>
              </div>
              <div className="momentList">
                {moments.map((m, i) => (
                  <div key={i} className="momentChip">
                    <strong>{(m.type || "").toUpperCase()}</strong>
                    <span>{(m.desc || "").slice(0, 120)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {ps.length ? (
            <div className="zone">
              <div className="zoneHead">
                <div className="zoneTitle">P.S.</div>
              </div>
              <div className="momentList">
                {ps.map((r, i) => (
                  <div key={i} className="momentChip">
                    <strong>{(r.whenDate || "").toUpperCase()} {(r.whenTime || "").toUpperCase()}</strong>
                    <span>{(r.description || "").slice(0, 140)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    );
  };

  const TodayHub = () => (
    <>
      <AssessmentView dateISO={openDay} />
      <IntakeView dateISO={openDay} />
      <ContextSummary />
      <SummationView dateISO={openDay} />
    </>
  );

  const MainView = () => {
    if (active === "today") return <TodayHub />;
    if (active === "intake") return <IntakeView dateISO={openDay} />;
    if (active === "roidboy") return <RoidBoyView dateISO={openDay} />;
    if (active === "moments") return <MomentsView dateISO={openDay} />;
    if (active === "ps") return <PSView dateISO={openDay} />;
    if (active === "summation") return <SummationView dateISO={openDay} />;
    if (active === "yearreview") return <YearReviewView />;
    if (active === "seal") return <SealView />;
    // Library is accessed by long-press? For now keep it in code path
    if (active === "library") return <LibraryView onOpenDay={(d)=>{ setOpenDay(d); runWeaveThen("today"); }} />;
    return <TodayHub />;
  };

  return (
    <div className="appRoot">
      {!unlocked ? <OpeningFlow onDone={() => setUnlocked(true)} /> : null}

      <header className="topbar">
        <div className="topLeft">
          <span className="brandTitle">TELL NO LIES</span>
        </div>
        <div className="topRight">
          <span className="dateChip">{dateLabel}</span>
        </div>
      </header>

      <main className="mainStage">
        <MainView />
      </main>

      <Sidebar active={active} onSelect={onSelect} />

      {weaveOn ? <Weave /> : null}
    </div>
  );
}
