import { getCurrentSession } from "@/lib/auth/session";
import LoginForm from "@/ui/auth/Login";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session.userId) {
    redirect("/");
  }

  return <LoginForm />;
}
