/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {useRouter} from "next/navigation";
import React, {useEffect, useRef, useState} from "react";

import {WORDS_BY_LENGTH} from "src/utils/constants";
import {DIFFICULTY_SETTINGS} from "src/utils/difficulty";
import {GameOverData} from "src/models/gameOverData";
import {calculateScore} from "src/utils/score";

import {TypeBoxProps} from "./types";

const TypeBox = ({
  difficulty = "normal",
  initialTime,
  wordsQuantity,
}: TypeBoxProps) => {
  const settings =
    DIFFICULTY_SETTINGS[difficulty as keyof typeof DIFFICULTY_SETTINGS];
  const gameTime = initialTime || settings.timeGame;
  const wordCount = wordsQuantity || settings.wordsQuantity;

  const $paragraph = useRef<HTMLParagraphElement>(null);
  const $input = useRef<HTMLInputElement>(null);

  const [currentTime, setCurrentTime] = useState(gameTime);
  const [gameOverState, setGameOverState] = useState(false);
  const [gameOverData, setGameOverData] = useState<GameOverData>();
  const [playing, setPlaying] = useState(false);

  const router = useRouter();

  let words: any = [];

  function initGame() {
    setGameOverState(false);
    setCurrentTime(gameTime);
    $input.current!.value = "";

    setPlaying(false);

    const eligibleWords = [];
    for (
      let length = settings.wordMinLength;
      length <= settings.wordMaxLength;
      length++
    ) {
      if (WORDS_BY_LENGTH[length]) {
        eligibleWords.push(...WORDS_BY_LENGTH[length]);
      }
    }

    words = eligibleWords
      .toSorted(() => Math.random() - 0.5)
      .slice(0, wordCount);

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

    setPlaying(true);
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (playing && currentTime > 0) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId!);
            gameOver();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [playing]);

  function initEvents() {
    document.addEventListener("keydown", () => {
      if ($input.current) {
        $input.current.focus();
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

      if (!$nextWord) return;

      const $nextLetter = $nextWord!.querySelector("tb-letter");

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
    setPlaying(false);
    const correctWords =
      $paragraph.current!.querySelectorAll("tb-word.correct").length;
    const correctLetter =
      $paragraph.current!.querySelectorAll("tb-letter.correct").length;
    const incorrectLetter = $paragraph.current!.querySelectorAll(
      "tb-letter.incorrect"
    ).length;

    const totalAvailableLetters =
      $paragraph.current!.querySelectorAll("tb-letter").length;

    let timeLeft = currentTime === gameTime ? 0 : currentTime;

    const gameOverData = calculateScore({
      correctWords,
      correctLetter,
      incorrectLetter,
      totalAvailableLetters,
      gameTime,
      spareTime: timeLeft,
    });

    setGameOverData(gameOverData);
    setGameOverState(true);
  }

  useEffect(() => {
    initGame();
    initEvents();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="difficulty-badge mb-4 px-3 py-1 bg-fuchsia-100 text-fuchsia-800 rounded-full">
        {settings.label}
      </div>
      <section className={gameOverState ? "hidden" : "flex"}>
        <input autoFocus ref={$input} onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
        <p ref={$paragraph}></p>
        <time>{currentTime}</time>
      </section>

      <section className={!gameOverState ? "hidden" : "flex"}>
        <div className="flex flex-col items-center mb-2">
          <h1 className="text-xl mn-2">Score</h1>
          <h3 className="text-3xl">{gameOverData?.totalScore.toFixed(0)}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="opacity-40">Accuracy</h2>
            <h3>{gameOverData?.accuracy}%</h3>
          </div>
          <div>
            <h2 className="opacity-40">WPM</h2>
            <h3>{gameOverData?.wpm}</h3>
          </div>
          <div>
            <h2 className="opacity-40">Completion Rate</h2>
            <h3>{gameOverData?.completionRate}%</h3>
          </div>
          <div>
            <h2 className="opacity-40">Spare time</h2>
            <h3>{gameOverData?.spareTime} seconds</h3>
          </div>
        </div>
        <button
          onClick={() => {
            initGame();
          }}
        >
          Retry
        </button>
        <button
          onClick={() => {
            router.push("/");
          }}
        >
          Go Home
        </button>
      </section>
    </div>
  );
};

export default TypeBox;
