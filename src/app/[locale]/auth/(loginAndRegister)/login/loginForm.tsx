"use client";
import type { Dictionary } from "@/dictionaries/Dictionary";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: string;
}) {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = searchParams.get("error");

  return (
    <>
      {!!error && (
        <div className="rounded-xl bg-red-300 border border-red-800">
          {error}
        </div>
      )}
      <Input
        label={dictionary.auth.login.username}
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label={dictionary.auth.login.password}
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex flex-col">
        <Link href="/forget-password" className="link">
          {dictionary.auth.login.forgotPassword}
        </Link>
        <Link href="/auth/register" className="link">
          {dictionary.auth.login.iDontHaveAccount}
        </Link>
      </div>
      <Button
        color="primary"
        onClick={() => signIn("credentials", { username, password, locale })}
      >
        {dictionary.auth.login.submit}
      </Button>
    </>
  );
}
