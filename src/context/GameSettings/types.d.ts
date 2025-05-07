import {DifficultyLevel} from "src/models/difficulty";
import {DatasetLanguageKey} from "src/utils/difficulty";

export interface GameSettingsContextType {
  difficulty: DifficultyLevel;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  datasetLanguage: string;
  setDatasetLanguage: (language: DatasetLanguageKey) => void;
}
