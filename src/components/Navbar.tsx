import Link from "next/link";

export default function Navbar({ username }: { username: string | null }) {
  return (
    <nav>
      <Link href="/">Logo</Link>
      {username == null && (
        <div>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
      )}
      {typeof username == "string" && (
        <div>
          <Link href={`/profile/${username}`}>Profile</Link>
          <Link href="/settings">Settings</Link>
        </div>
      )}
    </nav>
  );
}
