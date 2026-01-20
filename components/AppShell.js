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
  const [active, setActive] = useState("today"); // Daily Hub landing
  const [openingDone, setOpeningDone] = useState(false);
  const [weaving, setWeaving] = useState(false);

  const nav = useMemo(
    () => (id) => {
      setWeaving(true);
      window.setTimeout(() => {
        setActive(id);
        setWeaving(false);
      }, 520);
    },
    []
  );

  const renderMain = () => {
    // DAILY HUB LANDING (LOCKED ORDER):
    // Assessment → Intake → Context → Summation
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

    // Sidebar sections
    if (active === "intake") return <IntakeView />;
    if (active === "roidboy") return <RoidBoyView />;
    if (active === "moments") return <MomentsView />;
    if (active === "ps") return <PSView />;
    if (active === "summation") return <SummationView />;
    if (active === "yearreview") return <YearReviewView />;
    if (active === "seal") return <SealView />;

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
