"use client";

import changePassword from "@/app/settings/account/actions";
import Error from "@/components/Error";
import Form from "@/components/Form";
import Input from "@/components/Input";
import LogoutButton from "@/components/LogoutButton";
import { passwordSchema } from "@/lib/validation";
import { useActionState, useState, useEffect } from "react";
import { useValidation } from "@/hooks/useValidation"; // Import custom hook

export default function SettingsAccount({ username }: { username: string }) {
  const [state, action, isLoading] = useActionState(changePassword, null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const fields = [
    { value: password, schema: passwordSchema },
    { value: confirmPassword, schema: passwordSchema },
  ];

  const hasErrors = useValidation(fields);

  const handlePasswordChange = (value: string) => setPassword(value);
  const handleConfirmPasswordChange = (value: string) =>
    setConfirmPassword(value);

  useEffect(() => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("newpassword", password);
    formData.append("confirmpassword", confirmPassword);

    await action(formData);
  };

  return (
    <div className="h-[calc(100vh-56px)] flex-2 p-16">
      <h1 className="font-semibold text-3xl text-[#fafafa] mb-2">Account</h1>
      <p>
        Hello, <strong>{username}</strong>!
      </p>
      <Form
        formAction={handleSubmit}
        title="Change Password"
        buttonText="Change Password"
        buttonStyles="bg-[#2d2d2d] border-[#3a3a3a]"
        width="auto"
        buttonDisabled={hasErrors || isLoading || !!error}
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
