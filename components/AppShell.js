"use client";

import { useEffect, useState } from "react";
import OpeningBook from "./OpeningBook";
import AssessmentView from "./AssessmentView";
import { supabase } from "../lib/supabaseClient";

export default function AppShell() {
  const [ready, setReady] = useState(false);

  // If already logged in, skip gate.
  useEffect(() => {
    let alive = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!alive) return;
      setReady(!!data?.session);
    };

    check();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!alive) return;
      setReady(!!session);
    });

    return () => {
      alive = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  // Not authenticated: show OpeningBook (sigil triggers OAuth)
  if (!ready) return <OpeningBook />;

  // Authenticated: show the canon Assessment (Daily Hub text is NOT used)
  return <AssessmentView />;
}
