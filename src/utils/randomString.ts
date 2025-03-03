import crypto from "crypto";

export default function generateRandomString(length: number) {
  return crypto.randomBytes(length).toString("hex");
}
