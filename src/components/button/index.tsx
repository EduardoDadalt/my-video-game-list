import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export type ButtonStyles = "text" | "outlined" | "contained";

export type ButtonProps = {
  btnStyle?: ButtonStyles;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ btnStyle, children, ...props }: ButtonProps) {
  function getClassByType(btnStyle: ButtonStyles | undefined) {
    switch (btnStyle) {
      case "contained":
        return "bg-primary-500 text-white hover:bg-primary-400 hover:border-primary-400";
      case "text":
      default:
        return "bg-transparent text-gray-800 border hover:text-primary-500 hover:bg-primary-50";
    }
  }

  return (
    <button
      className={clsx(
        "rounded-md px-2 py-1 transition-colors duration-300 shadow-2xl",
        getClassByType(btnStyle)
      )}
      {...props}
    >
      {children}
    </button>
  );
}
