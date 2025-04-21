import {Difficulty} from "src/models/difficulty";

export interface CustomDifficultyEditorProps {
  settings: Difficulty;
  onSettingsChange: (updatedSettings: Difficulty) => void;
  onSave: () => void;
  isOpen: boolean;
  onClose: () => void;
}
