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
  const [isPending, setIsPending] = useState(false); // To track loading state
  const [error, setError] = useState<string | null>(null); // To track any errors

  const handleBlur = async () => {
    if (!bio) return; // Optional: Don't update if bio is empty.

    setIsPending(true); // Set loading state before updating
    setError(null); // Reset any previous errors

    try {
      // Call the server action to update the bio
      const result: ActionResult = await setProfileBio(profile.username, bio);

      // You may want to handle the result to confirm success
      if (result.success) {
        console.log("Bio updated successfully");
      } else {
        // Handle any specific error returned by the action
        setError("Failed to update bio.");
      }
    } catch (err) {
      setError("An error occurred while updating bio.");
      console.error(err);
    } finally {
      setIsPending(false); // Reset loading state
    }
  };

  return (
    <div>
      <h2>{profile.username}</h2>
      <p>Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
      <hr />
      <h4>Bio</h4>
      <form>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          onBlur={handleBlur}
          disabled={!ownProfile}
        />
      </form>
      {/* {isPending && <p>Updating bio...</p>}{" "} */}
    </div>
  );
}
