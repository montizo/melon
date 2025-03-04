"use client";

import forgotPasswordAction from "@/app/(auth)/forgot-password/actions";
import { ActionResult } from "@/app/types";
import AuthForm from "@/components/AuthForm";
import { emailSchema } from "@/lib/validation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasSent, setHasSent] = useState<boolean>(false);

  useEffect(() => {
    if (hasSent) {
      setIsLoading(false);
    }
  }, [hasSent]);

  const handleSubmit = async (
    event: React.FormEvent,
    formData: FormData
  ): Promise<ActionResult> => {
    setIsLoading(true);
    setError("");

    try {
      const result: ActionResult = await forgotPasswordAction(null, formData);
      setHasSent(true);

      if (result.success) {
        setIsLoading(false);
      } else {
        setError(result.message || "Something went wrong.");
        setIsLoading(false);
      }

      return result;
    } catch (err) {
      setError("An error occurred, please try again.");
      setIsLoading(false);
      return {
        success: false,
        message: "An error occurred, please try again.",
      };
    }
  };

  if (hasSent) {
    return (
      <div className="bg-[#1f1f1f] border-[1.5px] border-[#2e2e2e] p-8 rounded-2xl w-full max-w-md grid gap-2">
        <h1 className="text-2xl text-white font-semibold">
          Forgot password reset email sent!
        </h1>
        <p>
          Email not in your inbox?{" "}
          <Link
            href="/forgot-password"
            className="text-[#df3f3f] hocus:underline"
          >
            Retry
          </Link>
        </p>
      </div>
    );
  }

  return (
    <AuthForm
      title="Forgot Password"
      subTitle="Enter your email to reset your password."
      buttonText="Send Reset Link"
      buttonDisabled={isLoading}
      formAction={handleSubmit}
      fields={[
        {
          label: "Email",
          type: "email",
          name: "email",
          placeholder: "Enter your email",
          setExternalUseState: setEmail,
          validation: emailSchema,
        },
      ]}
      footer={{
        text: "Remember your password?",
        linkText: "Log in",
        linkTo: "/auth/login",
      }}
    />
  );
}
