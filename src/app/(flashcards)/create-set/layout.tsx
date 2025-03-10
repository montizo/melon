import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();
  if (!session.userId) {
    redirect("/login");
  }

  return <>{children}</>;
}
