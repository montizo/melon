"use client";

import { useEffect, useState } from "react";
import forgotPasswordCodeAction from "@/app/(auth)/forgot-password/[code]/_actions";
import { useRouter } from "next/navigation";

export default function ForgotPasswordCodePage({
  params,
}: {
  params: { code: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invalidCode, setInvalidCode] = useState(false);

  const { code } = params;

  useEffect(() => {
    async function handleForgotPassword() {
      try {
        const result = await forgotPasswordCodeAction(code);
        if (result?.success) {
          router.push("/settings/account");
        } else {
          setInvalidCode(true);
        }
      } catch (err) {
        console.error("Error processing forgot password:", err);
        setError("Failed to process request.");
      } finally {
        setLoading(false);
      }
    }

    handleForgotPassword();
  }, [code, router]);

  if (loading) return <h1>Processing request...</h1>;
  if (error) return <h1>{error}</h1>;
  if (invalidCode) return <h1>Invalid code</h1>;

  return <h1>Redirecting...</h1>;
}
