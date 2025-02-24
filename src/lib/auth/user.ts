import prisma from "../db/prisma/prisma";
import bcrypt from "bcryptjs";

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
