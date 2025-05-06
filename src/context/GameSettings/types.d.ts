export interface GameSettingsContextType {
  difficulty: DifficultyLevel;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  datasetLanguage: string;
  setDatasetLanguage: (language: string) => void;
}
