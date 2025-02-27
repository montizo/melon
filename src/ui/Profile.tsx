"use client";

import { useParams } from "next/navigation";

export default function Profile() {
  const { username } = useParams();

  return (
    <div>
      <h2>{username}</h2>
    </div>
  );
}
