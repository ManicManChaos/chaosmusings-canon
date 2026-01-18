"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function CallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const exchangeCode = async () => {
      const code = searchParams.get("code");
      if (!code) return;

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      // Regardless of success or failure, return to app shell
      router.replace("/");
    };

    exchangeCode();
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
