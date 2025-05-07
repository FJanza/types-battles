export const DIFFICULTY = {
  CUSTOM: "custom",
  NORMAL: "normal",
  HARD: "hard",
  MASTER: "master",
} as const;

export type DifficultyLevelKey = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

export const DIFFICULTY_SETTINGS: Record<
  DifficultyLevelKey,
  {
    timeGame: number;
    wordsQuantity: number;
    label: string;
    wordMinLength: number;
    wordMaxLength: number;
  }
> = {
  [DIFFICULTY.CUSTOM]: {
    timeGame: 45,
    wordsQuantity: 20,
    label: "custom",
    wordMinLength: 3,
    wordMaxLength: 10,
  },
  [DIFFICULTY.NORMAL]: {
    timeGame: 30,
    wordsQuantity: 15,
    label: "normal",
    wordMinLength: 3,
    wordMaxLength: 10,
  },
  [DIFFICULTY.HARD]: {
    timeGame: 25,
    wordsQuantity: 25,
    label: "hard",
    wordMinLength: 5,
    wordMaxLength: 12,
  },
  [DIFFICULTY.MASTER]: {
    timeGame: 25,
    wordsQuantity: 30,
    label: "master",
    wordMinLength: 5,
    wordMaxLength: 14,
  },
};
