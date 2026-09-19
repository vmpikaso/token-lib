export type SeparatorItem = { label: string; value: string };

export const SEPARATORS = {
  COMMA: { label: "Virgule", value: "," },
  SEMICOLON: { label: "Point-virgule", value: ";" },
} as const satisfies Record<string, SeparatorItem>;

export type Separator = (typeof SEPARATORS)[keyof typeof SEPARATORS]["value"];
