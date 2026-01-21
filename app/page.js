// app/page.js
"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import OpeningFlow from "@/components/OpeningFlow";

export default function Page() {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return <OpeningFlow onDone={() => setReady(true)} />;
  }

  return <AppShell />;
}
