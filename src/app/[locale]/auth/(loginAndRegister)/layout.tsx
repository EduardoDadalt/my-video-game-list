import { ReactNode } from "react";
import { OAuthProviders } from "./_components/OAuthProviders";
import { getDictionary } from "@/dictionaries/dictionaries";
import OnAuthRedirect from "./_components/OnAuthRedirect";

export default async function LayoutLoginAndRegister({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  const dictionary = await getDictionary(locale);
  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col gap-2 border p-2 rounded-xl shadow w-full mx-4 sm:mx-0 sm:min-w-72 sm:w-1/2 max-w-96">
        <div className="bg-amber-200 text-black p-2 border border-yellow-500 rounded">
          {dictionary.demo}
        </div>
        {children}
        <hr className="my-2" />
        <OAuthProviders locale={locale} />
        <OnAuthRedirect />
      </div>
    </main>
  );
}
