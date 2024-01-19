import LoginForm from "@/app/[locale]/auth/(loginAndRegister)/login/loginForm";
import { getDictionary } from "../../../../../dictionaries/dictionaries";
import { OAuthProviders } from "../_components/OAuthProviders";
import { Suspense } from "react";

export default async function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(locale);

  return (
    <>
      <h1 className="text-2xl font-bold font-display text-center">
        {dictionary.auth.login.title}
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm dictionary={dictionary} locale={locale} />
      </Suspense>
    </>
  );
}
