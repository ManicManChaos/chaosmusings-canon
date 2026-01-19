"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Weave from "./Weave";

/**
 * OPENING (LOCKED CANON)
 * Assets (must exist):
 *  public/flow/state-1-center.jpg
 *  public/flow/state-2-auth.jpg
 *  public/flow/state-3-arrival.jpg
 *
 * Flow:
 *  - Stage 1 shows sigil button
 *  - Click -> Stage 2 shows (weave/auth) AND triggers Supabase GitHub OAuth
 *  - GitHub returns to /auth/callback (already exists)
 *  - Callback returns user to /#today (we keep AppShell stable)
 *
 * NOTE: Stage 3 is shown by AssessmentView on first load after auth (breath pause).
 * (This prevents loop/re-triggering OAuth inside OpeningBook.)
 */

export default function OpeningBook({ mode = "start", onDone }) {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [weaving, setWeaving] = useState(false);

  // Arrival mode: hold the final cover, then weave into the app.
  useEffect(() => {
    if (mode !== "arrival") return;
    setStep(2);
    const t1 = setTimeout(() => setWeaving(true), 900);
    const t2 = setTimeout(() => {
      setWeaving(false);
      onDone?.();
    }, 1450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [mode, onDone]);

  const begin = async () => {
    if (busy) return;
    setBusy(true);
    setStep(1);
    setWeaving(true);

    // Redirect back to your Supabase callback page
    const redirectTo = `${window.location.origin}/auth/callback`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo },
    });

    if (error) {
      console.error("[OpeningBook] OAuth start failed:", error);
      setBusy(false);
      setStep(0);
      setWeaving(false);
      alert("Login failed to start. Please try again.");
    }
    // If successful, browser navigates away to GitHub.
  };

  return (
    <div className="openingRoot">
      <div className="gateCard">
        <div className="gateStage">
          <img
            className={"gateImg " + (step === 0 ? "isOn" : "")}
            src="/flow/state-1-center.jpg"
            alt="Eyes closed"
            draggable={false}
          />
          <img
            className={"gateImg " + (step === 1 ? "isOn" : "")}
            src="/flow/state-2-auth.jpg"
            alt="Weave to authentication"
            draggable={false}
          />
          <img
            className={"gateImg " + (step === 2 ? "isOn" : "")}
            src="/flow/state-3-arrival.jpg"
            alt="Arrival"
            draggable={false}
          />

          <div className="gateFade" aria-hidden="true" />

          {step === 0 ? (
            <button className="sigilBtn sigilBtnWaist" onClick={begin} type="button" disabled={busy}>
              <img className="sigilGlyph" src="/glyphs/ornate/sigil-eye.png" alt="" aria-hidden="true" />
              <span className="sigilBtnText">{busy ? "OPENING…" : "OPEN"}</span>
            </button>
          ) : null}

          {weaving ? <Weave /> : null}
        </div>

        <div className="gateTitlePlate">
          <div className="gateTitle">MANIC MUSINGS OF CHAOS</div>
        </div>
      </div>
    </div>
  );
}
