import Image from "next/image";
import Link from "next/link";

export type GameCardProps = {
  id: string;
  name: string;
  posterId: string | null;
};

export default function GameCard({
  game: { id, name, posterId },
}: {
  game: GameCardProps;
}) {
  return (
    <Link href={`/game/${id}`} className="">
      <div className="h-52 w-36 relative overflow-hidden">
        <Image
          src={`/api/game/${id}/img/${posterId}`}
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
