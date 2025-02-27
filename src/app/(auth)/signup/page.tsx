import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import SignupForm from "@/ui/auth/Signup";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import rateLimit from "@/utils/rateLimit";
import { checkRateLimit } from "@/utils/checkRateLimit";

export default async function SignupPage() {
  const { isRateLimited, message } = await checkRateLimit("GET", 100, 60);

  if (isRateLimited) {
    return <h1>{message}</h1>;
  }

  const session = await getCurrentSession();

  if (session.userId) {
    const user = await getUserById(session.userId);

    if (user?.isVerified) {
      redirect("/");
    } else {
      redirect("/verify-email");
    }
  }

  return <SignupForm />;
}
