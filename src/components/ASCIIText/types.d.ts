export interface ASCIITextProps {
  text?: string;
  asciiFontSize?: number;
  textFontSize?: number;
  textColor?: string;
  planeBaseHeight?: number;
  enableWaves?: boolean;
}

export interface CanvAsciiOptions {
  text: string;
  asciiFontSize: number;
  textFontSize: number;
  textColor: string;
  planeBaseHeight: number;
  enableWaves: boolean;
}

export interface CanvasTxtOptions {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

export interface AsciiFilterOptions {
  fontSize?: number;
  fontFamily?: string;
  charset?: string;
  invert?: boolean;
}
