"use client";

import { useEffect, useState } from "react";
import forgotPasswordCodeAction from "./actions";
import { useRouter } from "next/navigation";

export default function ForgotPasswordCodePage({
  params,
}: {
  params: { code: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleForgotPassword() {
      try {
        await forgotPasswordCodeAction(params.code);
        router.push("/settings/account");
      } catch (err) {
        console.error("Error processing forgot password:", err);
        setError("Failed to process request.");
      } finally {
        setLoading(false);
      }
    }

    handleForgotPassword();
  }, [params.code, router]);

  if (loading) return <h1>Processing request...</h1>;
  if (error) return <h1>{error}</h1>;

  return <h1>Redirecting...</h1>;
}
