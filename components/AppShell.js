// components/AppShell.js
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import OpeningFlow from "@/components/OpeningFlow";
import Weave from "@/components/Weave";

// Views (use what exists; if a file is missing it will error at build — so only import what you have)
import AssessmentView from "@/components/AssessmentView";

export default function AppShell() {
  const [openingDone, setOpeningDone] = useState(false);

  // Active section (hash routed)
  const [active, setActive] = useState("today");

  // Weave must be authoritative
  const [weaving, setWeaving] = useState(false);
  const weaveTimer = useRef(null);

  const normalize = (v) => {
    const id = String(v || "").replace("#", "").toLowerCase();
    const allowed = [
      "today",
      "intake",
      "roidboy",
      "moments",
      "ps",
      "summation",
      "yearreview",
      "seal",
    ];
    return allowed.includes(id) ? id : "today";
  };

  const applyHash = () => {
    const next = normalize(window.location.hash);
    setActive(next);
  };

  useEffect(() => {
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nav = useMemo(
    () => (id) => {
      const next = normalize(id);

      // weave blocks section change
      setWeaving(true);

      if (weaveTimer.current) window.clearTimeout(weaveTimer.current);
      weaveTimer.current = window.setTimeout(() => {
        setActive(next);
        window.location.hash = `#${next}`;
        setWeaving(false);
      }, 520);
    },
    []
  );

  const enterAppFromOpening = () => {
    // First entry into app also goes through weave
    setWeaving(true);
    window.setTimeout(() => {
      setOpeningDone(true);

      // land on today by doctrine
      if (!window.location.hash || window.location.hash === "#") {
        window.location.hash = "#today";
      }
      setActive(normalize(window.location.hash));
      setWeaving(false);
    }, 520);
  };

  // Opening gates everything. App does not mount until done.
  if (!openingDone) {
    return (
      <>
        <OpeningFlow onDone={enterAppFromOpening} />
        <Weave show={weaving} />
      </>
    );
  }

  return (
    <div className="appRoot">
      <Sidebar active={active} onSelect={nav} />

      <header className="topbar">
        <div className="topLeft">
          <img
            className="topEye"
            src="/ui/glyphs/sigil-eye.svg"
            alt=""
            draggable={false}
          />
          <div className="topTitle">TELL NO LIES</div>
        </div>

        <div className="topRight">
          <div className="topDate">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
            }).toUpperCase()}
          </div>
        </div>
      </header>

      <main className="mainStage">
        {active === "today" ? <AssessmentView /> : null}

        {/* The other views will be added as full files next.
            For now: do NOT invent. Keep blank when not implemented. */}
        {active !== "today" ? (
          <div className="emptyStage" aria-hidden="true" />
        ) : null}
      </main>

      <Weave show={weaving} />
    </div>
  );
}
