"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const IMG1 = "/flow/state-1-opening.png";
const IMG2 = "/flow/state-2-auth.png";
const IMG3 = "/flow/state-3-arrival.png";

export default function OpeningBook({ onDone }) {
  const [stage, setStage] = useState("opening"); // opening | auth | arrival
  const [busy, setBusy] = useState(false);

  const stageImg = useMemo(() => {
    if (stage === "auth") return IMG2;
    if (stage === "arrival") return IMG3;
    return IMG1;
  }, [stage]);

  // Boot logic:
  // - If mmoc_gate_state=arrival → show arrival briefly then onDone
  // - Else if already authed → show arrival briefly then onDone
  // - Else → show opening with sigil
  useEffect(() => {
    let t1 = null;

    const boot = async () => {
      let gateState = null;
      try {
        gateState = localStorage.getItem("mmoc_gate_state");
      } catch {}

      if (gateState === "arrival") {
        setStage("arrival");
        try {
          localStorage.removeItem("mmoc_gate_state");
        } catch {}
        t1 = setTimeout(() => onDone?.(), 900);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setStage("arrival");
        t1 = setTimeout(() => onDone?.(), 900);
        return;
      }

      setStage("opening");
    };

    boot();
    return () => {
      if (t1) clearTimeout(t1);
    };
  }, [onDone]);

  const startAuth = async () => {
    if (busy) return;
    setBusy(true);

    // show auth state immediately
    setStage("auth");
    try {
      localStorage.setItem("mmoc_gate_state", "auth");
    } catch {}

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : "";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo }
    });

    if (error) {
      console.error("[OpeningBook] OAuth error:", error);
      setBusy(false);
      setStage("opening");
    }
  };

  return (
    <div className="gateWrap">
      <div className="gateCard">
        <div className="gateStage">
          <img className="gateImg isOn" src={stageImg} alt="" />

          {stage === "opening" ? (
            <button className="sigilBtn" onClick={startAuth} type="button" aria-label="Enter">
              <span className="sigilRing" />
              <span className="sigilCore" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}