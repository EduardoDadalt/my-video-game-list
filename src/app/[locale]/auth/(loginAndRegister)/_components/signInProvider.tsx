"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { type BuiltInProviderType } from "next-auth/providers/index";
import { type LiteralUnion, signIn } from "next-auth/react";
import { type ReactNode } from "react";

const COLORS = {
  google: "bg-gray-50 hover:bg-gray-200 text-gray-900",
  facebook: "bg-blue-500 hover:bg-blue-700 text-white",
  discord: "bg-[#424549] hover:bg-[#36393e] text-white",
};

type colors = keyof typeof COLORS;

export default function SignInProvider({
  provider,
  name,
  color,
  icon,
  continueWith,
}: {
  provider: LiteralUnion<BuiltInProviderType> | undefined;
  name: string;
  color: colors;
  icon: ReactNode;
  continueWith: string;
}) {
  return (
    <Button
      className={clsx(
        "flex items-center justify-center gap-2 !p-4",
        COLORS[color],
      )}
      onClick={() => signIn(provider)}
    >
      {icon} {continueWith} {name}
    </Button>
  );
}
