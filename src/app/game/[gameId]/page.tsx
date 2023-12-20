import database from "@/lib/database";
import { notFound } from "next/navigation";
import Image from "next/image";
export default async function GamePage({
  params: { gameId },
}: {
  params: { gameId: string };
}) {
  const game = await database.game.findUnique({ where: { id: gameId } });

  if (!game) return notFound();
  return (
    <main className="flex flex-row">
      <div className="flex-1">
        {game.PosterId && (
          <Image
            src={`/game/${gameId}/img/${game.PosterId}`}
            alt={`Poster of game ${game.name}`}
            height={300}
            width={200}
          />
        )}
        <h1>{game.name}</h1>
      </div>
      <div className="flex-9"></div>
    </main>
  );
}
