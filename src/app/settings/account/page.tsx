"use client";

import changePassword from "@/app/settings/account/actions";
import Input from "@/app/(auth)/_components/Input";
import LogoutButton from "@/components/LogoutButton";
import { useActionState } from "react";
import SubmitButton from "@/app/(auth)/_components/SubmitButton";
import Form from "@/app/(auth)/_components/Form";
import useValidation from "@/app/(auth)/_useValidation";
import { changePasswordValidation } from "@/app/settings/account/_validationSchema";
import changePasswordAction from "@/app/settings/account/actions";

export default function SettingsAccount({ username }: { username: string }) {
  const { values, errors, handleChange, isValid, pendingField } = useValidation(
    changePasswordValidation
  );

  return (
    <div className="h-[calc(100vh-56px)] flex-2 p-16 grid gap-8">
      <h1 className="font-semibold text-3xl text-[#fafafa] mb-2">Account</h1>
      <p>
        Hello, <strong>{username}</strong>!
      </p>
      <Form
        formAction={changePasswordAction}
        subtitle="Input your new password"
        title="Change Password"
        styles="w-full px-16"
      >
        <Input
          label="New password"
          type="password"
          name="newPassword"
          placeholder="●●●●●●"
          value={values.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />
        <Input
          label="Confirm password"
          type="password"
          name="confirmPassword"
          placeholder="●●●●●●"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <SubmitButton disabled={!isValid} color="bg-[#383838] border-[#494949]">
          Change Password
        </SubmitButton>
      </Form>
      <LogoutButton />
    </div>
  );
}
