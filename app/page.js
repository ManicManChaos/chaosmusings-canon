"use client";

import { useState } from "react";
import OpeningFlow from "@/components/OpeningFlow";
import AppShell from "@/components/AppShell";

export default function Page() {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return <OpeningFlow onDone={() => setReady(true)} />;
  }

  return <AppShell />;
}
