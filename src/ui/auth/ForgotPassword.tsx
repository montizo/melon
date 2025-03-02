"use client";

import forgotPasswordAction from "@/app/(auth)/forgot-password/actions";
import { ActionResult } from "@/app/types";
import AuthForm from "@/components/AuthForm";
import { emailSchema } from "@/lib/validation";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <AuthForm
      title="Forgot Password"
      subTitle="Enter your email to reset your password."
      buttonText="Send Reset Link"
      buttonDisabled={isLoading}
      formAction={forgotPasswordAction}
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
