"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { redirect, usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { FiHome } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";

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
  const selectedKey = split[1] ?? "";

  return (
    <Tabs
      aria-label="Options"
      color="primary"
      variant="bordered"
      selectedKey={selectedKey}
    >
      <Tab
        key=""
        title={<TabTitle icon={<FiHome />} text="Home" />}
        href={homeUrl}
      />
      <Tab
        key="/characters"
        title={<TabTitle icon={<FiUsers />} text="Characters" />}
        href={homeUrl + "/characters"}
      />
      <Tab
        key="/images"
        title={<TabTitle icon={<GrGallery />} text="Images" />}
        href={homeUrl + "/images"}
      />
    </Tabs>
  );
}
