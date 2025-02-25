import Link from "next/link";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Link href="/">Home</Link>
      {children}
    </main>
  );
}
