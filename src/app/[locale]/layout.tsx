import Header from "@/components/header";
import { locales } from "@/constants/locales";
import clsx from "clsx";
import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  variable: "--font-display",
  subsets: ["latin"],
});
const openSans = Open_Sans({
  weight: ["400", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | MyVideoGameList",
    default: "MyVideoGameList",
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html
      lang={locale}
      className={clsx(poppins.variable, openSans.variable, "light")}
    >
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
