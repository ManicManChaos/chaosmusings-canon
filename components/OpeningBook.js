"use client";

import { useEffect, useMemo, useState } from "react";
import Weave from "./Weave";

const STAGES = [
  { id: 1, src: "/flow/flow-1.png" }, // eyes closed (sigil at waist)
  { id: 2, src: "/flow/flow-2.png" }, // github login stage
  { id: 3, src: "/flow/flow-3.png" }  // final breathe → app
];

export default function OpeningBook({ onDone }) {
  const [stage, setStage] = useState(1);
  const [weaving, setWeaving] = useState(false);

  const current = useMemo(() => STAGES.find((s) => s.id === stage), [stage]);

  // If user returns from OAuth and lands on /#access_token... or /#today, skip to app.
  useEffect(() => {
    const h = (typeof window !== "undefined" ? window.location.hash : "") || "";
    if (h.includes("access_token") || h.includes("refresh_token") || h.includes("#today")) {
      onDone?.();
    }
  }, [onDone]);

  const go = (next) => {
    setWeaving(true);
    setTimeout(() => {
      setStage(next);
      setWeaving(false);
    }, 520);
  };

  const onPrimary = () => {
    // 1 -> 2 (your GitHub auth is already wired via Supabase on the button in stage 2)
    if (stage === 1) return go(2);

    // 2 -> 3 (post-auth, user will come back; but allow manual continue as well)
    if (stage === 2) return go(3);

    // 3 -> app
    if (stage === 3) return onDone?.();
  };

  return (
    <div className="openingRoot">
      <div className="openingStage">
        {STAGES.map((s) => (
          <img
            key={s.id}
            className={`openingImg ${s.id === stage ? "isOn" : ""}`}
            src={s.src}
            alt=""
            draggable={false}
          />
        ))}

        <button
          className="sigilBtn"
          type="button"
          onClick={onPrimary}
          aria-label="Continue"
        >
          <span className="sigilRing" />
          <span className="sigilCore" />
        </button>
      </div>

      <Weave show={weaving} />
    </div>
  );
}
