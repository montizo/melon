"use server";

import { Card } from "@/lib/flashcards/card";
import { getCurrentSession } from "@/lib/session";
import { getUserById } from "@/lib/user";

export async function saveFlashcardSet({
  title,
  description,
  cards,
}: {
  title: string;
  description: string;
  cards: Card[];
}) {
  //   const session = await getCurrentSession();
  //   if (!session || !session.userId) {
  //     return { message: "User not found", success: false };
  //   }

  //   const user = await getUserById(session.userId);
  //   if (!user || !user.id) {
  //     return { message: "User not found", success: false };
  //   }
  console.log("Saving to DB:", { title, description, cards });
}
