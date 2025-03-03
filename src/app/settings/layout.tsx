import Sidebar from "@/components/Sidebar";
import { getCurrentSession } from "@/lib/auth/session";
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

  return (
    <div className="flex justify-center h-full">
      <main className="h-full w-full flex-center">
        <Sidebar />
        {children}
      </main>
    </div>
  );
}
