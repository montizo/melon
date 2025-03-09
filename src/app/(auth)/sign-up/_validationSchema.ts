import { emailSchema, passwordSchema, usernameSchema } from "@/lib/validation";
import { z } from "zod";

export const validationSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});
