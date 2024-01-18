import Button from "@/components/button";
import LoginForm from "@/components/loginForm";
import { getDictionary } from "../../../../dictionaries/dictionaries";

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
          {dictionary.auth.login.title}
        </h1>
        <LoginForm dictionary={dictionary} locale={locale} />
        <div>
          <Button>Google</Button>
          <Button>Facebook</Button>
          <Button>Discord</Button>
        </div>
      </div>
    </main>
  );
}
