"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import OpeningBook from "./OpeningBook";
import Sidebar from "./Sidebar";
import Weave from "./Weave";
import AssessmentView from "./AssessmentView";
import { supabase } from "../lib/supabaseClient";

function PlaceholderView({ title }) {
  return (
    <div className="container">
      <section className="card view">
        <div className="pageHeader">
          <div className="pageTitle">{title}</div>
        </div>
        <div className="small">(wired via sidebar; UI will be restored next)</div>
      </section>
    </div>
  );
}

export default function AppShell() {
  const [session, setSession] = useState(null);
  const [checked, setChecked] = useState(false);
  const [arrival, setArrival] = useState(false);
  const [active, setActive] = useState("today");
  const [navOpen, setNavOpen] = useState(false);
  const [weaving, setWeaving] = useState(false);
  const startRef = useRef({ x: 0, y: 0, t: 0, tracking: false });
  const sessionRef = useRef(null);

  useEffect(() => {
    let alive = true;

    const applySession = (s) => {
      setSession(s ?? null);
      setChecked(true);
      // If we just transitioned from logged-out -> logged-in, show the arrival cover briefly.
      if (!sessionRef.current && s) setArrival(true);
      sessionRef.current = s ?? null;
    };


    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      applySession(data?.session ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!alive) return;
      applySession(s ?? null);
    });

    return () => {
      alive = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const routes = useMemo(
    () => [
      { id: "today", label: "TODAY", icon: "/icons/eye.svg" },
      { id: "assessment", label: "ASSESSMENT", icon: "/icons/assessment.svg" },
      { id: "intake", label: "INTAKE", icon: "/icons/intake.svg" },
      { id: "moments", label: "MOMENTS", icon: "/icons/moments.svg" },
      { id: "roidboy", label: "ROID BOY", icon: "/icons/roidboy.svg" },
      { id: "ps", label: "P.S.", icon: "/icons/ps.svg" },
      { id: "summation", label: "SUMMATION", icon: "/icons/summation.svg" },
      { id: "library", label: "LIBRARY", icon: "/icons/library.svg" }
    ],
    []
  );

  const nav = (id) => {
    if (!id || id === active) {
      setNavOpen(false);
      return;
    }
    setWeaving(true);
    setTimeout(() => {
      setActive(id);
      setWeaving(false);
      setNavOpen(false);
    }, 520);
  };

  if (!checked) return null;
  if (!session) return <OpeningBook mode="start" />;
  if (arrival) return <OpeningBook mode="arrival" onDone={() => setArrival(false)} />;

  const onHotTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    startRef.current = { x: t.clientX, y: t.clientY, t: Date.now(), tracking: true };
  };

  const onHotTouchMove = (e) => {
    const st = startRef.current;
    if (!st.tracking) return;
    const t = e.touches?.[0];
    if (!t) return;
    const dx = st.x - t.clientX; // swipe left
    const dy = Math.abs(st.y - t.clientY);
    if (dy > 34) return;
    if (dx > 18) setNavOpen(true); // short flick
  };

  const onHotTouchEnd = () => {
    startRef.current.tracking = false;
  };

  return (
    <div className="appRoot">
      <div
        className="rightHotzone"
        aria-label="Open navigation"
        onTouchStart={onHotTouchStart}
        onTouchMove={onHotTouchMove}
        onTouchEnd={onHotTouchEnd}
      />

      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} routes={routes} active={active} onSelect={nav} />

      {active === "today" || active === "assessment" ? (
        <AssessmentView />
      ) : (
        <PlaceholderView title={routes.find((r) => r.id === active)?.label || ""} />
      )}

      {weaving ? <Weave /> : null}
    </div>
  );
}
