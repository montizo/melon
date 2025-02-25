import { getCurrentSession } from "@/lib/auth/session";
import SignupForm from "@/ui/auth/Signup";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await getCurrentSession();
  if (session.userId) {
    redirect("/");
  }

  return <SignupForm />;
}
