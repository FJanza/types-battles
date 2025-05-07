"use client";
import React, {createContext, useContext, useState, ReactNode} from "react";

import {DIFFICULTY, DifficultyLevelKey} from "src/utils/difficulty";

import {GameSettingsContextType} from "./types";
import {DatasetLanguageKey, LANGUAGE} from "src/i18n/settings";

/**
 * GameSettingsContext - Application-wide context for game configuration settings
 *
 * This context provides a central store for game settings such as difficulty level
 * and language dataset selection. It allows these settings to persist between
 * different pages and components without needing to pass props or use URL parameters.
 */
const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
  undefined
);

/**
 * GameSettingsProvider - Component that provides game settings to the application
 *
 * Wraps the application or a portion of it to provide access to game settings.
 * Initializes with default values (normal difficulty and English dataset).
 *
 * @param {ReactNode} children - Child components that will have access to the context
 */
export const GameSettingsProvider = ({children}: {children: ReactNode}) => {
  const [difficulty, setDifficulty] = useState<DifficultyLevelKey>(
    DIFFICULTY.NORMAL
  );
  const [datasetLanguage, setDatasetLanguage] = useState<DatasetLanguageKey>(
    LANGUAGE.EN
  );

  return (
    <GameSettingsContext.Provider
      value={{
        difficulty,
        setDifficulty,
        datasetLanguage,
        setDatasetLanguage,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useGameSettings must be used within a GameSettingsProvider"
    );
  }
  return context;
};
