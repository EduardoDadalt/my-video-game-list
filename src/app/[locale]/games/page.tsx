import GameCard from "@/components/gameCard";
import { db } from "@/server/db";

export default async function GamesPage({
  params: {},
}: {
  params: { locale: string };
}) {
  const games = await db.game.findMany({
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
