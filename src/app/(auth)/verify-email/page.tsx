import { getCurrentSession } from "@/lib/auth/session";
import VerifyEmail from "@/ui/auth/VerifyEmail";
import { checkRateLimit } from "@/utils/checkRateLimit";

export default async function VerifyEmailPage() {
  const { isRateLimited, message } = await checkRateLimit("GET", 100, 60);

  if (isRateLimited) {
    return <h1>{message}</h1>;
  }

  const session = await getCurrentSession();
  if (!session.userId) {
    // redirect("/signup");
  }

  // const user = await getUserById(session.userId);
  // if (user?.isVerified) {
  //   redirect("/");
  // }

  return <VerifyEmail />;
}
