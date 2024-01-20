"use client";

import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OnAuthRedirect() {
  const searchParams = useSearchParams();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const url = searchParams.get("callbackUrl") ?? "/";
      redirect(url);
    }
  }, [searchParams, status]);
  return <></>;
}
