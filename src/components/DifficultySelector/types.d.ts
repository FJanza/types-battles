import {DifficultyLevel} from "src/models/difficulty";

export interface DifficultySelectorProps {
  difficulty: DifficultyLevel;
  setDifficulty: (difficulty: DifficultyLevel) => void;
}
