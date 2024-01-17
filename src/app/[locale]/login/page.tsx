import Button from "@/components/button";
import { getDictionary } from "../../../dictionaries/dictionaries";
import Field from "@/components/field";
import Link from "next/link";
import LoginForm from "@/components/loginForm";

export default async function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(locale);

  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col gap-2 border p-2 rounded-xl shadow w-64">
        <h1 className="text-2xl font-bold font-display text-center">
          {dictionary.login.title}
        </h1>
        <LoginForm dictionary={dictionary} />
        <div>
          <Button>Google</Button>
          <Button>Facebook</Button>
          <Button>Discord</Button>
        </div>
      </div>
    </main>
  );
}
