import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getCurrentSession();
  if (!session.userId) {
    redirect("/login");
  }
  const user = await getUserById(session.userId);
  if (!user) {
    redirect("/login");
  }
  if (!user.isVerified) {
    redirect("/verify-email");
  }

  return <>{children}</>;
}
