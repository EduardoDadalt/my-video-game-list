"use client";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";
import { ReactNode } from "react";

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
        "!p-4 flex items-center gap-2 justify-center",
        COLORS[color]
      )}
      onClick={() => signIn(provider)}
    >
      {icon} {continueWith} {name}
    </Button>
  );
}
