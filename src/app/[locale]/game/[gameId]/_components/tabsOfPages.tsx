"use client";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { FiHome } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

function TabTitle({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon} {text}
    </div>
  );
}
export function TabOfPages({ gameId }: { gameId: string }) {
  const pathname = usePathname();
  const split = pathname.split(gameId);
  const homeUrl = split[0] + "/" + gameId;

  return (
    <Tabs aria-label="Options" color="primary">
      <TabsList className="*:*:flex *:*:flex-row *:*:items-center *:*:gap-2">
        <TabsTrigger value="home" asChild>
          <Link href={homeUrl}>
            <FiHome /> Home
          </Link>
        </TabsTrigger>
        <TabsTrigger value="characters">
          <Link href={homeUrl + "/characters"}>
            <FiUsers /> Characters
          </Link>
        </TabsTrigger>
        <TabsTrigger value="images">
          <Link href={homeUrl + "/images"}>
            <GrGallery /> Images
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
