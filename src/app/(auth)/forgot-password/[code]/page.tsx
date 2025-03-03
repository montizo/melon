import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import ForgotPassword from "@/ui/auth/ForgotPassword";
import { redirect } from "next/navigation";

export default async function ForgotPasswordCodePage() {
  const session = await getCurrentSession();
  if (session.userId) {
    const user = await getUserById(session.userId);

    if (user?.isVerified) {
      redirect("/");
    } else {
      redirect("/verify-email");
    }
  }

  return <ForgotPassword />;
}
