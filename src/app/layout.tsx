import type {Metadata} from "next";
import {Space_Mono} from "next/font/google";

import "./globals.css";

import {detectLanguage} from "src/i18n/server";
import {I18nProvider} from "src/i18n/i18n-context";
import {GameSettingsProvider} from "src/context/GameSettings";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lng = await detectLanguage();

  return (
    <html lang={lng}>
      <body className={inter.className}>
        <GameSettingsProvider>
          <I18nProvider language={lng}>{children}</I18nProvider>
        </GameSettingsProvider>
      </body>
    </html>
  );
}
