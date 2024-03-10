import { getRegisterUserSchema } from "@/app/[locale]/auth/(loginAndRegister)/register/getRegisterUserSchema";
import { getDictionary } from "@/dictionaries/dictionaries";
import { hashPassword } from "@/util/cripto";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        locale: z.string(),
        username: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx: { db }, input: { locale, ...body } }) => {
      const dictionary = await getDictionary(locale);
      const registerUserSchema = getRegisterUserSchema(dictionary);
      const parse = registerUserSchema.safeParse(body);
      if (!parse.success) {
        return { message: parse.error.message, success: false };
      }
      const { username, password, email } = parse.data;
      const hashedPassword = await hashPassword(password);
      try {
        await db.user.create({
          data: {
            name: username,
            hashedPassword,
            email,
          },
        });
        return { message: "", success: true };
      } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            let message = "";
            const target = error.meta?.target as string | undefined;
            if (!target) {
              message = dictionary.auth.errors.usernameAndEmailAlreadyExists;
            }
            if (target?.includes("email")) {
              message = dictionary.auth.errors.emailAlreadyExists;
            }
            if (target?.includes("name")) {
              message = dictionary.auth.errors.usernameAlreadyExists;
            }
            return { message, success: false };
          }
        }
      }
    }),
});
