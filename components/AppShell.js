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
import YearReviewView from "./YearReviewView";
import SealView from "./SealView";

export default function AppShell() {
  const [active, setActive] = useState("today"); // today = Daily Hub landing
  const [openingDone, setOpeningDone] = useState(false);
  const [weaving, setWeaving] = useState(false);

  const nav = useMemo(
    () => (id) => {
      setWeaving(true);
      setTimeout(() => {
        setActive(id);
        setWeaving(false);
      }, 520);
    },
    []
  );

  const renderMain = () => {
    // DAILY HUB LANDING (LOCKED ORDER):
    // Assessment → Context → Summation
    // (Intake is REMOVED from the Daily Hub landing, but still exists as its own sidebar section.)
    if (active === "today") {
      return (
        <>
          <AssessmentView />

          <section className="card">
            <div className="cardHead">THE CONTEXT</div>
            <div className="ghostList">
              <div className="ghostItem">•</div>
              <div className="ghostItem">•</div>
              <div className="ghostItem">•</div>
            </div>
          </section>

          <section className="card">
            <div className="cardHead">THE SUMMATION</div>
          </section>
        </>
      );
    }

    // Sidebar sections (separate screens)
    if (active === "intake") return <IntakeView />;
    if (active === "roidboy") return <RoidBoyView />;
    if (active === "moments") return <MomentsView />;
    if (active === "ps") return <PSView />;
    if (active === "summation") return <SummationView />;
    if (active === "yearreview") return <YearReviewView />;
    if (active === "seal") return <SealView />;

    // fallback
    return <div />;
  };

  return (
    <div className="appRoot">
      {!openingDone ? (
        <OpeningFlow onDone={() => setOpeningDone(true)} />
      ) : (
        <>
          <Sidebar active={active} onSelect={nav} />

          <main className="mainStage">{renderMain()}</main>

          {weaving ? <Weave /> : null}
        </>
      )}
    </div>
  );
}
