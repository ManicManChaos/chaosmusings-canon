// components/OpeningFlow.js
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * Canon Opening Flow (LOCKED)
 * Stage 1: /flow/stage-1-opening.png  (sigil press triggers GitHub OAuth)
 * Stage 2: /flow/stage-2-auth.png     (shown while OAuth happens)
 * Stage 3: /flow/stage-3-arrival.png  (brief arrival, then unlock app)
 *
 * No helper text. iPad-first. No layout drift.
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

      // MUST return to the app domain:
      const redirectTo = `${origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo },
      });

      // signInWithOAuth should redirect away. If it doesn't:
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
        key={stage}
        src={images[stage]}
        alt=""
        draggable={false}
        style={S.bg}
        onError={() => {
          // If the image path is wrong, fall back safely to stage 1.
          setBusy(false);
          setStage(1);
        }}
      />

      {/* Stage 1: Invisible sigil hotspot (MUST be above image) */}
      {stage === 1 ? (
        <button
          type="button"
          onClick={startGithub}
          disabled={busy}
          aria-label="Enter"
          style={{
            ...S.sigilBtn,
            opacity: busy ? 0.6 : 1,
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
    zIndex: 1,
  },

  // Invisible but clickable sigil zone centered.
  // (If you want it bigger/smaller later, ONLY change width/height.)
  sigilBtn: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "150px",
    height: "150px",
    transform: "translate(-50%, -50%)",
    borderRadius: "999px",
    border: "0",
    background: "transparent",
    outline: "none",
    zIndex: 10,
  },
};
