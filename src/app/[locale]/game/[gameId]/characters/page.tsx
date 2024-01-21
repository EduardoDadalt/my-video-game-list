import { db } from "@/server/db";
import Image from "next/image";

export default async function Characters({
  params: { gameId },
}: {
  params: { gameId: string; locale: string };
}) {
  const characters = await db.character.findMany({
    where: {
      AND: [
        { Games: { some: { id: gameId } } },
        {
          deleted: false,
        },
      ],
    },
    select: { id: true, name: true, description: true },
  });
  return (
    <main className="p-4">
      <h1 className="font-display text-xl font-bold">Characters</h1>
      <div className="flex flex-col gap-2">
        {characters.map((character) => (
          <div key={character.id} className="flex">
            <Image
              src={`/api/character/${character.id}/image`}
              alt={`Picture of character ${character.name}`}
              height={150}
              width={150}
            />
            <div>
              <div className="font-display text-lg">{character.name}</div>
              <div>{character.description}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
