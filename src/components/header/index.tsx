import Image from "next/image";
import Link from "next/link";

import menuImg from "../../../public/icons/menu.svg";
import userImg from "../../../public/icons/user.svg";
import Button from "../button";
export default function Header() {
  const isLogged = false; // TODO: implementar lógica de login

  return (
    <header className="p-2 flex items-center justify-between">
      <Image src={menuImg} height={20} width={20} alt="Menu" />
      <Link href={"/"}>
        <h1 className="font-display">MyVideoGameList</h1>
      </Link>

      {isLogged ? (
        <Image
          src={userImg}
          height={20}
          width={20}
          alt="Usuário"
          className="rounded-full border h-8 w-8"
        />
      ) : (
        <div className="flex gap-2">
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link href={"/signup"}>
            <Button btnStyle="contained">Sign Up</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
