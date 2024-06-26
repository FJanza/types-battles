import type {Metadata} from "next";
import {Space_Mono} from "next/font/google";
import "./globals.css";

const inter = Space_Mono({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "TypesBattles",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
