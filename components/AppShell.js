"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Weave from "@/components/Weave";
import AssessmentView from "@/components/AssessmentView";

// Stub views (safe placeholders until you paste your approved ones)
// These do NOT change your approved content; they just prevent crashes.
function IntakeView() { return <div style={{ padding: 18 }}>INTAKE (wired next)</div>; }
function RoidBoyView() { return <div style={{ padding: 18 }}>ROID BOY (wired next)</div>; }
function MomentsView() { return <div style={{ padding: 18 }}>MOMENTS (wired next)</div>; }
function PSView() { return <div style={{ padding: 18 }}>P.S. (wired next)</div>; }
function SummationView() { return <div style={{ padding: 18 }}>SUMMATION (wired next)</div>; }
function LibraryView() { return <div style={{ padding: 18 }}>LIBRARY (wired next)</div>; }
function SealView() { return <div style={{ padding: 18 }}>SEAL (wired next)</div>; }
function YearReviewView() { return <div style={{ padding: 18 }}>YEAR REVIEW (wired next)</div>; }

export default function AppShell() {
  // routes (LOCKED)
  // daily hub landing = "hub"
  const [active, setActive] = useState("hub");
  const [weaving, setWeaving] = useState(false);

  // swipe-only sidebar
  const [navOpen, setNavOpen] = useState(false);

  const nav = useMemo(
    () => (id) => {
      // universal weave transition between sections
      if (id === active) {
        setNavOpen(false);
        return;
      }
      setWeaving(true);
      setTimeout(() => {
        setActive(id);
        setWeaving(false);
        setNavOpen(false);
      }, 520);
    },
    [active]
  );

  // right-edge, bottom-right-ish swipe to open
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onTouchStart = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;

      const w = window.innerWidth || 0;
      const h = window.innerHeight || 0;

      // bottom-right corner zone
      const inRightEdge = t.clientX > w - 26;
      const inBottomZone = t.clientY > h * 0.55;

      if (!inRightEdge || !inBottomZone) return;

      tracking = true;
      startX = t.clientX;
      startY = t.clientY;
    };

    const onTouchMove = (e) => {
      if (!tracking) return;
      const t = e.touches && e.touches[0];
      if (!t) return;

      const dx = startX - t.clientX; // swipe left to open
      const dy = Math.abs(t.clientY - startY);

      if (dy > 44) return;
      if (dx > 30) setNavOpen(true);
    };

    const onTouchEnd = () => {
      tracking = false;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const now = new Date();
  const day = now.toLocaleDateString(undefined, { weekday: "long" }).toUpperCase();
  const date = now
    .toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();

  const renderMain = () => {
    // Daily Hub landing: Assessment → Intake → Context → Summation
    if (active === "hub") {
      return (
        <main className="mainStage">
          <section className="hubBlock">
            <AssessmentView embedded />
          </section>

          <section className="hubBlock">
            <IntakeView embedded />
          </section>

          <section className="hubBlock">
            <div className="hubTitle">THE CONTEXT</div>
            {/* Context auto-populates from Moments + Roid Boy + P.S. (wired later) */}
            <div className="card">
              <div className="cardHead">CONTEXT FEED</div>
              <div className="small">Auto-lands here once entries are completed.</div>
            </div>
          </section>

          <section className="hubBlock">
            <SummationView embedded />
          </section>
        </main>
      );
    }

    if (active === "intake") return <IntakeView />;
    if (active === "roidboy") return <RoidBoyView />;
    if (active === "moments") return <MomentsView />;
    if (active === "ps") return <PSView />;
    if (active === "summation") return <SummationView />;
    if (active === "year") return <YearReviewView />;
    if (active === "library") return <LibraryView />;
    if (active === "seal") return <SealView />;

    return <main className="mainStage" />;
  };

  return (
    <div className="appRoot">
      {/* Top Header (LOCKED) */}
      <header className="topbar">
        <div className="topLeft">
          <img
            src="/glyphs/sigil-eye.png"
            alt=""
            className="eyeGlyph"
            draggable={false}
          />
        </div>

        <div className="topCenter">
          <div className="brandTitle">TELL NO LIES</div>
        </div>

        <div className="topRight">
          <div className="chip">{day}</div>
          <div className="chip">{date}</div>
        </div>
      </header>

      {/* Sidebar (swipe-only) */}
      <Sidebar
        open={navOpen}
        active={active}
        onSelect={nav}
        onClose={() => setNavOpen(false)}
      />

      {renderMain()}

      {weaving ? <Weave /> : null}
    </div>
  );
}
