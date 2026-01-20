// components/OpeningFlow.js
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * Canon Opening Flow (LOCKED):
 * Stage 1: /flow/stage-1-opening.png  (sigil press triggers GitHub OAuth)
 * Stage 2: /flow/stage-2-auth.png     (shown while OAuth happens)
 * Stage 3: /flow/stage-3-arrival.png  (brief arrival, then unlock app)
 *
 * No helper text. No layout drift. iPad-first.
 */
export default function OpeningFlow({ onDone }) {
  const [stage, setStage] = useState(1); // 1 | 2 | 3
  const [busy, setBusy] = useState(false);
  const doneOnce = useRef(false);

  const images = useMemo(
    () => ({
      1: "/flow/stage-1-opening.png",
      2: "/flow/stage-2-auth.png",
      3: "/flow/stage-3-arrival.png",
    }),
    []
  );

  const finish = () => {
    if (doneOnce.current) return;
    doneOnce.current = true;
    onDone?.();
  };

  const goArrivalThenFinish = () => {
    setStage(3);
    window.setTimeout(() => finish(), 650);
  };

  useEffect(() => {
    let alive = true;

    const boot = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!alive) return;

        if (data?.session) {
          goArrivalThenFinish();
        } else {
          setStage(1);
        }
      } catch {
        if (!alive) return;
        setStage(1);
      }
    };

    boot();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!alive) return;
      if (session) goArrivalThenFinish();
    });

    return () => {
      alive = false;
      sub?.subscription?.unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startGithub = async () => {
    if (busy) return;
    setBusy(true);
    setStage(2);

    try {
      const origin =
        typeof window !== "undefined" && window.location?.origin
          ? window.location.origin
          : "https://chaosmusings.app";

      // redirect back into YOUR APP domain
      const redirectTo = `${origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo },
      });

      // If it doesn't redirect, re-arm Stage 1.
      if (error) {
        setBusy(false);
        setStage(1);
      }
    } catch {
      setBusy(false);
      setStage(1);
    }
  };

  return (
    <div style={S.wrap} aria-label="Opening">
      <img
        src={images[stage]}
        alt=""
        draggable={false}
        style={S.bg}
        onError={() => {
          setStage(1);
          setBusy(false);
        }}
      />

      {stage === 1 ? (
        <button
          type="button"
          onClick={startGithub}
          disabled={busy}
          aria-label="Enter"
          style={{
            ...S.sigilBtn,
            opacity: busy ? 0.55 : 1,
            pointerEvents: busy ? "none" : "auto",
          }}
        />
      ) : null}
    </div>
  );
}

const S = {
  wrap: {
    position: "fixed",
    inset: 0,
    background: "#000",
    overflow: "hidden",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
  },
  bg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    transform: "translateZ(0)",
  },

  // Invisible-but-clickable sigil zone — moved DOWN (waist placement)
  sigilBtn: {
    position: "absolute",
    left: "50%",
    top: "62%",
    width: "132px",
    height: "132px",
    transform: "translate(-50%, -50%)",
    borderRadius: "999px",
    border: "0",
    background: "transparent",
    outline: "none",
  },
};
