"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CallbackClient({ code, error, error_description }) {
  const router = useRouter();
  const [msg, setMsg] = useState("FINALIZING…");

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        if (error) {
          throw new Error(error_description || error);
        }

        if (!code) {
          throw new Error("Missing OAuth code.");
        }

        const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
        if (exErr) throw exErr;

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
  }, [code, error, error_description, router]);

  return (
    <div style={{ padding: 18, fontFamily: "system-ui", opacity: 0.8 }}>
      {msg}
    </div>
  );
}
