import prisma from "../db/prisma/prisma";

export interface FlashcardSet {
  title: string;
  description: string;
  cards: { term: string; definition: string }[];
}

export async function isSetTitleTaken(
  userId: string,
  title: string
): Promise<boolean> {
  const existingSet = prisma.set.findFirst({
    where: { userId, title: { equals: title, mode: "insensitive" } },
  });

  return existingSet !== null;
}

export async function createSet(
  userId: string,
  title: string,
  description?: string
) {
  return prisma.set.create({
    data: { userId, title, description: description || "" },
  });
}

export async function getSetById(id: string) {
  return prisma.set.findUnique({ where: { id }, include: { cards: true } });
}

export async function getSetByUserId(userId: string) {
  return prisma.set.findMany({
    where: { userId },
    include: { cards: true },
  });
}

export async function deleteSet(id: string) {
  return prisma.set.delete({ where: { id } });
}
