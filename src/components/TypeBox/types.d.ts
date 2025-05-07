import {DifficultyLevel} from "src/models/difficulty";

export interface TypeBoxProps {
  difficulty?: DifficultyLevel;
  initialTime?: number;
  wordsQuantity?: number;
  datasetLanguage?: DatasetLanguage;
}

export type WordsDataset = {[key: string]: string[]};

export type DatasetLanguage = "en" | "es";
