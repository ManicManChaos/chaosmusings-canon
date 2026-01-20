"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import OpeningFlow from "./OpeningFlow";
import Weave from "./Weave";

import AssessmentView from "./AssessmentView";
import SummationView from "./SummationView";

function formatTopDate(d) {
  try {
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    }).toUpperCase();
  } catch {
    return "";
  }
}

export default function AppShell() {
  const [active, setActive] = useState("today"); // today = Daily Hub landing
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

  // Allow deep-linking via hash
  useEffect(() => {
    const apply = () => {
      const h = (window.location.hash || "").replace("#", "").trim();
      if (!h) return;
      nav(h);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [nav]);

  const topDate = formatTopDate(new Date());

  return (
    <div className="appRoot">
      {!openingDone ? (
        <OpeningFlow onDone={() => setOpeningDone(true)} />
      ) : (
        <>
          <Sidebar active={active} onSelect={nav} />

          {/* TOPBAR */}
          <header
            className="topbar"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px 12px",
              background: "rgba(5,8,6,.62)",
              borderBottom: "1px solid rgba(216,194,178,.12)",
              backdropFilter: "blur(16px) saturate(120%)",
              WebkitBackdropFilter: "blur(16px) saturate(120%)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src="/ui/glyphs/sigil-eye.svg"
                alt=""
                draggable={false}
                style={{
                  width: 22,
                  height: 22,
                  opacity: 0.95,
                  filter: "drop-shadow(0 0 12px rgba(255,90,168,.20))"
                }}
              />
              <div
                className="brandTitle"
                style={{
                  letterSpacing: ".34em",
                  textTransform: "uppercase",
                  fontWeight: 750
                }}
              >
                TELL NO LIES
              </div>
            </div>

            <div
              style={{
                letterSpacing: ".22em",
                textTransform: "uppercase",
                fontWeight: 650,
                opacity: 0.85,
                fontSize: 12
              }}
            >
              {topDate}
            </div>
          </header>

          <main className="mainStage" style={{ maxWidth: 980, margin: "0 auto", padding: 18 }}>
            {active === "today" ? (
              <>
                {/* Daily Hub landing order (LOCKED) */}
                <AssessmentView />

                <section className="card" style={{ marginTop: 12 }}>
                  <div className="cardHead">THE INTAKE</div>
                  <div className="cardBody" style={{ padding: 14 }}>
                    {/* placeholder container only; your full IntakeView comes next */}
                  </div>
                </section>

                <section className="card" style={{ marginTop: 12 }}>
                  <div className="cardHead">THE CONTEXT</div>
                  <div className="cardBody" style={{ padding: 14 }}>
                    {/* Moments + Roid Boy + P.S. will feed here */}
                  </div>
                </section>

                <div style={{ marginTop: 12 }}>
                  <SummationView />
                </div>
              </>
            ) : active === "summation" ? (
              <SummationView />
            ) : (
              <section className="card">
                <div className="cardHead">{String(active).toUpperCase()}</div>
                <div className="cardBody" style={{ padding: 14 }} />
              </section>
            )}
          </main>

          {weaving ? <Weave /> : null}
        </>
      )}
    </div>
  );
}
