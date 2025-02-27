type ProfileProps = {
  profile: {
    username: string;
    email: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

export default function Profile({ profile }: ProfileProps) {
  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div>
      <h2>{profile.username}</h2>
      <p>Email: {profile.email}</p>
      <p>Verified: {profile.isVerified ? "Yes" : "No"}</p>
      <p>Created At: {new Date(profile.createdAt).toLocaleDateString()}</p>
      <p>Last Updated: {new Date(profile.updatedAt).toLocaleDateString()}</p>
    </div>
  );
}
