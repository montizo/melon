"use client";

import changePassword from "@/app/settings/actions";
import Input from "@/components/Input";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import { passwordSchema } from "@/lib/validation";
import { useActionState, useEffect, useState } from "react";

export default function Settings({ username }: { username: string }) {
  const [state, action, isLoading] = useActionState(changePassword, null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        setError("");
      } else {
        setError("Passwords do not match");
      }
    }
  }, [password, confirmPassword]);

  return (
    <div>
      <h1>Settings</h1>
      <p>
        Hello, <strong>{username}</strong>!
      </p>
      <hr />
      <h2>Change password</h2>
      <form action={action}>
        <Input
          label="New password"
          type="password"
          name="newpassword"
          placeholder="●●●●●●"
          validation={passwordSchema}
          onAction={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Input
          label="Confirm password"
          type="password"
          name="confirmpassword"
          placeholder="●●●●●●"
          validation={passwordSchema}
          onAction={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        {error && <p>{error}</p>}
        <button type="submit" disabled={isLoading}>
          Change password
        </button>
      </form>
      <hr />
      <LogoutButton />
    </div>
  );
}
