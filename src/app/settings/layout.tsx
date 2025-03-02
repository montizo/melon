import Sidebar from "@/components/Sidebar";

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center h-full">
      <main className="h-full w-full flex-center">
        <Sidebar />
        {children}
      </main>
    </div>
  );
}
