import { getDictionary } from "@/dictionaries/dictionaries";
import { db } from "@/server/db";
import { Button } from "@nextui-org/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import GameInformation from "./gameInformation";

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
  const game = await db.game.findUnique({
    where: { id: gameId },
    include: { Categories: true, Publisher: true, Developers: true },
  });
  const {
    _avg: { rating: score },
  } = await db.rating.aggregate({
    _avg: { rating: true },
    where: { gameId: gameId },
  });

  if (!game) return notFound();
  return (
    <main className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-start">
        <div className="sm:ml-2 sm:min-w-[300px] sm:rounded-2xl sm:border sm:p-4 sm:shadow-xl">
          <h1 className="p-2 pt-0 text-lg font-bold">{game.name}</h1>
          <Image
            src={`/api/game/${gameId}/img/${game.posterHorizontalId}`}
            height={200}
            width={300}
            alt="Poster"
            className="h-auto max-h-[45vh] w-full object-cover sm:hidden"
          />
          <Image
            src={`/api/game/${gameId}/img/${game.posterVerticalId}`}
            alt={`Poster of game ${game.name}`}
            height={300}
            width={200}
            className="mx-auto hidden max-h-[300px] object-cover object-bottom sm:block"
          />
          <div className="flex flex-row flex-wrap items-stretch gap-2 p-2 *:flex-1 sm:px-0">
            <div className="flex items-center justify-between rounded-md border p-2 shadow">
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
  const game = await db.game.findUnique({
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
