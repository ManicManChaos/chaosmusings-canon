"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Weave from "@/components/Weave";

export default function AppShell() {
  const [active, setActive] = useState("eye");
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

  return (
    <div className="appRoot">
      <Sidebar active={active} onSelect={nav} />

      <main className="mainStage">
        {/* IMPORTANT: do not invent headers here.
            Your canonical top bar should live where it already lives. */}

        {active === "eye" ? (
          <section className="card">
            <div className="cardHead">THE ASSESSMENT</div>
            {/* if you already have AssessmentView, swap this div for it */}
            <div className="small">Assessment UI renders here.</div>
          </section>
        ) : (
          <section className="card">
            <div className="cardHead">{String(active).toUpperCase()}</div>
            <div className="small">Section placeholder.</div>
          </section>
        )}
      </main>

      {weaving ? <Weave /> : null}
    </div>
  );
}
