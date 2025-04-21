import React from "react";

import {RangeInputProps} from "./types";

/**
 * A customizable range input component for selecting a numeric value within a specified range.
 *
 * @component
 * @param {string} label - The label displayed above the range input.
 * @param {number} value - The current value of the range input.
 * @param {number} min - The minimum value of the range input.
 * @param {number} max - The maximum value of the range input.
 * @param {number} [step=1] - The step increment for the range input.
 * @param {string} unit - The unit of measurement displayed next to the value.
 * @param {(value: number) => void} onChange - Callback function triggered when the value changes.
 * @param {string} [accentColor="accent-purple-500"] - Tailwind CSS class for the accent color of the range input.
 * @param {string} [trackColor="bg-gray-600"] - Tailwind CSS class for the track color of the range input.
 * @returns {JSX.Element} A styled range input component with a label, value display, and min/max indicators.
 */

export default function RangeInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  accentColor = "accent-purple-500",
  trackColor = "bg-gray-600",
}: RangeInputProps) {
  return (
    <div className="bg-gray-700 p-3">
      <div className="flex justify-between items-center mb-2">
        <label className="text-gray-200 font-medium">{label}</label>
        <span className="bg-gray-600 px-2 py-1 rounded text-white text-sm">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-2 ${trackColor} rounded-lg appearance-none cursor-pointer ${accentColor}`}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">
          {min}
          {unit === "seconds" ? "s" : ""}
        </span>
        <span className="text-xs text-gray-400">
          {max}
          {unit === "seconds" ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
