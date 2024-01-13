import database from "@/lib/database";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { getDictionary } from "@/dictionaries/dictionaries";
import Link from "next/link";
import Button from "@/components/button";
import { ReactNode } from "react";

function DataInfo({ title, data }: { title: string; data: ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-between text-sm gap-2 p-1">
      <span className="font-bold">{title}:</span>
      <span>{data}</span>
    </div>
  );
}

export default async function GamePage({
  params: { gameId, locale },
}: {
  params: { gameId: string; locale: string };
}) {
  const dictionary = await getDictionary(locale);
  const game = await database.game.findUnique({
    where: { id: gameId },
    include: { Categories: true, Publisher: true, Developers: true },
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
      <div className="flex flex-col sm:flex-row sm:items-start">
        <div className="sm:p-4 sm:min-w-[300px] sm:border sm:shadow-xl sm:rounded-2xl sm:ml-2">
          <h1 className="text-lg font-bold p-2 pt-0">{game.name}</h1>
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
            className="object-bottom object-cover max-h-[300px] hidden sm:block mx-auto"
          />
          <div className="flex flex-row flex-wrap items-stretch p-2 sm:px-0 gap-2 *:flex-1">
            <div className="rounded-md shadow p-2 border flex justify-between items-center">
              <span className="font-bold">{dictionary.gamePage.score}:</span>
              <span className="text-lg">{score ?? 0}</span>
            </div>
            <Button btnStyle="contained">
              {dictionary.gamePage.addToList}
            </Button>
          </div>
          <div>
            <DataInfo
              title={dictionary.gamePage.releaseDate}
              data={
                game?.releaseDate?.toLocaleDateString(locale) ?? "??/??/????"
              }
            />
            <DataInfo
              title={dictionary.gamePage.publisher}
              data={
                <Link href={`/publisher/${game.publisherId}`} className="link">
                  {game.Publisher.name}
                </Link>
              }
            />
            <DataInfo
              title={dictionary.gamePage.developer}
              data={
                <div className="flex flex-col text-right">
                  {game.Developers.map((developer) => (
                    <Link
                      href={`/developer/${developer.id}`}
                      className="link"
                      key={developer.id}
                    >
                      {developer.name}
                    </Link>
                  ))}
                </div>
              }
            />
          </div>
        </div>
        <div className="p-4">
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
