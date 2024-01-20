import { Dictionary } from "@/dictionaries/Dictionary";
import { z } from "zod";

export function getRegisterUserSchema(dictionary: Dictionary) {
  return z
    .object({
      username: z
        .string()
        .min(3, { message: dictionary.auth.errors.usernameMinLength })
        .max(30, { message: dictionary.auth.errors.usernameMaxLength }),
      email: z.string().email({ message: dictionary.auth.errors.email }),
      password: z
        .string()
        .min(3, { message: dictionary.auth.errors.passwordMinLength })
        .max(100, { message: dictionary.auth.errors.passwordMaxLength }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
}
