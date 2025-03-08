"use server";

import { getUser } from "@/lib/auth/user";

export default async function checkExists(field: string, value: string) {
  const user = await getUser({ [field]: value });
  return !!user;
}
