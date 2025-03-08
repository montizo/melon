"use client";

import { emailSchema } from "@/lib/validation";
import { z } from "zod";
import useValidation from "../_useValidation";
import Input from "../_components/Input";
import loginAction from "./_actions";
import Form from "../_components/Form";
import SubmitButton from "../_components/SubmitButton";
import Link from "next/link";

export default async function LoginPage() {
  const { values, errors, handleChange, isValid, pendingField } = useValidation(
    z.object({
      email: emailSchema,
    })
  );

  return (
    <Form
      formAction={loginAction}
      title="Welcome to app"
      subtitle="Create a new account"
    >
      <Input
        label="Email"
        type="text"
        name="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <div className="relative">
        <Link
          href="/forgot-password"
          className="absolute right-0 text-sm hocus:underline"
        >
          Forgot password?
        </Link>
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
      </div>
      <SubmitButton disabled={!isValid || pendingField == null}>
        Login
      </SubmitButton>
    </Form>
  );
}
