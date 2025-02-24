"use client";

import Input from "@/components/Input";
import Link from "next/link";

export default function Signup() {
  return (
    <div>
      <h1>Signup</h1>
      <form action={""}>
        <Input label="Username" type="text" name="username" placeholder="" />
        <Input
          label="Email"
          type="text"
          name="text"
          placeholder="you@domain.xyz"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="●●●●●●"
        />
        <button type="submit">Sign up</button>
      </form>
      <p>
        Have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
