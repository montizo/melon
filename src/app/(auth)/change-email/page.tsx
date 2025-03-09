"use client";

import { emailSchema } from "@/lib/validation";
import { z } from "zod";
import useValidation from "../_useValidation";
import Input from "../_components/Input";
import Form from "../_components/Form";
import SubmitButton from "../_components/SubmitButton";
import Link from "next/link";
import FooterLink from "../_components/FooterLink";
import changeEmailAction from "./_actions";
import checkExists from "../_checkExists";

export default function LoginPage() {
  const { values, errors, handleChange, isValid } = useValidation(
    z.object({
      email: emailSchema,
    }),
    checkExists
  );

  return (
    <Form formAction={changeEmailAction} title="Change email" subtitle="">
      <Input
        label="New Email"
        type="text"
        name="email"
        placeholder="Enter your new email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <SubmitButton disabled={!isValid}>Update Email</SubmitButton>
      <FooterLink
        text="Don't have an account?"
        link={{ text: "Sign Up", link: "/sign-up" }}
      />
    </Form>
  );
}
