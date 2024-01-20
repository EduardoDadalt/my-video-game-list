import clsx from "clsx";

type Types = "error" | "success" | "warning" | "info";

const COLORS: {
  [key in Types]: string;
} = {
  error: "bg-red-100 text-red-900",
  success: "bg-green-100 text-green-900",
  warning: "bg-yellow-100 text-yellow-900",
  info: "bg-blue-100 text-blue-900",
};

export default function Alert({
  type,
  children,
}: {
  type: Types;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("p-2 rounded border", COLORS[type])}>{children}</div>
  );
}
