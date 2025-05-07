import {DatasetLanguageKey} from "src/i18n/settings";
import {DifficultyLevel} from "src/models/difficulty";

export interface GameSettingsContextType {
  difficulty: DifficultyLevel;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  datasetLanguage: DatasetLanguageKey;
  setDatasetLanguage: (language: DatasetLanguageKey) => void;
}
