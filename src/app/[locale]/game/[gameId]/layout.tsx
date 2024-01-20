import { getDictionary } from "@/dictionaries/dictionaries";
import database from "@/lib/database";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import GameInformation from "./gameInformation";
import { Button } from "@nextui-org/react";

export default async function LayoutGamePages({
  params: { gameId, locale },
  children,
}: {
  params: {
    locale: string;
    gameId: string;
  };
  children: ReactNode;
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
            <Button color="primary">{dictionary.gamePage.addToList}</Button>
          </div>
          <GameInformation
            dictionary={dictionary}
            game={game}
            locale={locale}
          />
        </div>
        {children}
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
    title: {
      template: game.name + " - %s | MyVideoGameList",
      default: game.name,
    },
    description: `Find more information about ${game.name} on MyVideoGameList`,
    keywords: game.Categories.map((category) => category.name).join(", "),
  };
}
