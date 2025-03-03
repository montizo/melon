import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import LoginForm from "@/ui/auth/Login";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session.userId) {
    const user = await getUserById(session.userId);

    if (user?.isVerified) {
      redirect("/");
    } else {
      redirect("/verify-email");
    }
  }

  return <LoginForm />;
}
