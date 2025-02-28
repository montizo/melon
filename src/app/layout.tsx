import { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { checkRateLimit } from "@/utils/checkRateLimit";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isRateLimited, message } = await checkRateLimit("GET", 100, 60);
  if (isRateLimited) {
    return <h1>{message}</h1>;
  }

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}
