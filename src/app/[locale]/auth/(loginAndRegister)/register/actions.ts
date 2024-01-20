"use server";

import { getDictionary } from "@/dictionaries/dictionaries";
import database from "@/lib/database";
import { defaultLocale } from "@/middleware";
import { hashPassword } from "@/util/cripto";
import { getRegisterUserSchema } from "./getRegisterUserSchema";

export async function registerUser(
  prevState: {
    message: string;
  },
  formData: FormData
): Promise<{ message: string }> {
  const locale = String(formData.get("locale") ?? defaultLocale);

  const dictionary = await getDictionary(locale);

  const registerUserSchema = getRegisterUserSchema(dictionary);

  const parse = registerUserSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parse.success) {
    throw parse.error;
  }
  const { username, password, email } = parse.data;
  const hashedPassword = await hashPassword(password);
  await database.user.create({
    data: {
      name: username,
      hashedPassword,
      email,
    },
  });

  return {
    message: `User ${formData.get("username")} created`,
  };
}
