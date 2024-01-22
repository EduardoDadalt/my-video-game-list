"use client";
import Link from "next/link";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FiChevronDown, FiMenu, FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  const [callbackUrl, setCallbackUrl] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    setCallbackUrl(window.location.href);
  }, []);

  return (
    <header className="flex items-center justify-between p-2">
      <FiMenu size={24} />
      <div className="flex flex-row items-center justify-center gap-2">
        <Link href={"/"}>
          <h1 className="font-display">MyVideoGameList </h1>
        </Link>
        <div className="rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 p-1 text-sm font-bold text-white">
          Alpha
        </div>
      </div>

      {!!session ? (
        <DropdownUser />
      ) : (
        <div className="flex gap-2">
          <Button onClick={() => signIn()} color="primary">
            Login
          </Button>
          <Link
            href={{
              pathname: "/auth/register",
              query: { callbackUrl: callbackUrl },
            }}
          >
            <Button variant="bordered" color="primary">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

function DropdownUser() {
  const { data: session } = useSession();

  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <Button color="primary" variant="bordered" className="flex gap-2">
          {!!session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt={`Picture of ${session.user.name}`}
              height={24}
              width={24}
              className="rounded-full"
            />
          ) : (
            <FiUser size={24} />
          )}

          <span>{session?.user?.name ?? "Usuário"}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection>
          <DropdownItem>Profile</DropdownItem>
        </DropdownSection>
        <DropdownItem color="danger" onClick={() => signOut()}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
