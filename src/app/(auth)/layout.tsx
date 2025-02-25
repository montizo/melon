import { getCurrentSession } from "@/lib/auth/session";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();

  return <main>{children}</main>;
}
