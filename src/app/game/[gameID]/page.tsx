"use client";
import React from "react";

import TypeBox from "src/components/TypeBox";
import {useGameSettings} from "src/context/GameSettings";

export default function GamePage() {
  const {difficulty, datasetLanguage} = useGameSettings();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 lg:p-24 ">
      <div className="w-full max-w-4xl">
        <TypeBox difficulty={difficulty} datasetLanguage={datasetLanguage} />
      </div>
    </main>
  );
}
