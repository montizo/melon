"use client";

import Input from "@/components/Input";
import Link from "next/link";
import { useActionState } from "react";
import signupAction from "./actions";

export default function Signup() {
  const [state, action, isLoading] = useActionState(signupAction, null);

  return (
    <div>
      <h1>Signup</h1>
      <form action={action}>
        <Input label="Username" type="text" name="username" placeholder="" />
        <Input
          label="Email"
          type="text"
          name="email"
          placeholder="you@domain.xyz"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="●●●●●●"
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
