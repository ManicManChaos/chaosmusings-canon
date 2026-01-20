// app/page.js
"use client";

import { useState } from "react";
import OpeningFlow from "@/components/OpeningFlow";
import AppShell from "@/components/AppShell";

export default function Page() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      {!unlocked ? (
        <OpeningFlow onDone={() => setUnlocked(true)} />
      ) : (
        <AppShell />
      )}
    </>
  );
}
