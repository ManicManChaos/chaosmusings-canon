"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Weave from "@/components/Weave";

// If you already have these files, keep the imports and remove the inline stubs.
// If you do NOT have them yet, leave the inline stubs for now (they won’t invent helper text).
// Later we will replace each stub with your fully approved view files.
function IntakeView() {
  return (
    <main className="mainStage">
      <div className="viewPad">
        <div className="viewTitle">INTAKE</div>
      </div>
    </main>
  );
}
function RoidBoyView() {
  return (
    <main className="mainStage">
      <div className="viewPad">
        <div className="viewTitle">ROID BOY</div>
      </div>
    </main>
  );
}
function MomentsView() {
  return (
    <main className="mainStage">
      <div className="viewPad">
        <div className="viewTitle">MOMENTS</div>
      </div>
    </main>
  );
}
function PSView() {
  return (
    <main className="mainStage">
      <div className="viewPad">
        <div className="viewTitle">P.S.</div>
      </div>
    </main>
  );
}
function SummationView() {
  return (
    <main className="mainStage">
      <div className="viewPad">
        <div className="viewTitle">THE SUMMATION</div>
      </div>
    </main>
  );
}
function YearReviewView() {
  return (
    <main className="mainStage">
      <div className="viewPad">
        <div className="viewTitle">YEAR REVIEW</div>
      </div>
    </main>
  );
}
function SealView() {
  return (
    <main className="mainStage">
      <div className="viewPad">
        <div className="viewTitle">SEAL</div>
      </div>
    </main>
  );
}

export default function AppShell() {
  // LOCKED: Daily Hub landing is "today"
  const [active, setActive] = useState("today");
  const [weaving, setWeaving] = useState(false);

  // hash route support: #today #intake #roidboy #moments #ps #summation #yearreview #seal
  useEffect(() => {
    const normalize = (raw) => {
      const v = String(raw || "").replace("#", "").toLowerCase();
      const allowed = new Set([
        "today",
        "intake",
        "roidboy",
        "moments",
        "ps",
        "summation",
        "yearreview",
        "seal"
      ]);
      return allowed.has(v) ? v : "today";
    };

    const apply = () => {
      const v = normalize(window.location.hash);
      setActive(v);
    };

    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const nav = useMemo(
    () => (id) => {
      // universal weave on every section change
      setWeaving(true);
      setTimeout(() => {
        setActive(id);
        try {
          const desired = `#${id}`;
          if (window.location.hash !== desired) window.history.replaceState(null, "", desired);
        } catch {}
        setWeaving(false);
      }, 520);
    },
    []
  );

  const now = new Date();
  const day = now.toLocaleDateString(undefined, { weekday: "long" }).toUpperCase();
  const date = now
    .toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();

  const renderView = () => {
    if (active === "today") {
      // Daily Hub landing: Assessment → Intake → Context → Summation
      // We are NOT re-creating your assessment form here (no invention).
      // This is just the correct landing structure so your existing AssessmentView can be slotted in next.
      return (
        <main className="mainStage">
          <div className="hubWrap">
            <section className="hubBlock">
              <div className="hubBlockTitle">THE ASSESSMENT</div>
              <div className="hubStub">[AssessmentView mounts here]</div>
            </section>

            <section className="hubBlock">
              <div className="hubBlockTitle">THE INTAKE</div>
              <div className="hubStub">[Intake progress bars + goals mount here]</div>
            </section>

            <section className="hubBlock">
              <div className="hubBlockTitle">THE CONTEXT</div>
              <div className="hubStub">[Auto from Moments + Roid Boy + P.S.]</div>
            </section>

            <section className="hubBlock">
              <div className="hubBlockTitle">THE SUMMATION</div>
              <div className="hubStub">[SummationView mounts here]</div>
            </section>
          </div>
        </main>
      );
    }

    if (active === "intake") return <IntakeView />;
    if (active === "roidboy") return <RoidBoyView />;
    if (active === "moments") return <MomentsView />;
    if (active === "ps") return <PSView />;
    if (active === "summation") return <SummationView />;
    if (active === "yearreview") return <YearReviewView />;
    if (active === "seal") return <SealView />;

    return (
      <main className="mainStage">
        <div className="viewPad">
          <div className="viewTitle">—</div>
        </div>
      </main>
    );
  };

  return (
    <div className="appRoot">
      {/* LOCKED HEADER */}
      <header className="topbar">
        <div className="topLeft">
          <img className="headerGlyph" src="/ui/glyphs/sigil-eye.svg" alt="" />
        </div>

        <div className="topCenter">
          <div className="brandTitle">TELL NO LIES</div>
        </div>

        <div className="topRight">
          <div className="headerChip">{day}</div>
          <div className="headerChip">{date}</div>
        </div>
      </header>

      {/* Sidebar handles open/close itself (right-edge swipe hotzone is inside Sidebar) */}
      <Sidebar active={active} onSelect={nav} />

      {renderView()}

      {weaving ? <Weave /> : null}
    </div>
  );
}
