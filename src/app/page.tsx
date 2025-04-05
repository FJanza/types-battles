"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

import {DifficultyLevel} from "src/models/difficulty";
import LoadingSpinner from "src/components/LoadingSpinner";
import DifficultySelector from "src/components/DifficultySelector";

export default function Home() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("normal");
  const [isStarting, setIsStarting] = useState(false);

  const router = useRouter();

  function createGame() {
    setIsStarting(true);
    const gameID = Math.random().toString(36).substring(2, 8);

    setTimeout(() => {
      router.push(`/game/${gameID}?difficulty=${difficulty}`);
    }, 500);
  }

  return (
    <main className="flex min-h-screen flex-col items-center text-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4 text-fuchsia-400">
        Types Battles
      </h1>
      <p className="text-lg text-gray-300 mb-4">Prove yourself, youngling.</p>

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
    </main>
  );
}
