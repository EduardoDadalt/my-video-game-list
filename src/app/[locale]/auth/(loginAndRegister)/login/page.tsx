import LoginForm from "@/app/[locale]/auth/(loginAndRegister)/login/loginForm";
import { getDictionary } from "../../../../../dictionaries/dictionaries";
import { Suspense } from "react";

export default async function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(locale);

  return (
    <>
      <h1 className="font-display text-center text-2xl font-bold">
        {dictionary.auth.login.title}
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm dictionary={dictionary} locale={locale} />
      </Suspense>
    </>
  );
}
