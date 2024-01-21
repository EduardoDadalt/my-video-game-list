import { db } from "@/server/db";
import { type Metadata } from "next";
import Image from "next/image";

export default async function GameImagesPage({
  params: { gameId },
}: {
  params: { gameId: string; locale: string };
}) {
  const gameImages = await db.gameImage.findMany({
    where: { gameId: gameId },
  });
  return (
    <main>
      <h1>Game Images</h1>
      <div className="flex gap-4 p-4">
        {gameImages.map((gameImage) => (
          <div key={gameImage.id}>
            <Image
              src={`/api/game/${gameId}/img/${gameImage.id}`}
              alt={"Poster"}
              height={200}
              width={200}
            />
          </div>
        ))}
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Game Images",
};
