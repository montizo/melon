import React, { startTransition } from "react";
import { useActionState } from "react";
import logoutAction from "@/app/settings/actions";

export default function LogoutButton() {
  const [_, action, isLoading] = useActionState(logoutAction, null);

  const handleLogout = async () => {
    startTransition(async () => {
      await action();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="cursor-pointer px-3 py-1 rounded-xl font-semibold bg-[#822929] border-[#9f3a3a] border-1 hocus:brightness-125 duration-300"
    >
      Logout
    </button>
  );
}
