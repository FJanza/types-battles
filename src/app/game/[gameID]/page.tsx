"use client";
import React from "react";
import {useSearchParams} from "next/navigation";

import TypeBox from "src/components/TypeBox";
import {DifficultyLevel} from "src/models/difficulty";
import {DIFFICULTY_SETTINGS} from "src/utils/difficulty";

export default function GamePage() {
  const searchParams = useSearchParams();

  // TODO capaz no es la mejor manera de manejar dificultad, pero para probar rapido sirve
  const difficulty = (
    Object.keys(DIFFICULTY_SETTINGS).includes(
      searchParams.get("difficulty") || ""
    )
      ? searchParams.get("difficulty")
      : "normal"
  ) as DifficultyLevel;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-4xl">
        {/* No se si queres mostra el id, pero de momento me parece mas facha no mostrarlo */}
        {/* <h1 className="text-2xl font-bold mb-2">Game ID: {gameID}</h1> */}

        <TypeBox difficulty={difficulty} />
      </div>
    </main>
  );
}
