// components/AppShell.js
"use client";

import { useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import OpeningFlow from "./OpeningFlow";
import Weave from "./Weave";

import AssessmentView from "./AssessmentView";
import IntakeView from "./IntakeView";
import MomentsView from "./MomentsView";
import RoidBoyView from "./RoidBoyView";
import PSView from "./PSView";
import SummationView from "./SummationView";
import LibraryView from "./LibraryView";
import SealView from "./SealView";
import YearReviewView from "./YearReviewView";

export default function AppShell() {
  // today = Daily Hub landing
  const [active, setActive] = useState("today");
  const [openingDone, setOpeningDone] = useState(false);
  const [weaving, setWeaving] = useState(false);

  // UNIVERSAL WEAVE between app sections
  const nav = useMemo(
    () => (id) => {
      // prevent double-triggers
      if (!id || id === active) return;

      setWeaving(true);
      window.setTimeout(() => {
        setActive(id);
        setWeaving(false);
      }, 520);
    },
    [active]
  );

  // HARD GATE:
  // NOTHING else may render until OpeningFlow finishes.
  if (!openingDone) {
    return (
      <div className="appRoot">
        <OpeningFlow onDone={() => setOpeningDone(true)} />
      </div>
    );
  }

  const renderMain = () => {
    // DAILY HUB LANDING (restored — Intake stays here)
    // Order: Assessment → Intake → Context → Summation
    if (active === "today") {
      return (
        <>
          <AssessmentView />
          <IntakeView />

          <section className="card">
            <div className="cardHead">THE CONTEXT</div>
            <div className="ghostList">
              <div className="ghostItem">•</div>
              <div className="ghostItem">•</div>
              <div className="ghostItem">•</div>
            </div>
          </section>

          <SummationView />
        </>
      );
    }

    // Sidebar sections (full screens)
    if (active === "intake") return <IntakeView />;
    if (active === "roidboy") return <RoidBoyView />;
    if (active === "moments") return <MomentsView />;
    if (active === "ps") return <PSView />;
    if (active === "summation") return <SummationView />;
    if (active === "library") return <LibraryView />;
    if (active === "yearreview") return <YearReviewView />;
    if (active === "seal") return <SealView />;

    // fallback
    return <div />;
  };

  return (
    <div className="appRoot">
      <Sidebar active={active} onSelect={nav} />

      <main className="mainStage">{renderMain()}</main>

      {weaving ? <Weave /> : null}
    </div>
  );
}
