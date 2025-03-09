import prisma from "../db/prisma/prisma";
import bcrypt from "bcryptjs";
import generateRandomString from "@/utils/randomString";

export async function isEmailOrUsernameTaken(
  email: string,
  username: string
): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: {
            equals: email.toLowerCase(),
            mode: "insensitive",
          },
        },
        {
          username: {
            equals: username.toLowerCase(),
            mode: "insensitive",
          },
        },
      ],
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
  const verifyCode = generateRandomString(8);
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      passwordHash: passwordHash,
      verifyCode: verifyCode,
    },
  });
  const { passwordHash: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function getUserByUsername(username: string) {
  return prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getUser(params: Record<string, any>) {
  const where: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    if (key == "username") {
      where.username = { equals: value, mode: "insensitive" };
    } else {
      where[key] = value;
    }
  }

  return prisma.user.findFirst({
    where,
  });
}

export async function updateUserEmail(id: string, email: string) {
  return prisma.user.update({ where: { id }, data: { email } });
}
