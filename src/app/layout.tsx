import type {Metadata} from "next";
import {Space_Mono} from "next/font/google";

import "./globals.css";

import LanguageInitializer from "src/components/LanguageInitializer";

const inter = Space_Mono({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Type Battle",
  description: "Game of fast typing",
  keywords: [
    "touch a key,press a key",
    "key",
    "battle, game, multiplayer",
    "online",
    "friends",
    "competition",
    "challenge",
    "high score",
    "leaderboard",
    "social",
    "fun",
    "addictive",
    "casual",
    "free",
    "beautifull",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LanguageInitializer />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
