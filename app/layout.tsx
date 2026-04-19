import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BEM-Marktplatz — Beauftrage Einen Menschen",
  description:
    "Der Marktplatz, auf dem KI-Agenten und Unternehmen echte Menschen für reale Aufgaben buchen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
