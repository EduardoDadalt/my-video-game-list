import database from "@/lib/database";
import CarouselOfGames from "../carouselOfGames";
import { GameCardProps } from "../gameCard";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function GameOfMonth({ locale }: { locale: string }) {
  const dictionary = await getDictionary(locale);

  const games = await getGamesOfMonth();
  return (
    <section className="mx-6 lg:mx-20 space-y-2 border rounded-xl p-4 pt-2">
      <h1 className="text-xl font-bold ">{dictionary.home.gameOfMonth}</h1>
      <CarouselOfGames games={[...games, ...games, ...games, ...games]} />
    </section>
  );
}

export async function getGamesOfMonth(): Promise<GameCardProps[]> {
  const dateNow = new Date();

  const dataInicioMes = new Date(
    dateNow.getFullYear(),
    dateNow.getUTCMonth(),
    1
  );

  const dataFinalMes = new Date(
    dateNow.getFullYear(),
    dateNow.getUTCMonth() + 1,
    0
  );

  const games: GameCardProps[] = await database.$queryRaw`SELECT
  g.id,
  g.name,
  g."posterId"
FROM
  "Game" g
  LEFT JOIN "Rating" r ON g.id = r."gameId"
WHERE
   g."releaseDate" BETWEEN ${dataInicioMes} AND ${dataFinalMes}
GROUP BY
  g.id,
  g.name,
  g."posterId"
ORDER BY
  coalesce(AVG(r.rating),0) DESC`;

  return games;
}
