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
      className={`
        rounded-full
        object-cover
        inline-block
        border
        border-[#eee]
        bg-white
        ${className}
      `}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
