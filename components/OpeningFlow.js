"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * Canon Opening Flow (LOCKED):
 * Stage 1: opening image (sigil hotspot triggers GitHub OAuth)
 * Stage 2: auth image (shown while OAuth happens)
 * Stage 3: arrival image (brief, then unlock app)
 *
 * Fixes:
 * - Hotspot is ALWAYS above image (z-index).
 * - Image can NEVER steal taps (pointer-events: none).
 * - Supports BOTH filename sets:
 *   /flow/stage-1-opening.png OR /flow/state-1-center.jpeg
 * - iPad tap-safe (touchAction + bigger hotspot).
 */
export default function OpeningFlow({ onDone }) {
  const [stage, setStage] = useState(1); // 1 | 2 | 3
  const [busy, setBusy] = useState(false);
  const doneOnce = useRef(false);

  // Try canonical names first, then fall back to your "state-*" names
  const images = useMemo(
    () => ({
      1: ["/flow/stage-1-opening.png", "/flow/state-1-center.jpeg", "/flow/state-1-opening.jpeg"],
      2: ["/flow/stage-2-auth.png", "/flow/state-2-auth.jpeg"],
      3: ["/flow/stage-3-arrival.png", "/flow/state-3-arrival.jpeg"],
    }),
    []
  );

  const [src, setSrc] = useState(images[1][0]);
  const triedRef = useRef({ 1: 0, 2: 0, 3: 0 });

  const finish = () => {
    if (doneOnce.current) return;
    doneOnce.current = true;
    onDone?.();
  };

  const goArrivalThenFinish = () => {
    setStage(3);
    triedRef.current[3] = 0;
    setSrc(images[3][0]);
    window.setTimeout(() => finish(), 650);
  };

  useEffect(() => {
    let alive = true;

    const boot = async () => {
      try {
        // ensure stage 1 image on mount
        triedRef.current[1] = 0;
        setSrc(images[1][0]);
        setStage(1);

        const { data } = await supabase.auth.getSession();
        if (!alive) return;

        // If already authed, skip to arrival
        if (data?.session) goArrivalThenFinish();
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

    // Stage 2 visual
    setStage(2);
    triedRef.current[2] = 0;
    setSrc(images[2][0]);

    try {
      const origin =
        typeof window !== "undefined" && window.location?.origin
          ? window.location.origin
          : "https://chaosmusings.app";

      // MUST return to your app domain
      const redirectTo = `${origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo },
      });

      // signInWithOAuth should redirect away; if it doesn't, revert to stage 1
      if (error) {
        setBusy(false);
        setStage(1);
        triedRef.current[1] = 0;
        setSrc(images[1][0]);
      }
    } catch {
      setBusy(false);
      setStage(1);
      triedRef.current[1] = 0;
      setSrc(images[1][0]);
    }
  };

  const onImgError = () => {
    // fall back to next candidate filename for current stage
    const idx = triedRef.current[stage] ?? 0;
    const nextIdx = idx + 1;
    const list = images[stage] || [];

    if (nextIdx < list.length) {
      triedRef.current[stage] = nextIdx;
      setSrc(list[nextIdx]);
      return;
    }

    // all failed → safe return to stage 1
    triedRef.current[1] = 0;
    setStage(1);
    setBusy(false);
    setSrc(images[1][0]);
  };

  return (
    <div style={S.wrap} aria-label="Opening">
      <img src={src} alt="" draggable={false} style={S.bg} onError={onImgError} />

      {/* Stage 1: invisible sigil hotspot ONLY (no text) */}
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
    pointerEvents: "none", // CRITICAL: image can never steal the tap
  },

  // Invisible clickable zone.
  // If sigil is slightly off, adjust ONLY top/size here.
  sigilBtn: {
    position: "absolute",
    left: "50%",
    top: "60%", // waist placement
    width: "150px",
    height: "150px",
    transform: "translate(-50%, -50%)",
    borderRadius: "999px",
    border: "0",
    background: "transparent",
    outline: "none",
    zIndex: 5, // ALWAYS above
    touchAction: "manipulation",
  },
};
