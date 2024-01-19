import GameCard from "@/components/gameCard";
import { getDictionary } from "@/dictionaries/dictionaries";
import database from "@/lib/database";

export default async function GamesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(locale);
  const games = await database.game.findMany({
    where: { deleted: false },
    orderBy: { name: "asc" },
  });
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Games</h1>
      <div className="flex flex-wrap">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
