// app/auth/callback/page.js
"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function CallbackInner() {
  const params = useSearchParams();
  const router = useRouter();

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

        if (!alive) return;

        // Return to app landing (Daily Hub)
        router.replace("/#today");
      } catch (e) {
        console.error("[auth/callback]", e);
        if (!alive) return;

        // Fail safe back to home
        router.replace("/");
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [params, router]);

  return null;
}

export default function CallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackInner />
    </Suspense>
  );
}
