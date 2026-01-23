"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * Canon Opening Flow (LOCKED):
 * Stage 1: opening image (sigil hotspot triggers GitHub OAuth)
 * Stage 2: auth image (shown while OAuth happens)
 * Stage 3: arrival image (brief, then unlock app)
 *
 * IMPORTANT:
 * - Hotspot is ALWAYS above image (z-index).
 * - Supports BOTH filename sets:
 *   /flow/stage-1-opening.png OR /flow/state-1-center.jpeg
 * - iPad tap-safe (touchAction + pointerEvents).
 */
export default function OpeningFlow({ onDone }) {
  const [stage, setStage] = useState(1); // 1 | 2 | 3
  const [busy, setBusy] = useState(false);
  const doneOnce = useRef(false);

  // Try canonical filenames first, then fall back to the "state-*" names.
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
    // swap src to stage 3 (with fallback logic)
    triedRef.current[3] = 0;
    setSrc(images[3][0]);
    window.setTimeout(() => finish(), 650);
  };

  useEffect(() => {
    let alive = true;

    const boot = async () => {
      try {
        // set stage 1 image on mount
        triedRef.current[1] = 0;
        setSrc(images[1][0]);
        setStage(1);

        const { data } = await supabase.auth.getSession();
        if (!alive) return;

        // Already authed → arrival → done
        if (data?.session) {
          goArrivalThenFinish();
        }
      } catch {
        // stay on stage 1
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

      // MUST come back to your app domain
      const redirectTo = `${origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo },
      });

      // signInWithOAuth should redirect away.
      // If it does not (error), restore stage 1.
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
    // Fallback to next candidate filename for the current stage
    const idx = triedRef.current[stage] ?? 0;
    const nextIdx = idx + 1;
    const list = images[stage] || [];
    if (nextIdx < list.length) {
      triedRef.current[stage] = nextIdx;
      setSrc(list[nextIdx]);
      return;
    }

    // If all fail, keep stage 1 with first candidate (avoids blank loop)
    triedRef.current[1] = 0;
    setStage(1);
    setBusy(false);
    setSrc(images[1][0]);
  };

  return (
    <div style={S.wrap} aria-label="Opening">
      <img
        src={src}
        alt=""
        draggable={false}
        style={S.bg}
        onError={onImgError}
      />

      {/* Stage 1: Sigil hotspot ONLY (no text). Always on top. */}
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
    pointerEvents: "none", // IMPORTANT: image can never steal the tap
  },

  // Invisible-but-clickable sigil zone
  // NOTE: moved lower than center to match "sigil at waist" doctrine.
  // Adjust top/size ONLY if needed.
  sigilBtn: {
    position: "absolute",
    left: "50%",
    top: "60%", // was 50% — moved down for waist placement
    width: "150px", // slightly larger for iPad tap reliability
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
