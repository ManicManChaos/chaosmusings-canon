export const dynamic = "force-dynamic";

import CallbackClient from "./CallbackClient";

export default function CallbackPage({ searchParams }) {
  const code = searchParams?.code ?? null;
  const error = searchParams?.error ?? null;
  const error_description = searchParams?.error_description ?? null;

  return (
    <CallbackClient
      code={code}
      error={error}
      error_description={error_description}
    />
  );
}
