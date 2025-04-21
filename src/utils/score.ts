interface calculateScoreProps {
  correctWords: number;
  correctLetter: number;
  incorrectLetter: number;
  totalAvailableLetters: number;
  gameTime: number;
  spareTime: number;
}

/**
 * Calculate the score based on the given parameters.
 * @param correctWords - The number of correct words typed.
 * @param correctLetter - The number of correct letters typed.
 * @param incorrectLetter - The number of incorrect letters typed.
 * @param totalAvailableLetters - The total number of letters available in the game.
 * @param gameTime - The total time available of the game in seconds.
 * @param spareTime - The time remaining when the game ended in seconds.
 */

export function calculateScore({
  correctWords,
  correctLetter,
  incorrectLetter,
  totalAvailableLetters,
  gameTime,
  spareTime,
}: calculateScoreProps) {
  const totalLetters = correctLetter + incorrectLetter;

  const completionRate =
    totalAvailableLetters > 0
      ? (totalLetters / totalAvailableLetters) * 100
      : 0;

  const accuracy = totalLetters > 0 ? (correctLetter / totalLetters) * 100 : 0;

  const wpm = (correctWords * 60) / gameTime;

  const totalScore =
    (correctLetter + gameTime) * wpm * ((accuracy + completionRate) / 2);

  return {
    wpm,
    accuracy: accuracy.toFixed(2),
    completionRate: completionRate.toFixed(2),
    totalScore,
    spareTime,
  };
}
