import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import Settings from "@/ui/Settings";
import { checkRateLimit } from "@/utils/checkRateLimit";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { isRateLimited, message } = await checkRateLimit("GET", 100, 60);

  if (isRateLimited) {
    return <h1>{message}</h1>;
  }

  const session = await getCurrentSession();
  if (!session.userId) {
    redirect("/login");
  }
  const user = await getUserById(session.userId);
  if (!user) {
    redirect("/login");
  }
  // if (!user.isVerified) {
  //   redirect("/verify-email");
  // }

  return <Settings username={user.username} />;
}
