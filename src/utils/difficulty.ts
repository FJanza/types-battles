export const DIFFICULTY_SETTINGS = {
  easy: {
    timeGame: 60,
    wordsQuantity: 10,
    label: "Easy",
    description: "More time, less words",
    wordMinLength: 2,
    wordMaxLength: 5,
  },
  normal: {
    timeGame: 30,
    wordsQuantity: 15,
    label: "Normal",
    description: "Default experience",
    wordMinLength: 3,
    wordMaxLength: 10,
  },
  hard: {
    timeGame: 25,
    wordsQuantity: 25,
    label: "Hard",
    description: "Less time, more words",
    wordMinLength: 5,
    wordMaxLength: 12,
  },
  master: {
    timeGame: 20,
    wordsQuantity: 30,
    label: "Master",
    description: "Prove yourself to the typing gods",
    wordMinLength: 7,
    wordMaxLength: 14,
  },
};
