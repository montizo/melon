"use client";

import { ActionResult } from "@/app/types";
import { setProfileBio } from "@/app/users/[username]/actions";
import { useActionState, useState } from "react";
import Navbar from "@/components/Navbar";

type ProfileProps = {
  profile: {
    username: string;
    email: string;
    isVerified: boolean;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  ownProfile: boolean;
};

export default function Profile({ profile, ownProfile }: ProfileProps) {
  if (!profile) {
    return <div>Profile not found.</div>;
  }

  const [bio, setBio] = useState(profile.bio);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBlur = async () => {
    if (!bio) return;

    setIsPending(true);
    setError(null);

    try {
      const result: ActionResult = await setProfileBio(profile.username, bio);

      if (result.success) {
        console.log("Bio updated successfully");
      } else {
        setError("Failed to update bio.");
      }
    } catch (err) {
      setError("An error occurred while updating bio.");
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <h2>{profile.username}</h2>
      <p>Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
      <hr />
      <p className="text-sm font-semibold">Bio</p>
      <form>
        <textarea
          // cols={40}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          onBlur={handleBlur}
          disabled={!ownProfile}
          className="h-64 w-full px-3 py-1 border-[1.5px] text-[#fafafa] outline-none focus:ring-3 ring-[#242424] rounded-md duration-200 bg-[#242424] border-[#2e2e2e] placeholder-[#4d4d4d] focus:border-[#444444] resize-none"
        />
      </form>
      {isPending && <p className="text-green-400">Updating bio...</p>}{" "}
    </div>
  );
}
