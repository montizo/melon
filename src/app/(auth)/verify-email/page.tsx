import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import VerifyEmail from "@/ui/auth/VerifyEmail";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage() {
  const session = await getCurrentSession();
  if (session.userId) {
    redirect("/");
  }

  if (!session.userId) {
    return;
  }

  const user = await getUserById(session.userId);
  if (user?.isVerified) {
    redirect("/");
  }

  return <VerifyEmail />;
}
