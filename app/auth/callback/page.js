"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function CallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      // Supabase OAuth returns either `code` (PKCE) or sometimes tokens depending on flow.
      const code = searchParams.get("code");

      try {
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        } else {
          // If there is no code, we still bounce home (prevents dead-end screens)
          // Session may already be established via cookies.
        }
      } finally {
        router.replace("/");
      }
    };

    run();
  }, [searchParams, router]);

  return null;
}

export default function CallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackInner />
    </Suspense>
  );
}
