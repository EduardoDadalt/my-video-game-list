import { getDictionary } from "@/dictionaries/dictionaries";
import database from "@/lib/database";
import { verifyPassword } from "@/util/cripto";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import { z } from "zod";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(database) as Adapter,
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/welcome",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: validateIfStringIfNotThrowError(
        process.env.DISCORD_CLIENT_ID,
        "Discord client id is not set"
      ),
      clientSecret: validateIfStringIfNotThrowError(
        process.env.DISCORD_CLIENT_SECRET,
        "Discord client secret is not set"
      ),
    }),
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
            .max(100, { message: errors.passwordMaxLength }),
        });
        const { username, password } = loginSchema.parse(credentials);

        const user = await database.user.findFirst({
          where: { name: username },
        });

        if (!user || !user.hashedPassword) throw new Error(errors.userNotFound);
        if (!(await verifyPassword(user.hashedPassword, password)))
          throw new Error(errors.userOrPasswordNotMatch);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
};

function validateIfStringIfNotThrowError(value: unknown, errorMessage: string) {
  if (typeof value !== "string") {
    throw new Error(errorMessage);
  }
  return value;
}
