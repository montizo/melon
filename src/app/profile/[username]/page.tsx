import { getProfileAction } from "@/app/profile/[username]/actions";
import { getCurrentSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/auth/user";
import Profile from "@/ui/Profile";
export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const session = await getCurrentSession();
  const user = session.userId ? await getUserById(session.userId) : null;

  const ownProfile = username == user?.username;

  const profileResult = await getProfileAction(username);

  if ("success" in profileResult && !profileResult.success) {
    return <div>{profileResult.message}</div>;
  }

  if ("username" in profileResult) {
    return (
      <Profile
        profile={{ ...profileResult, bio: profileResult.bio ?? "" }}
        ownProfile={ownProfile}
      />
    );
  }

  return <div>Profile not found</div>;
}
