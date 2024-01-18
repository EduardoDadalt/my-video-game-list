import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";
import Button from "../button";

export default function SignInProvider({
  provider,
  name,
  color,
}: {
  provider: LiteralUnion<BuiltInProviderType> | undefined;
  name: string;
  color: string;
}) {
  return (
    <Button className="" onClick={() => signIn(provider)}>
      Continue with {name}
    </Button>
  );
}
