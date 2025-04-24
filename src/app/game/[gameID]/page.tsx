"use client";
import React from "react";
import {useSearchParams} from "next/navigation";

import TypeBox from "src/components/TypeBox";
import {DifficultyLevel} from "src/models/difficulty";
import {DIFFICULTY_SETTINGS} from "src/utils/difficulty";

export default function GamePage() {
  const searchParams = useSearchParams();

  const difficulty = (
    Object.keys(DIFFICULTY_SETTINGS).includes(
      searchParams.get("difficulty") || ""
    )
      ? searchParams.get("difficulty")
      : "normal"
  ) as DifficultyLevel;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 lg:p-24 ">
      <div className="w-full max-w-4xl">
        <TypeBox difficulty={difficulty} />
      </div>
    </main>
  );
}
