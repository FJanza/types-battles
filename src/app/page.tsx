"use client";
import {useEffect, useRef, useState} from "react";
import {WORDS} from "src/utils/constants";

export default function Home() {
  const INITIAL_TIME = 300; //segundos
  let currentTime = INITIAL_TIME;

  const $paragraph = useRef<HTMLParagraphElement>(null);
  const $input = useRef<HTMLInputElement>(null);
  const $time = useRef<HTMLTimeElement>(null);

  const [gameOverState, setGameOverState] = useState(false);
  const [gameOverData, setGameOverData] = useState<{
    wpm: number;
    accuracy: string;
  }>();

  let playing: boolean;
  let words: any = [];

  function initGame() {
    setGameOverState(false);
    $input.current!.value = "";

    playing = false;

    words = WORDS.toSorted(() => Math.random() - 0.5).slice(0, 32);

    $paragraph.current!.innerHTML = words
      .map((word: string, index: number) => {
        const letters = word.split("");
        return `<tb-word ${index === 0 ? "class=active" : ""}>${letters
          .map(
            (letter: string, indexLetter: number) =>
              `<tb-letter ${
                index === 0 && indexLetter === 0 ? "class=active" : ""
              }>${letter}</tb-letter>`
          )
          .join("")}</tb-word>`;
      })
      .join("");
  }

  function initEvents() {
    document.addEventListener("keydown", () => {
      $input.current!.focus();
      if (!playing) {
        playing = true;
        const intervalId = setInterval(() => {
          currentTime--;
          $time.current!.textContent = String(currentTime);

          if (currentTime === 0) {
            clearInterval(intervalId);
            gameOver();
          }
        }, 1000);
      }
    });
  }

  function onKeyDown(event: any) {
    $input.current?.focus();

    const $currentWord = $paragraph.current!.querySelector("tb-word.active");
    const $currentLetter = $currentWord!.querySelector("tb-letter.active");

    const {key} = event;
    if (key === " ") {
      event.preventDefault();

      const $nextWord = $currentWord!.nextElementSibling;
      const $nextLetter = $nextWord!.querySelector("tb-letter");

      console.log({$nextWord}, {$currentWord});

      $currentWord!.classList.remove("active", "marked");
      $currentLetter!.classList.remove("active");

      $nextWord!.classList.add("active");
      $nextLetter!.classList.add("active");

      $input.current!.value = "";

      const hasMissedLetters =
        $currentWord!.querySelectorAll("tb-letter:not(.correct)").length > 0;

      const classToAdd = hasMissedLetters ? "marked" : "correct";

      $currentWord!.classList.add(classToAdd);
      return;
    }
    if (key === "Backspace") {
      const $prevWord = $currentWord!.previousElementSibling;
      const $prevLetter = $currentLetter?.previousElementSibling;

      if (!$prevWord && !$prevLetter) {
        event.preventDefault();
        return;
      }
      const $wordMarked = $paragraph.current!.querySelector("tb-word.marked");
      if ($wordMarked && !$prevLetter) {
        event.preventDefault();

        $prevWord?.classList.remove("marked");
        $prevWord?.classList.add("active");

        const $letterToGo = $prevWord?.querySelector("tb-letter:last-child");

        $currentLetter?.classList.remove("active");
        $letterToGo?.classList.add("active");

        $input.current!.value = [
          ...$prevWord!.querySelectorAll(
            "tb-letter.correct, tb-letter.incorrect"
          ),
        ]
          .map(($el) => {
            return $el.classList.contains("correct") ? $el.textContent : "+";
          })
          .join("");
      }
    }
  }

  function onKeyUp() {
    const $currentWord = $paragraph.current!.querySelector("tb-word.active");
    const $currentLetter =
      $paragraph.current!.querySelector("tb-letter.active");

    const currentWord = $currentWord!.textContent!.trim();

    $input.current?.setAttribute("maxLength", String(currentWord?.length));

    const $allLetters = $currentWord!.querySelectorAll("tb-letter");

    $allLetters.forEach(($letter) =>
      $letter.classList.remove("correct", "incorrect")
    );

    $input.current?.value.split("").forEach((char, index) => {
      const $letter = $allLetters[index];
      const letterToCheck = currentWord[index];

      const isCorrect = char === letterToCheck;

      const letterClass = isCorrect ? "correct" : "incorrect";

      $letter?.classList.add(letterClass);
    });

    $currentLetter?.classList.remove("active", "is-last");

    const inputLength = $input.current!.value.length;

    const $nextActiveLetter = $allLetters[inputLength];

    if ($nextActiveLetter) {
      $nextActiveLetter.classList.add("active");
    } else {
      $currentLetter!.classList.add("active", "is-last");

      const $nextWord = $currentWord!.nextElementSibling;

      if (!$nextWord) gameOver();
    }
  }

  function gameOver() {
    const correctWords =
      $paragraph.current!.querySelectorAll("tb-word.correct").length;
    const correctLetter =
      $paragraph.current!.querySelectorAll("tb-letter.correct").length;
    const incorrectLetter = $paragraph.current!.querySelectorAll(
      "tb-letter.incorrect"
    ).length;

    const totalLetters = correctLetter + incorrectLetter;

    const accuracy =
      totalLetters > 0 ? (correctLetter / totalLetters) * 100 : 0;

    const wpm = (correctWords * 60) / INITIAL_TIME;

    setGameOverData({wpm, accuracy: accuracy.toFixed(2)});
    setGameOverState(true);
  }

  useEffect(() => {
    initGame();

    initEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className={gameOverState ? "hidden" : "flex"}>
        <input autoFocus ref={$input} onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
        <p ref={$paragraph}></p>
        <time ref={$time}></time>
      </section>

      <section className={!gameOverState ? "hidden" : "flex"}>
        <h2>WPM</h2>
        <h3>{gameOverData?.wpm}</h3>
        <h2>Accuracy</h2>
        <h3>{gameOverData?.accuracy}%</h3>
        <button onClick={() => initGame()}>retry</button>
      </section>
    </main>
  );
}
