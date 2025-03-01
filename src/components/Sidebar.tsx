import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="border-r-[1.5px] border-r-[#2e2e2e] p-8 h-[calc(100vh-56px)] w-64 grid gap-8">
      <ul className="flex flex-col gap-2">
        <li>
          <Link href="/settings/account">Account</Link>
        </li>
      </ul>
    </aside>
  );
}
