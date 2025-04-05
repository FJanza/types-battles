import {LoadingSpinnerProps} from "./types";

/**
 *
 * @param text string to be desplayed under the spinner.
 * @returns
 */

const LoadingSpinner = ({text}: LoadingSpinnerProps) => {
  return (
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-16 w-16 border-t-4 border-b-4 border-fuchsia-500 rounded-full animate-spin mb-4" />
      {text && <p className="text-gray-400">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
