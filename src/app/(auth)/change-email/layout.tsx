import { getCurrentSession } from "@/lib/session";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function ChangeEmailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();
  if (session.userId) {
    const user = await getUser({ id: session.userId });
    if (user?.isVerified) redirect("/");
  }

  return <>{children}</>;
}
