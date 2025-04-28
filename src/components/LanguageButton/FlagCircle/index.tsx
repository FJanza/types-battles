/* eslint-disable @next/next/no-img-element */
import React from "react";

import {FlagCircleProps} from "./types";

export default function FlagCircle({
  src,
  size = 32,
  alt = "Flag",
  className,
}: FlagCircleProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
        width: size,
        height: size,
        display: "inline-block",
        border: "1px solid #eee",
        background: "#fff",
      }}
      className={className}
    />
  );
}
