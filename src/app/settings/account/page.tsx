import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import SettingsAccount from "@/ui/settings/Account";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getCurrentSession();
  if (!session.userId) {
    redirect("/login");
  }
  const user = await getUserById(session.userId);
  if (!user) {
    redirect("/login");
  }
  if (!user.isVerified) {
    redirect("/verify-email");
  }

  return <SettingsAccount username={user.username} />;
}
