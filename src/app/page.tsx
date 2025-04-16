"use client";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

import {DifficultyLevel} from "src/models/difficulty";
import LoadingSpinner from "src/components/LoadingSpinner";
import DifficultySelector from "src/components/DifficultySelector";
import Footer from "src/components/Footer";
import ASCIIText from "src/components/ASCIIText";

export default function Home() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("normal");
  const [isStarting, setIsStarting] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const router = useRouter();

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
      <div className="relative h-40 w-[800px]">
        <ASCIIText
          text="Type Battle"
          enableWaves={false}
          asciiFontSize={3}
          textColor="#FAFAFA"
        />
      </div>
      <p className="text-lg text-gray-300 mb-4 opacity-40">
        Prove yourself, youngling.
      </p>

      {!isStarting ? (
        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      ) : (
        <LoadingSpinner text="Preparing the battlefield..." />
      )}

      <button onClick={createGame} disabled={isStarting}>
        {isStarting ? "Starting..." : "Start game"}
      </button>

      <Footer />
    </main>
  );
}
