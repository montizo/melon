import { z } from "zod";
import { passwordSchema } from "@/lib/validation";

export const changePasswordValidation = z.object({
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
});
