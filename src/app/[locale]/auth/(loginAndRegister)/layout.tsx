import { Suspense, type ReactNode } from "react";
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
      <div className="mx-4 flex w-full max-w-96 flex-col gap-2 rounded-xl border p-2 shadow sm:mx-0 sm:w-1/2 sm:min-w-72">
        <div className="rounded border border-yellow-500 bg-amber-200 p-2 text-black">
          {dictionary.demo}
        </div>
        {children}
        <OAuthProviders locale={locale} />
        <Suspense>
          <OnAuthRedirect />
        </Suspense>
      </div>
    </main>
  );
}
