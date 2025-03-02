"use client";

import changePassword from "@/app/settings/account/actions";
import Error from "@/components/Error";
import Form from "@/components/Form";
import Input from "@/components/Input";
import LogoutButton from "@/components/LogoutButton";
import { passwordSchema } from "@/lib/validation";
import { useActionState, useState, useEffect } from "react";

export default function SettingsAccount({ username }: { username: string }) {
  const [state, action, isLoading] = useActionState(changePassword, null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [hasErrors, setHasErrors] = useState(true);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };

  useEffect(() => {
    if (
      passwordSchema.safeParse(password).success &&
      password === confirmPassword
    ) {
      setHasErrors(false);
      setError("");
    } else {
      setHasErrors(true);
      if (password !== confirmPassword) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  }, [password, confirmPassword]);

  return (
    <div className="h-[calc(100vh-56px)] flex-2 p-16">
      <h1 className="font-semibold text-3xl text-[#fafafa] mb-2">Account</h1>
      <p>
        Hello, <strong>{username}</strong>!
      </p>
      <Form
        formAction={action}
        title="Change Password"
        buttonText="Change Password"
        width="auto"
        buttonDisabled={hasErrors || isLoading}
      >
        <Input
          label="New password"
          type="password"
          name="newpassword"
          placeholder="●●●●●●"
          validation={passwordSchema}
          setExternalUseState={handlePasswordChange}
          sideways={true}
        />
        <Input
          label="Confirm password"
          type="password"
          name="confirmpassword"
          placeholder="●●●●●●"
          validation={passwordSchema}
          setExternalUseState={handleConfirmPasswordChange}
          sideways={true}
        />
        <Error error={error} showError={true} />
      </Form>
      <LogoutButton />
    </div>
  );
}
