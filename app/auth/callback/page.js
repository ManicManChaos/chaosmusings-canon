"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function CallbackInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [msg, setMsg] = useState("FINALIZING…");

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        const code = params.get("code");
        const error = params.get("error");
        const errorDesc = params.get("error_description");

        if (error) throw new Error(errorDesc || error);
        if (!code) throw new Error("Missing OAuth code.");

        const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
        if (exErr) throw exErr;

        // mark arrival for OpeningBook state-3
        try {
          localStorage.setItem("mmoc_gate_state", "arrival");
        } catch {}

        if (!alive) return;
        setMsg("WELCOME BACK…");
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

  return (
    <div className="callbackFrame">
      <div className="callbackMsg">{msg}</div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackInner />
    </Suspense>
  );
}