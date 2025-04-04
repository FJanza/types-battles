"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

import {DifficultyLevel} from "src/models/difficulty";
import {DIFFICULTY_SETTINGS} from "src/utils/difficulty";
import LoadingSpinner from "src/components/LoadingSpinner";

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
      <p className="text-lg text-gray-300 mb-4">Try yourself, youngling.</p>

      {!isStarting ? (
        <div className="w-full max-w-md p-6 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Choose Difficulty
          </h2>
          <div className="flex flex-wrap lg:grid lg:grid-cols-2 gap-3">
            {Object.entries(DIFFICULTY_SETTINGS).map(([key, value]) => (
              <div
                key={key}
                className={`p-3 border-2 rounded-md cursor-pointer transition-colors bg-gray-700 hover:bg-gray-600 text-gray-200 ${
                  difficulty === key ? "border-fuchsia-700" : "border-gray-600"
                }`}
                onClick={() => setDifficulty(key as DifficultyLevel)}
              >
                <h3 className="font-bold text-white">{value.label}</h3>
                <p className="text-sm text-gray-300">{value.description}</p>
                <div className="text-xs mt-2 text-gray-400">
                  {value.timeGame}s / {value.wordsQuantity} words
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoadingSpinner text="Preparing the battlefield..." />
      )}

      <button onClick={createGame} disabled={isStarting}>
        {isStarting ? "Starting..." : "Start game"}
      </button>
    </main>
  );
}
