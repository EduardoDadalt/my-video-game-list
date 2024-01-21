import { nextui } from "@nextui-org/react";
import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: { ...colors.rose, DEFAULT: colors.rose[500] },
            danger: { ...colors.red, DEFAULT: colors.red[500] },
          },
        },
      },
    }),
  ],
} satisfies Config;
