import Navbar from "@/components/Navbar";
import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";

export default async function Home() {
  const session = await getCurrentSession();

  if (!session.userId) {
    return (
      <div>
        <Navbar username={null} />
        <h1>Hello, guest!</h1>
      </div>
    );
  }

  const user = await getUserById(session.userId);

  return (
    <div>
      <Navbar username={user?.username || null} />
      <h1>Hello, {user?.username ?? "guest"}!</h1>
    </div>
  );
}
