export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-[calc(100vh-56px)] w-full flex-center">{children}</main>
  );
}
