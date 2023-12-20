import CarouselOfGames from "@/components/carouselOfGames";
import database from "@/lib/database";

export default async function Home() {
  const games = await database.game.findMany({
    select: {
      id: true,
      name: true,
      PosterId: true,
    },
  });
  return (
    <main>
      <section className="mx-6 lg:mx-20 space-y-2 border rounded px-4 py-2">
        <h1 className="text-lg font-bold">Games of Month</h1>
        <CarouselOfGames games={[...games, ...games, ...games, ...games]} />
      </section>
    </main>
  );
}
