"use client";

import Input from "@/components/Input";
import Link from "next/link";
import { useActionState } from "react";
import loginAction from "@/app/(auth)/login/actions";
import { emailSchema } from "@/lib/validation";

export default function LoginForm() {
  const [state, action, isLoading] = useActionState(loginAction, null);

  return (
    <div>
      <h1>Login</h1>
      <form action={action}>
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
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
