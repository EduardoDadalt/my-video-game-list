import { getDictionary } from "../../../../../dictionaries/dictionaries";

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
    </>
  );
}
