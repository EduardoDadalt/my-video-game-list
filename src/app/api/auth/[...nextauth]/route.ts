import { getDictionary } from "@/dictionaries/dictionaries";
import database from "@/lib/database";
import { hashPassword } from "@/util/cripto";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(database) as Adapter,
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/welcome",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        locale: { label: "Locale", type: "text", placeholder: "en" },
      },
      async authorize(credentials, req) {
        const locale = credentials?.locale;
        if (!locale) {
          throw "Locale is not pass to the authorize function";
        }
        const dictionary = await getDictionary(locale);

        const errors = dictionary.auth.errors;
        const loginSchema = z.object({
          username: z
            .string({ required_error: errors.usernameRequired })
            .min(3, { message: errors.usernameMinLength })
            .max(30, { message: errors.usernameMaxLength }),
          password: z
            .string({ required_error: errors.passwordRequired })
            .min(3, { message: errors.passwordMinLength })
            .max(100, { message: errors.passwordMaxLength })
            .transform(hashPassword),
        });
        const { username, password } = loginSchema.parse(credentials);

        const user = await database.user.findFirst({
          where: { name: username },
        });

        if (!user) throw new Error(errors.userNotFound);
        if (user.password !== password)
          throw new Error(errors.userOrPasswordNotMatch);

        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
