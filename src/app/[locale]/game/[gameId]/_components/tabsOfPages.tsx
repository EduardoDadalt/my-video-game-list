"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUsers } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";

const tabs: {
  href: string;
  icon: React.ReactNode;
  label: string;
}[] = [
  {
    href: "",
    icon: <FiHome />,
    label: "Home",
  },
  {
    href: "/characters",
    icon: <FiUsers />,
    label: "Characters",
  },
  {
    href: "/images",
    icon: <GrGallery />,
    label: "Images",
  },
];

export function TabOfPages({ gameId }: { gameId: string }) {
  const pathname = usePathname();
  const split = pathname.split(gameId);
  const homeUrl = split[0] + gameId;

  return (
    <Tabs aria-label="Options" color="primary" value={pathname}>
      <TabsList className="*:*:flex *:*:flex-row *:*:items-center *:*:gap-2">
        {tabs.map(({ icon, href, label }) => (
          <TabsTrigger key={href} value={homeUrl + href} asChild>
            <Link href={homeUrl + href}>
              {icon} {label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
