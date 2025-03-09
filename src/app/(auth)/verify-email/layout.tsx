import { getCurrentSession } from "@/lib/auth/session";
import { getUser } from "@/lib/auth/user";
import { redirect } from "next/navigation";

export default async function VerifyEmailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();
  if (session.userId) {
    const user = await getUser({ id: session.userId });
    if (user?.isVerified) redirect("/");
  } else {
    redirect("/login");
  }

  return <>{children}</>;
}
