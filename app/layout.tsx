import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import AdminKeyListener from "./components/AdminKeyListener";
import { LangProvider } from "./lib/lang-context";
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
        <Providers>
          <LangProvider>
            <AdminKeyListener />
            <LangToggle />
            {children}
          </LangProvider>
        </Providers>
      </body>
    </html>
  );
}
