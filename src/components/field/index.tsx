import { InputHTMLAttributes } from "react";

export default function Field({
  ...props
}: { label?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <fieldset className="flex flex-col">
      <label>{props.label}</label>
      <input
        {...props}
        className="rounded-lg border p-2 focus:ring-2 focus:ring-primary-600"
      />
    </fieldset>
  );
}
