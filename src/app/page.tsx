"use client";
import {createContext, useState} from "react";
import TypeBox from "src/components/TypeBox";
import {TypeBoxProps} from "src/components/TypeBox/types";
import {DEFAULT_GAME_SETTINGS} from "src/utils/constants";

export default function Home() {
  const [setGame, setSetGame] = useState<TypeBoxProps>(DEFAULT_GAME_SETTINGS);

  return <div></div>;
}
