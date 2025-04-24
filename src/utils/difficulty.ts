export const DIFFICULTY_SETTINGS = {
  custom: {
    timeGame: 45,
    wordsQuantity: 20,
    label: "Custom",
    description: "Create your own challenge",
    wordMinLength: 3,
    wordMaxLength: 10,
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
    timeGame: 25,
    wordsQuantity: 30,
    label: "Master",
    description: "Prove yourself to the typing gods",
    wordMinLength: 5,
    wordMaxLength: 14,
  },
};
