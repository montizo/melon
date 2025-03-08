"use client";

import signupAction, {
  checkEmailNotTaken,
  checkUsernameNotTaken,
} from "@/app/(auth)/signup/actions";
import { emailSchema, passwordSchema, usernameSchema } from "@/lib/validation";
import AuthForm from "@/components/AuthForm";
import { useState } from "react";
import { useValidation } from "@/hooks/useValidation";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasErrors = useValidation([
    {
      value: username,
      schema: usernameSchema,
      checkExists: checkUsernameNotTaken,
    },
    { value: email, schema: emailSchema, checkExists: checkEmailNotTaken },
    { value: password, schema: passwordSchema },
  ]);

  console.log(hasErrors);

  return (
    <AuthForm
      formAction={signupAction}
      title="Welcome to App"
      subTitle="Create a new account"
      buttonText="Signup"
      buttonDisabled={hasErrors}
      fields={[
        {
          label: "Username",
          type: "text",
          name: "username",
          validation: usernameSchema,
          checkExists: checkUsernameNotTaken,
          setExternalUseState: setUsername,
        },
        {
          label: "Email",
          type: "text",
          name: "email",
          validation: emailSchema,
          checkExists: checkEmailNotTaken,
          setExternalUseState: setEmail,
        },
        {
          label: "Password",
          type: "password",
          name: "password",
          validation: passwordSchema,
          setExternalUseState: setPassword,
        },
      ]}
      footer={{ text: "Have an account?", linkText: "Login", linkTo: "/login" }}
    />
  );
}
