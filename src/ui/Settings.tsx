"use client";

import Input from "@/components/Input";
import { passwordSchema } from "@/lib/validation";

export default function Settings({ username }: { username: string }) {
  return (
    <div>
      <h1>Settings</h1>
      <p>
        Hello, <strong>{username}</strong>!
      </p>
      <hr />
      <h2>Change password</h2>
      <Input
        label="New password"
        type="password"
        name="newpassword"
        placeholder="●●●●●●"
        validation={passwordSchema}
      />
      <Input
        label="New password again"
        type="password"
        name="newpasswordagain"
        placeholder="●●●●●●"
        validation={passwordSchema}
      />
    </div>
  );
}
