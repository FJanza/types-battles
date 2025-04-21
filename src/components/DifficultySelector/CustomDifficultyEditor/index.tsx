import React, {useEffect} from "react";
import {X} from "lucide-react";

import {Difficulty} from "src/models/difficulty";
import RangeInput from "src/components/RangeInput";

import {CustomDifficultyEditorProps} from "./types";

/**
 * @param {CustomDifficultyEditorProps} props - The props for the component.
 * @param {Difficulty} props.settings - The current difficulty settings to be customized.
 * @param {(updatedSettings: Difficulty) => void} props.onSettingsChange -
 * A callback function triggered when any of the settings are updated.
 * @param {() => void} props.onSave - A callback function triggered when the user
 * clicks the "Apply Custom Settings" button to save the changes.
 * @param {boolean} props.isOpen - Whether the modal is open or closed.
 * @param {() => void} props.onClose - Function to close the modal.
 *
 * @returns {JSX.Element | null} The rendered CustomDifficultyEditor component or null when closed.
 */

export default function CustomDifficultyEditor({
  settings,
  onSettingsChange,
  onSave,
  isOpen,
  onClose,
}: CustomDifficultyEditorProps): JSX.Element | null {
  const handleChange = (field: keyof Difficulty, value: number) => {
    onSettingsChange({
      ...settings,
      [field]: value,
    });
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 ">
        <div className="flex p-2 gradient-border-container">
          <div
            className="bg-gray-800 p-6 rounded-md max-w-md w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl text-white">
                Customize Your Challenge
              </h3>
              <button
                onClick={onClose}
                className="text-white hover:bg-gray-700 hover:text-gray-200 p-2 rounded-full transition-colors duration-200 ml-10"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-5 mb-6">
              <RangeInput
                label="Game Time"
                value={settings.timeGame}
                min={10}
                max={120}
                step={5}
                unit="seconds"
                onChange={(value) => handleChange("timeGame", value)}
                accentColor="accent-brand-blue-300"
              />
              <RangeInput
                label="Number of Words"
                value={settings.wordsQuantity}
                min={5}
                max={50}
                step={5}
                unit="words"
                onChange={(value) => handleChange("wordsQuantity", value)}
                accentColor="accent-brand-red-300"
              />
              <RangeInput
                label="Min Word Length"
                value={settings.wordMinLength}
                min={2}
                max={settings.wordMaxLength - 1}
                unit="letters"
                onChange={(value) => handleChange("wordMinLength", value)}
                accentColor="accent-brand-blue-300"
              />
              <RangeInput
                label="Max Word Length"
                value={settings.wordMaxLength}
                min={settings.wordMinLength + 1}
                max={20}
                unit="letters"
                onChange={(value) => handleChange("wordMaxLength", value)}
                accentColor="accent-brand-red-300"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="w-1/2 text-white bg-gray-600 font-bold py-2 px-4 rounded border-2 border-white hover:opacity-90 transition-opacity"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-1/2  text-white font-bold py-2 px-4 rounded border-2 border-white hover:opacity-50 transition-opacity duration-300"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
