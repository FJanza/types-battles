export interface Difficulty {
  timeGame: number;
  wordsQuantity: number;
  label: string;
  description: string;
  wordMinLength: number;
  wordMaxLength: number;
}

export type DifficultyLevel = "easy" | "normal" | "hard" | "master";
