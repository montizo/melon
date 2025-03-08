"use client";

import { use, useEffect, useState } from "react";
import forgotPasswordCodeAction from "./_actions";
import { useRouter } from "next/navigation";

export default function ForgotPasswordCodePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const unwrappedParams = use(params) as { code: string };

  useEffect(() => {
    async function handleForgotPassword() {
      if (!unwrappedParams?.code) {
        setError("Invalid code.");
        setLoading(false);
        return;
      }

      try {
        await forgotPasswordCodeAction(unwrappedParams.code);
        router.push("/settings/account");
      } catch (err) {
        console.error("Error processing forgot password:", err);
        setError("Failed to process request.");
      } finally {
        setLoading(false);
      }
    }

    handleForgotPassword();
  }, [unwrappedParams?.code, router]);

  if (loading) return <h1>Processing request...</h1>;
  if (error) return <h1>{error}</h1>;

  return <h1>Redirecting...</h1>;
}
