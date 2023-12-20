import Image from "next/image";
import Link from "next/link";

export default function GameCard({
  game: { id, name, PosterId },
}: {
  game: {
    id: string;
    name: string;
    PosterId: string | null;
  };
}) {
  return (
    <Link href={`/game/${id}`}>
      <div className="h-52 w-36 relative rounded-lg overflow-hidden">
        <Image
          src={`/game/${id}/img/${PosterId}`}
          alt={`Image of game ${name}`}
          fill
        />
        <div className="absolute bottom-0 right-0 left-0 text-white font-bold z-1 bg-gradient-to-b from-transparent to-black w-full text-center z-10">
          {name}
        </div>
      </div>
    </Link>
  );
}
