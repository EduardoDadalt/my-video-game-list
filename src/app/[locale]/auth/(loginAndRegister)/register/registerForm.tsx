"use client";

import Button from "@/components/button";
import Field from "@/components/field";
import { Dictionary } from "@/dictionaries/Dictionary";
import { useFormState, useFormStatus } from "react-dom";
import { registerUser } from "./actions";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button btnStyle="contained" type="submit" aria-disabled={pending}>
      {children}
    </Button>
  );
}

export default function RegisterForm({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  const [state, formAction] = useFormState(registerUser, { message: "" });
  return (
    <>
      <form className="flex flex-col gap-2" action={formAction}>
        <Field label={dictionary.auth.login.username} name="username" />
        <Field
          label={dictionary.auth.register.email}
          name="email"
          type="email"
        />
        <Field
          label={dictionary.auth.login.password}
          name="password"
          type="password"
        />
        <Field
          label={dictionary.auth.login.confirmPassword}
          name="confirmPassword"
          type="password"
        />
        <SubmitButton>{dictionary.auth.login.submit}</SubmitButton>
        {!!state.message && <div className="p-4">{state.message}</div>}
      </form>
    </>
  );
}
