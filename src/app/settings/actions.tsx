"use server";

import { deleteSessionCookie } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function logoutAction() {
  await deleteSessionCookie();
  redirect("/");
}
