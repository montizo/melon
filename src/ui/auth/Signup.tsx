"use client";

import Input from "@/components/Input";
import signupAction, {
  checkEmailNotTaken,
  checkUsernameNotTaken,
} from "@/app/(auth)/signup/actions";
import { emailSchema, passwordSchema, usernameShema } from "@/lib/validation";
import Form from "@/components/Form";

export default function SignupForm() {
  return (
    <Form
      formAction={signupAction}
      title="Welcome to App"
      subTitle="Create a new account"
      buttonText="Signup"
      footer={{
        text: "Have an account?",
        linkText: "Login",
        linkTo: "/login",
      }}
    >
      <Input
        label="Username"
        type="text"
        name="username"
        validation={usernameShema}
        checkExists={checkUsernameNotTaken}
      />
      <Input
        label="Email"
        type="text"
        name="email"
        placeholder="you@domain.xyz"
        validation={emailSchema}
        checkExists={checkEmailNotTaken}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="●●●●●●"
        validation={passwordSchema}
      />
    </Form>
  );
}
