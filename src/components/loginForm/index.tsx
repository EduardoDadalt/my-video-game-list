"use client";
import Link from "next/link";
import Field from "../field";
import Button from "../button";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm({ dictionary }: { dictionary: Dictionary }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Field
        label={dictionary.login.username}
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Field
        label={dictionary.login.password}
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex flex-col">
        <Link href="/forget-password" className="link">
          {dictionary.login.forgotPassword}
        </Link>
        <Link href="/register" className="link">
          {dictionary.login.register}
        </Link>
      </div>
      <Button
        btnStyle="contained"
        onClick={() => signIn("Credentials", { username, password })}
      >
        {dictionary.login.submit}
      </Button>
    </>
  );
}
