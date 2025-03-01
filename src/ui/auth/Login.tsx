"use client";

import { motion } from "framer-motion";
import Input from "@/components/Input";
import Link from "next/link";
import { useActionState } from "react";
import loginAction from "@/app/(auth)/login/actions";
import { emailSchema } from "@/lib/validation";

export default function LoginForm() {
  const [state, action, isLoading] = useActionState(loginAction, null);

  return (
    <div className="bg-[#181818] border-[1.5px] border-[#222222] p-8 rounded-2xl w-full max-w-md grid gap-8">
      <div className="grid gap1">
        <h2 className="font-semibold text-3xl text-[#fafafa]">Welcome back</h2>
        <p>Login to your account</p>
      </div>
      <form action={action} className="grid gap-4">
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
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="cursor-pointer px-3 py-1 rounded-md font-semibold bg-[#822929] border-[#9f3a3a] border-1 hocus:brightness-125 duration-300"
        >
          Login
        </motion.button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link href="/signup" className="text-[#df3f3f] hocus:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
