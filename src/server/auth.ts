import { getDictionary } from "@/dictionaries/dictionaries";
import { env } from "@/env";
import { db } from "@/server/db";
import { verifyPassword } from "@/util/cripto";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import { z } from "zod";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/welcome",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        locale: { label: "Locale", type: "text", placeholder: "en" },
      },
      async authorize(credentials) {
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

        const user = await db.user.findFirst({
          where: { name: username },
        });

        if (!user?.hashedPassword) throw new Error(errors.userNotFound);
        if (!(await verifyPassword(user.hashedPassword, password))) {
          throw new Error(errors.userOrPasswordNotMatch);
        }

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

export const getServerAuthSession = () => getServerSession(authOptions);
