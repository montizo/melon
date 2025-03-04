import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import VerifyEmail from "@/ui/auth/VerifyEmail";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage() {
  const session = await getCurrentSession();
  if (session.userId) {
    const user = await getUserById(session.userId);

    if (user?.isVerified) {
      redirect("/");
    }
  }

  return <VerifyEmail />;
}
