"use client";

import { useMemo, useState } from "react";

import Sidebar from "./Sidebar";
import OpeningFlow from "./OpeningFlow";
import Weave from "./Weave";

// Views (MUST exist in /components with these exact names)
import AssessmentView from "./AssessmentView";
import IntakeView from "./IntakeView";
import RoidBoyView from "./RoidBoyView";
import MomentsView from "./MomentsView";
import PSView from "./PSView";
import SummationView from "./SummationView";
import YearReviewView from "./YearReviewView";
import SealView from "./SealView";

export default function AppShell() {
  const [active, setActive] = useState("today");
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

  const renderActive = () => {
    switch (active) {
      case "today":
        return <AssessmentView />; // Daily Hub landing = Assessment view for now
      case "intake":
        return <IntakeView />;
      case "roidboy":
        return <RoidBoyView />;
      case "moments":
        return <MomentsView />;
      case "ps":
        return <PSView />;
      case "summation":
        return <SummationView />;
      case "yearreview":
        return <YearReviewView />;
      case "seal":
        return <SealView />;
      default:
        return <AssessmentView />;
    }
  };

  return (
    <div className="appRoot">
      {!openingDone ? (
        <OpeningFlow onDone={() => setOpeningDone(true)} />
      ) : (
        <>
          <Sidebar active={active} onSelect={nav} />
          <main className="mainStage">{renderActive()}</main>
          {weaving ? <Weave /> : null}
        </>
      )}
    </div>
  );
}
