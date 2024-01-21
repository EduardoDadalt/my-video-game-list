import { getRegisterUserSchema } from "@/app/[locale]/auth/(loginAndRegister)/register/getRegisterUserSchema";
import { getDictionary } from "@/dictionaries/dictionaries";
import database from "@/lib/database";
import { defaultLocale } from "@/middleware";
import { hashPassword } from "@/util/cripto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { locale: localeInput, ...body } = await req.json();
  const locale = localeInput ?? defaultLocale;

  const dictionary = await getDictionary(locale);

  const registerUserSchema = getRegisterUserSchema(dictionary);

  const parse = registerUserSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json(parse.error, { status: 400 });
  }
  const { username, password, email } = parse.data;
  const hashedPassword = await hashPassword(password);
  try {
    await database.user.create({
      data: {
        name: username,
        hashedPassword,
        email,
      },
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      let message = "";
      if (!error.meta.target) {
        message = dictionary.auth.errors.usernameAndEmailAlreadyExists;
      } else if (error.meta.target.includes("email")) {
        message = dictionary.auth.errors.emailAlreadyExists;
      } else if (error.meta.target.includes("name")) {
        message = dictionary.auth.errors.usernameAlreadyExists;
      }
      return NextResponse.json(
        {
          message: message,
        },
        { status: 400 }
      );
    }
    throw error;
  }

  return NextResponse.json(null, { status: 201 });
}
