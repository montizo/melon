import { getProfileAction } from "@/app/profile/[username]/actions";
import Profile from "@/ui/Profile";
export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  console.log(username);
  const profileResult = await getProfileAction(username);

  if ("success" in profileResult && !profileResult.success) {
    return <div>{profileResult.message}</div>;
  }

  if ("username" in profileResult) {
    return <Profile profile={profileResult} />;
  }

  return <div>Profile not found</div>;
}
