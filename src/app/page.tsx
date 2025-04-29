"use client";
import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";

import {DifficultyLevel} from "src/models/difficulty";
import Footer from "src/components/Footer";
import LoadingSpinner from "src/components/LoadingSpinner";
import TypewriterText from "src/components/TypeWriterText";
import LanguageButton from "src/components/LanguageButton";
import DifficultySelector from "src/components/DifficultySelector";

import "./i18n";

export default function Home() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("normal");
  const [isStarting, setIsStarting] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const router = useRouter();

  const {t} = useTranslation();

  function createGame() {
    setIsStarting(true);
    const gameID = Math.random().toString(36).substring(2, 8);

    setTimeout(() => {
      router.push(`/game/${gameID}?difficulty=${difficulty}`);
    }, 500);
  }

  useEffect(() => {
    const fontPromise = document.fonts.ready;

    Promise.all([
      fontPromise,

      new Promise((resolve) => setTimeout(resolve, 500)),
    ]).then(() => {
      setPageLoaded(true);
    });
  }, []);

  if (!pageLoaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center text-gray-100 text-center">
      <div className="flex items-center justify-center ">
        <TypewriterText text="Type-Battle" className="font-bold" />
      </div>
      <p className="text-sm lg:text-lg text-gray-300 mb-1 lg:mb-4 opacity-40">
        {t("messages.proveYourself")}
      </p>

      <LanguageButton />

      {!isStarting ? (
        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      ) : (
        <LoadingSpinner text={t("messages.preparing")} />
      )}

      <button
        onClick={createGame}
        disabled={isStarting}
        className="w-40 lg:w-48 text-white font-bold py-2 px-4 mt-4 rounded border-2 border-white hover:opacity-50 transition-opacity duration-300"
      >
        {isStarting ? t("button.starting") : t("button.startGame")}
      </button>

      <Footer />
    </main>
  );
}
