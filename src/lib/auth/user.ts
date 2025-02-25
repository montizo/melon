import prisma from "../db/prisma/prisma";
import bcrypt from "bcryptjs";

export async function isEmailOrUsernameTaken(
  email: string,
  username: string
): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });

  return user !== null;
}

export async function createUser(
  username: string,
  email: string,
  password: string
): Promise<{
  id: string;
  username: string;
  email: string;
}> {
  const passwordHash = await bcrypt.hash(password, 12);
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      passwordHash: passwordHash,
    },
  });
  const { passwordHash: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}
