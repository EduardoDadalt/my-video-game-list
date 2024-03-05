import { getDictionary } from "@/dictionaries/dictionaries";

export default async function RegisterPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(locale);
  return (
    <>
      <h1 className="text-center font-display text-2xl font-bold">
        {dictionary.auth.register.title}
      </h1>
    </>
  );
}
