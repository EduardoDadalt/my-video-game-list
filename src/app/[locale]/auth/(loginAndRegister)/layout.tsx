import { ReactNode } from "react";
import { OAuthProviders } from "./_components/OAuthProviders";

export default async function LayoutLoginAndRegister({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col gap-2 border p-2 rounded-xl shadow w-full mx-4 sm:mx-0 sm:min-w-72 sm:w-1/2 max-w-96">
        {children}
        <hr className="my-2" />
        <OAuthProviders locale={locale} />
      </div>
    </main>
  );
}
