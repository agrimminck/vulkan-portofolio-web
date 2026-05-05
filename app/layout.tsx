import type { Metadata } from "next";
import "./globals.css";
import AdminKeyListener from "./components/AdminKeyListener";
import LangToggle from "./components/LangToggle";

export const metadata: Metadata = {
  title: "Portfolio — Multiverse",
  description:
    "One portfolio, five distinct worlds. Idyllic MMO, Basilisk apps, and everything in between.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminKeyListener />
        <LangToggle />
        {children}
      </body>
    </html>
  );
}
