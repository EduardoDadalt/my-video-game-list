import database from "@/lib/database";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function GamePage({
  params: { gameId, locale },
}: {
  params: { gameId: string; locale: string };
}) {
  const dictionary = await getDictionary(locale);
  const game = await database.game.findUnique({
    where: { id: gameId },
    include: { Categories: true },
  });
  const {
    _avg: { rating: score },
  } = await database.rating.aggregate({
    _avg: { rating: true },
    where: { gameId: gameId },
  });

  if (!game) return notFound();
  return (
    <main className="flex flex-col md:flex-row px-4 sm:px-12 md:px-24 lg:px-32">
      <h1 className="text-lg font-bold p-2">{game.name}</h1>
      <div className="md:flex-1 flex">
        <Image
          src={`/api/game/${gameId}/img/${game.posterId}`}
          alt={`Poster of game ${game.name}`}
          height={300}
          width={200}
          className="object-bottom object-cover flex-1 h-56"
        />
        <div className="flex-1 p-2 flex-col">
          <div className="rounded border shadow">
            <div className="font-bold font-display">Nota</div>
            <div>{score ?? 0}</div>
          </div>{" "}
          <div className="rounded border shadow">
            <div className="font-bold font-display">Categorias</div>
            <div>
              {game.Categories.map((category) => category.name).join(", ")}
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex-9">
        <div>
          <h2>Sinopse</h2>
          {game.sinopse}
        </div>
      </div>
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
