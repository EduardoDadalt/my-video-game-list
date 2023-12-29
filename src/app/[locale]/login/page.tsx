import Button from "@/components/button";
import { getDictionary } from "../../../dictionaries/dictionaries";
import Field from "@/components/field";
import Link from "next/link";
export default async function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(locale);

  async function login(formData: FormData) {
    "use server";
    const username = formData.get("username");
    const password = formData.get("password");
    console.log(username, password);
    //todo Make a login
  }

  return (
    <main className="flex items-center justify-center">
      <form
        action={login}
        className="flex flex-col gap-2 border p-2 rounded-xl shadow w-64"
      >
        <h1 className="text-2xl font-bold font-display text-center">
          {dictionary.login.title}
        </h1>
        <Field label={dictionary.login.username} type="text" name="username" />
        <Field
          label={dictionary.login.password}
          type="password"
          name="password"
        />
        <div className="flex flex-col">
          <Link href="/forget-password" className="link">
            {dictionary.login.forgotPassword}
          </Link>
          <Link href="/register" className="link">
            {dictionary.login.register}
          </Link>
        </div>
        <Button btnStyle="contained" type="submit">
          {dictionary.login.submit}
        </Button>
      </form>
    </main>
  );
}
