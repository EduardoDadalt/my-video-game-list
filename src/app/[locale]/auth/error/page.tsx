"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function AuthErrorPage({}) {
  return (
    <main>
      Erro:
      <Suspense>
        <ErrorMessage />
      </Suspense>
    </main>
  );
}

function ErrorMessage() {
  const searchParams = useSearchParams();

  return <main>Erro: {searchParams.get("error")}</main>;
}
