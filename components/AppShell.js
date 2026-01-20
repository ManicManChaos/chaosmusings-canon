"use client";

import { useEffect, useMemo, useState } from "react";
import OpeningBook from "@/components/OpeningBook";
import Sidebar from "@/components/Sidebar";
import Weave from "@/components/Weave";

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function niceDate() {
  const d = new Date();
  return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" }).toUpperCase();
}

export default function AppShell() {
  const [openingDone, setOpeningDone] = useState(false);
  const [active, setActive] = useState("today");
  const [weaving, setWeaving] = useState(false);

  // hash routing (minimal, locked)
  useEffect(() => {
    const apply = () => {
      const h = (location.hash || "").replace("#", "").toLowerCase();
      if (!h) return;
      setActive(h);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const nav = useMemo(
    () => (id) => {
      setWeaving(true);
      setTimeout(() => {
        setActive(id);
        history.replaceState(null, "", `#${id}`);
        setWeaving(false);
      }, 520);
    },
    []
  );

  return (
    <div className="appRoot">
      {!openingDone ? (
        <OpeningBook onDone={() => setOpeningDone(true)} />
      ) : (
        <>
          <header className="topbar">
            <div className="brandTitle">TELL NO LIES</div>
            <div className="dateChip">{niceDate()}</div>
          </header>

          <Sidebar active={active} onSelect={nav} />

          <main className="mainStage">
            {/* Placeholder view shells ONLY — we will replace with the real approved UIs next */}
            {active === "today" ? <div className="viewTitle">DAILY HUB — {todayISO()}</div> : null}
            {active === "intake" ? <div className="viewTitle">INTAKE</div> : null}
            {active === "roidboy" ? <div className="viewTitle">ROID BOY</div> : null}
            {active === "moments" ? <div className="viewTitle">MOMENTS</div> : null}
            {active === "ps" ? <div className="viewTitle">P.S.</div> : null}
            {active === "summation" ? <div className="viewTitle">THE SUMMATION</div> : null}
            {active === "yearreview" ? <div className="viewTitle">YEAR REVIEW</div> : null}
            {active === "seal" ? <div className="viewTitle">SEAL</div> : null}
          </main>

          {weaving ? <Weave /> : null}
        </>
      )}
    </div>
  );
}