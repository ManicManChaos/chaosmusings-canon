"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import OpeningBook from "@/components/OpeningBook";
import { supabase } from "@/lib/supabaseClient";

export default function AuthGate() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setSession(data?.session ?? null);
      setReady(true);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession ?? null);
      setReady(true);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  // Prevent the “corner layout” flash while auth resolves
  if (!ready) return null;

  // Not logged in → show your opening gate
  if (!session) return <OpeningBook />;

  // Logged in → show the real app
  return <AppShell />;
}
