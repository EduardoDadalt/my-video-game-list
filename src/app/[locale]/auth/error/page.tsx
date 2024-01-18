"use client";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage({}) {
  const searchParams = useSearchParams();

  return <main>Erro: {searchParams.get("error")}</main>;
}
