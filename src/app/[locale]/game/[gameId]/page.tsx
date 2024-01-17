import Button from "@/components/button";
import { getDictionary } from "@/dictionaries/dictionaries";
import database from "@/lib/database";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function GamePage({
  params: { gameId, locale },
}: {
  params: { gameId: string; locale: string };
}) {
  const dictionary = await getDictionary(locale);

  const game = await database.game.findUnique({
    where: { id: gameId, deleted: false },
    include: { Categories: true, Publisher: true, Developers: true },
  });
  const characters = await database.character.findMany({
    where: {
      AND: [
        { Games: { some: { id: gameId } } },
        {
          deleted: false,
        },
      ],
    },
    select: { id: true, name: true, description: true },

    take: 10,
  });
  if (!game) return notFound();
  return (
    <div className="p-4 space-y-4">
      <section>
        <h2 className="font-display font-bold">Sinopse</h2>
        <div className="whitespace-pre-wrap">{game.sinopse}</div>
      </section>
      <section>
        <h2 className="font-display font-bold">Characters:</h2>
        <div className="flex-wrap flex flex-col gap-2">
          {characters.map((character) => (
            <div
              key={character.id}
              className="h-24 border shadow overflow-hidden rounded-xl flex gap-2"
            >
              <Image
                src={`/api/character/${character.id}/image`}
                alt={`Picture of character ${character.name}`}
                height={100}
                width={100}
              />
              <div className="p-4">
                <div className="font-display text-lg">{character.name}</div>
                <div>{character.description}</div>
              </div>
            </div>
          ))}
        </div>
        <Link href={`/game/${gameId}/characters`} className="float-right mt-2">
          <Button btnStyle="contained">Ver Mais</Button>
        </Link>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const games = await database.game.findMany({ select: { id: true } });

  return games.map((game) => ({
    gameId: game.id,
  }));
}
