import prisma from "../db/prisma/prisma";

export async function createCard(
  setId: string,
  term: string,
  definition: string
) {
  return prisma.card.create({ data: { setId, term, definition: definition } });
}

export async function getCardById(id: string) {
  return prisma.card.findUnique({ where: { id } });
}

export async function getCardsBySetId(setId: string) {
  return prisma.card.findMany({ where: { setId } });
}

export async function updateCard(
  id: string,
  term?: string,
  definition?: string
) {
  return prisma.card.update({
    where: { id },
    data: { term, definition: definition },
  });
}

export async function deleteCard(id: string) {
  return prisma.card.delete({
    where: { id },
  });
}

export interface Card {
  term: string;
  definition: string;
}
