"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [msg, setMsg] = useState("FINALIZING…");

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        const code = params.get("code");
        const error = params.get("error");
        const errorDesc = params.get("error_description");

        if (error) {
          throw new Error(errorDesc || error);
        }

        if (!code) {
          throw new Error("Missing OAuth code.");
        }

        // Supabase PKCE exchange (client-side)
        const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
        if (exErr) throw exErr;

        if (!alive) return;

        setMsg("WELCOME BACK…");
        // Return to your canon landing (adjust if you want a different hash)
        router.replace("/#today");
      } catch (e) {
        console.error("[auth/callback]", e);
        if (!alive) return;
        setMsg("AUTH FAILED. RETURNING…");
        setTimeout(() => router.replace("/"), 900);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [params, router]);

  // Keep it minimal; your OpeningBook handles visuals.
  return (
    <div style={{ padding: 18, fontFamily: "system-ui" }}>
      <div style={{ opacity: 0.8 }}>{msg}</div>
    </div>
  );
}
