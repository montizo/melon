import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import Link from "next/link";

export default async function Home() {
  const session = await getCurrentSession();
  if (!session.userId) {
    return (
      <div>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
        </ul>
        <h1>Hello, guest</h1>
      </div>
    );
  }
  const user = await getUserById(session.userId);

  return (
    <div>
      <ul>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
      <h1>Hello, {user?.username}!</h1>
    </div>
  );
}
