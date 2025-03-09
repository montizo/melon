"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ username }: { username: string | null }) {
  const pathName = usePathname();

  if (
    pathName == "/login" ||
    pathName == "/signup" ||
    pathName == "/verify-email" ||
    pathName == "/forgot-password"
  ) {
    return (
      <header className="absolute flex-center h-14">
        <nav className="flex-between w-full max-w-[1024px] mx-8">
          <Link
            href="/"
            className="font-bold text-lg hocus:text-white duration-300"
          >
            Logo
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="flex-center bg-[#171717] border-b-[1.5px] border-b-[#2e2e2e] h-14 fixed w-full">
      <nav className="flex-between w-full max-w-6xl m-x-4 mx-8">
        <Link
          href="/"
          className="font-bold text-lg hocus:text-white duration-300"
        >
          Logo
        </Link>
        {username == null && (
          <div className="flex-center gap-x-2">
            <Link
              href="/login"
              className="cursor-pointer px-3 py-1 rounded-xl bg-[#2d2d2d] border-[#3a3a3a] border-[1.5px] hocus:brightness-125 duration-300"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="cursor-pointer px-3 py-1 rounded-xl bg-[#822929] border-[#9f3a3a] border-[1.5px] hocus:brightness-125 duration-300"
            >
              Signup
            </Link>
          </div>
        )}
        {typeof username == "string" && (
          <div className="flex gap-2">
            <Link
              href={`/users/${username}`}
              className="hocus:brightness-125 duration-300"
            >
              Profile
            </Link>
            <Link
              href="/settings/account"
              className="hocus:brightness-125 duration-300"
            >
              Settings
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
