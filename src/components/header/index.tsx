"use client";
import Image from "next/image";
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
import { FiChevronDown } from "react-icons/fi";
import menuImg from "../../../public/icons/menu.svg";
import userImg from "../../../public/icons/user.svg";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [callbackUrl, setCallbackUrl] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    setCallbackUrl(window.location.href);
  }, []);

  return (
    <header className="p-2 flex items-center justify-between">
      <Image src={menuImg} height={20} width={20} alt="Menu" />
      <Link href={"/"}>
        <h1 className="font-display">MyVideoGameList</h1>
      </Link>

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
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" variant="bordered" className="flex gap-2">
          <Image
            src={session?.user?.image ?? userImg}
            height={20}
            width={20}
            alt="Usuário"
            className="rounded-full border h-8 w-8"
          />
          <span>{session?.user?.name ?? "Usuário"}</span>
          <FiChevronDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
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
