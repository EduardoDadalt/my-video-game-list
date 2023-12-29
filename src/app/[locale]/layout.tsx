import Header from "@/components/header";
import clsx from "clsx";
import { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { locales } from "@/containts/locales";

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
    <html lang={locale} className={clsx(poppins.variable, openSans.variable)}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
