"use client";

import Input from "@/components/Input";
import loginAction from "@/app/(auth)/login/actions";
import { emailSchema } from "@/lib/validation";
import Form from "@/components/Form";

export default function LoginForm() {
  return (
    <Form
      formAction={loginAction}
      title="Welcome back"
      subTitle="Login to your account"
      buttonText="Login"
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
