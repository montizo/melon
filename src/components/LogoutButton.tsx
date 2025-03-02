import React, { startTransition } from "react";
import { useActionState } from "react";
import logoutAction from "@/app/settings/actions";

export default function LogoutButton() {
  const [state, action, isLoading] = useActionState(logoutAction, null);

  const handleLogout = async () => {
    startTransition(async () => {
      await action();
    });
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      Logout
    </button>
  );
}
