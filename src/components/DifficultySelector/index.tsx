import React from "react";

import {DifficultyLevel} from "src/models/difficulty";
import {DIFFICULTY_SETTINGS} from "src/utils/difficulty";

import {DifficultySelectorProps} from "./types";

/**
 *
 * @param difficulty current difficulty level.
 * @param setDifficulty function to set the difficulty level.
 * @returns
 */

export default function DifficultySelector({
  difficulty,
  setDifficulty,
}: DifficultySelectorProps) {
  return (
    <div className="w-full max-w-md p-6 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4 text-gray-200">
        Choose Difficulty
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {Object.entries(DIFFICULTY_SETTINGS).map(([key, value]) => (
          <div
            key={key}
            className={`p-3 border-2 rounded-md cursor-pointer transition-colors bg-gray-700 hover:bg-gray-600 text-gray-200 flex flex-col justify-between  ${
              difficulty === key ? "border-fuchsia-400" : "border-gray-600"
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
  );
}
