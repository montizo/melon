import { getCurrentSession } from "@/lib/auth/session";
import LoginForm from "@/ui/auth/Login";
import { checkRateLimit } from "@/utils/checkRateLimit";
import rateLimit from "@/utils/rateLimit";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { isRateLimited, message } = await checkRateLimit("GET", 100, 60);

  if (isRateLimited) {
    return <h1>{message}</h1>;
  }

  const session = await getCurrentSession();
  if (session.userId) {
    redirect("/");
  }

  return <LoginForm />;
}
