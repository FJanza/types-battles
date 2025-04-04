export const DIFFICULTY_SETTINGS = {
  easy: {
    timeGame: 90,
    wordsQuantity: 8,
    label: "Easy",
    description: "More time, less words",
    wordMinLength: 2,
    wordMaxLength: 5,
  },
  normal: {
    timeGame: 60,
    wordsQuantity: 10,
    label: "Normal",
    description: "Default experience",
    wordMinLength: 3,
    wordMaxLength: 7,
  },
  hard: {
    timeGame: 45,
    wordsQuantity: 15,
    label: "Hard",
    description: "Less time, more words",
    wordMinLength: 4,
    wordMaxLength: 10,
  },
  master: {
    timeGame: 30,
    wordsQuantity: 20,
    label: "Master",
    description: "Prove yourself to the typing gods",
    wordMinLength: 5,
    wordMaxLength: 12,
  },
};
