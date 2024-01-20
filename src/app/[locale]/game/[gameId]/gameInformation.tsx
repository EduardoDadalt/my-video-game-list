"use client";

import { Dictionary } from "@/dictionaries/Dictionary";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
function DataInfo({ title, data }: { title: string; data: ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-between text-sm gap-2 p-1">
      <span className="font-bold">{title}:</span>
      <span>{data}</span>
    </div>
  );
}
export default function GameInformation({
  dictionary,
  game,
  locale,
}: {
  dictionary: Dictionary;
  game: {
    Publisher: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      deleted: boolean;
    };
    Developers: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      deleted: boolean;
    }[];
    Categories: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  } & {
    id: string;
    name: string;
    sinopse: string;
    createdAt: Date;
    updatedAt: Date;
    releaseDate: Date | null;
    deleted: boolean;
    publisherId: string;
    posterHorizontalId: string | null;
    posterVerticalId: string | null;
  };
  locale: string;
}) {
  const [show, setShow] = useState(false);

  const open = () => setShow(true);
  const close = () => setShow(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 640) open();
      else close();
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return show ? (
    <div>
      <DataInfo
        title={dictionary.gamePage.releaseDate}
        data={game?.releaseDate?.toLocaleDateString(locale) ?? "??/??/????"}
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
        title={dictionary.gamePage.developers}
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
      <Button
        className="sm:hidden w-full flex items-center justify-center"
        onClick={close}
      >
        <FiChevronUp size={24} /> {dictionary.gamePage.showLess}
      </Button>
    </div>
  ) : (
    <Button
      className="sm:hidden w-full flex items-center justify-center"
      onClick={open}
    >
      <FiChevronDown size={24} /> {dictionary.gamePage.showMore}
    </Button>
  );
}
