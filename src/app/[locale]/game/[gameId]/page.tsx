import database from "@/lib/database";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { getDictionary } from "@/dictionaries/dictionaries";
import Link from "next/link";

export default async function GamePage({
  params: { gameId, locale },
}: {
  params: { gameId: string; locale: string };
}) {
  const dictionary = await getDictionary(locale);
  const game = await database.game.findUnique({
    where: { id: gameId },
    include: { Categories: true, Publisher: true },
  });
  const {
    _avg: { rating: score },
  } = await database.rating.aggregate({
    _avg: { rating: true },
    where: { gameId: gameId },
  });

  if (!game) return notFound();
  return (
    <main className="flex flex-col">
      <h1 className="text-lg font-bold p-2">{game.name}</h1>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1">
          <Image
            src={`/api/game/${gameId}/img/${game.posterHorizontalId}`}
            height={200}
            width={300}
            alt="Poster"
            className="w-full h-auto object-cover sm:hidden max-h-[45vh]"
          />
          <Image
            src={`/api/game/${gameId}/img/${game.posterVerticalId}`}
            alt={`Poster of game ${game.name}`}
            height={300}
            width={200}
            className="object-bottom object-cover max-h-[300px] hidden sm:block"
          />
          <div className="flex flex-row flex-wrap">
            <div>Nota: {score ?? 0}</div>
            <button>Adicionar Nota</button>
          </div>
          <div>
            Publisher:{" "}
            <Link href={`/publisher/${game.publisherId}`} className="link">
              {game.Publisher.name}
            </Link>
          </div>
        </div>
        <div className="p-4 flex-[2]">
          <h2 className="font-display font-bold">Sinopse</h2>
          <div className="whitespace-pre-wrap">{game.sinopse}</div>
        </div>
      </div>

      <div className="md:flex-9"></div>
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
