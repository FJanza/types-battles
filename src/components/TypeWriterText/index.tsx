import React from "react";

import styles from "./TypeWriterText.module.css";
import {TypewriterTextProps} from "./types";

export default function TypewriterText({
  text,
  className = "",
}: TypewriterTextProps) {
  return (
    <div className={`${styles.typewriterContainer} ${className}`}>
      <h1 className={`${styles.typewriter}`}>{text}</h1>
    </div>
  );
}
