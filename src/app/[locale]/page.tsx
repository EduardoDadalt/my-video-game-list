import GameOfMonth from "@/components/homepage/gameOfMonth";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main>
      <GameOfMonth locale={locale} />
    </main>
  );
}
