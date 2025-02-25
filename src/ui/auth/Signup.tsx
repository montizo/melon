"use client";

import Input from "@/components/Input";
import Link from "next/link";
import { useActionState } from "react";
import signupAction, {
  checkEmailNotTaken,
  checkUsernameNotTaken,
} from "@/app/(auth)/signup/actions";
import { emailSchema, passwordSchema, usernameShema } from "@/lib/validation";

export default function SignupForm() {
  const [state, action, isLoading] = useActionState(signupAction, null);

  return (
    <div>
      <h1>Signup</h1>
      <form action={action}>
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
        <button type="submit" disabled={isLoading}>
          Sign up
        </button>
      </form>
      <p>
        Have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
