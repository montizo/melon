"use client";

import Input from "@/components/Input";
import loginAction from "@/app/(auth)/login/actions";
import { emailSchema } from "@/lib/validation";
import Form from "@/components/Form";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    if (emailSchema.safeParse(email).success === true) {
      setHasErrors(false);
    } else {
      setHasErrors(true);
      return;
    }
  }, [email]);

  return (
    <Form
      formAction={loginAction}
      title="Welcome back"
      subTitle="Login to your account"
      buttonText="Login"
      buttonDisabled={hasErrors}
      buttonStyles="bg-[#822929] border-[#9f3a3a]"
      footer={{
        text: "Don't have an account?",
        linkText: "Sign Up",
        linkTo: "/signup",
      }}
    >
      <Input
        label="Email"
        type="text"
        name="email"
        placeholder="you@domain.xyz"
        validation={emailSchema}
        setExternalUseState={(value) => setEmail(value)}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="●●●●●●"
      />
    </Form>
  );
}
