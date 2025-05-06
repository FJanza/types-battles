export interface TypeBoxProps {
  difficulty?: DifficultyLevel;
  initialTime?: number;
  wordsQuantity?: number;
  datasetLanguage?: string;
}

export type WordsDataset = {[key: string]: string[]};
