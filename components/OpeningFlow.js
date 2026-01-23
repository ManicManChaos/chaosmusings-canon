// components/OpeningFlow.js
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Simplified Opening Flow (TEMP LOCK FOR DELIVERY):
 * Stage 1: /flow/stage-1-opening.png (tap sigil)
 * Stage 2: /flow/stage-2-auth.png    (brief hold)
 * then onDone() -> hub
 *
 * No Supabase. No OAuth. No callback. No weave.
 */
export default function OpeningFlow({ onDone }) {
  const [stage, setStage] = useState(1); // 1 | 2
  const [busy, setBusy] = useState(false);
  const doneOnce = useRef(false);

  const finish = () => {
    if (doneOnce.current) return;
    doneOnce.current = true;
    onDone?.();
  };

  const go = () => {
    if (busy) return;
    setBusy(true);
    setStage(2);
    window.setTimeout(() => finish(), 650);
  };

  // Safety: if stage 2 image fails to load, still enter hub
  useEffect(() => {
    if (stage === 2) {
      const t = window.setTimeout(() => finish(), 1100);
      return () => window.clearTimeout(t);
    }
  }, [stage]);

  return (
    <div style={S.wrap} aria-label="Opening">
      <img
        src={stage === 1 ? "/flow/stage-1-opening.png" : "/flow/stage-2-auth.png"}
        alt=""
        draggable={false}
        style={S.bg}
        onError={() => {
          // If paths are wrong, do NOT trap you on opening.
          finish();
        }}
      />

      {/* Stage 1: sigil hotspot */}
      {stage === 1 ? (
        <button
          type="button"
          onClick={go}
          aria-label="Enter"
          style={S.sigilBtn}
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
  sigilBtn: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "170px",
    height: "170px",
    transform: "translate(-50%, -50%)",
    borderRadius: "999px",
    border: "0",
    background: "transparent",
    outline: "none",
    zIndex: 10,
  },
};
