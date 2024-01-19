import { getDictionary } from "@/dictionaries/dictionaries";
import RegisterForm from "./registerForm";

export default async function RegisterPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(locale);
  return (
    <>
      <h1 className="text-2xl font-bold font-display text-center">
        {dictionary.auth.register.title}
      </h1>
      <RegisterForm dictionary={dictionary} />
    </>
  );
}
