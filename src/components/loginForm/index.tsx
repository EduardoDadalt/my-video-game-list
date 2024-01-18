"use client";
import Link from "next/link";
import Field from "../field";
import Button from "../button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

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
      <Field
        label={dictionary.auth.login.username}
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Field
        label={dictionary.auth.login.password}
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex flex-col">
        <Link href="/forget-password" className="link">
          {dictionary.auth.login.forgotPassword}
        </Link>
        <Link href="/register" className="link">
          {dictionary.auth.login.register}
        </Link>
      </div>
      <Button
        btnStyle="contained"
        onClick={() => signIn("credentials", { username, password, locale })}
      >
        {dictionary.auth.login.submit}
      </Button>
    </>
  );
}
