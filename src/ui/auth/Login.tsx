"use client";

import loginAction from "@/app/(auth)/login/actions";
import { emailSchema } from "@/lib/validation";
import AuthForm from "@/components/AuthForm";
import { useState } from "react";
import { useValidation } from "@/hooks/useValidation";

export default function LoginForm() {
  const [email, setEmail] = useState("");

  const hasErrors = useValidation([{ value: email, schema: emailSchema }]);

  return (
    <AuthForm
      formAction={loginAction}
      title="Welcome back"
      subTitle="Login to your account"
      buttonText="Login"
      buttonDisabled={hasErrors}
      fields={[
        {
          label: "Email",
          type: "text",
          name: "email",
          validation: emailSchema,
          setExternalUseState: setEmail,
        },
        { label: "Password", type: "password", name: "password" },
      ]}
      footer={{
        text: "Don't have an account?",
        linkText: "Sign Up",
        linkTo: "/signup",
      }}
    />
  );
}
