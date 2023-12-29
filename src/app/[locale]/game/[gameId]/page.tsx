import database from "@/lib/database";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
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
        {game.posterId && (
          <Image
            src={`/api/game/${gameId}/img/${game.posterId}`}
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

export async function generateMetadata({
  params: { gameId },
}: {
  params: { gameId: string };
}): Promise<Metadata> {
  const game = await database.game.findUnique({
    where: { id: gameId },
    select: { name: true, Categories: true },
  });
  if (!game) return notFound();

  return {
    title: game.name,
    description: `Find more information about ${game.name} on MyVideoGameList`,
    keywords: game.Categories.map((category) => category.name).join(", "),
  };
}
export async function generateStaticParams() {
  const games = await database.game.findMany({ select: { id: true } });

  return games.map((game) => ({
    gameId: game.id,
  }));
}
