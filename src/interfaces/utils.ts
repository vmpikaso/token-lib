import type { OPERATOR } from "../constants/operators.js";
import type { OUTPUT_FORMAT } from "../constants/output-format.js";
import type { SEPARATOR } from "../constants/separator.js";
import type { TOKEN_TYPE } from "../constants/token-type.js";
import type { IToken } from "./token.js";
import type { ITokenGlobal, TokenGlobal } from "./token-global.js";

export type Hidden<T> = T & { hidden?: boolean };
export type Prettify<T> = { [K in keyof T]: T[K] } & {};
export type OmitStrict<T extends {}, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TokenValue = string | ITokenGlobal | ITokenGlobal[];
export type TokenType = typeof TOKEN_TYPE;
export type TokenTypeValue = TokenType[keyof TokenType];
export type OmitTokenKey<T> = Prettify<Hidden<OmitStrict<IToken, "type" | "hidden"> & Partial<Omit<T, keyof IToken>>>>;
export type Separator = (typeof SEPARATOR)[keyof typeof SEPARATOR]["value"];
export type OutputFormat = typeof OUTPUT_FORMAT;
export type OutputFormatValue = OutputFormat[keyof OutputFormat];
export type UnionFormat = Prettify<OutputFormatValue | TokenTypeValue>;
export type Operator = typeof OPERATOR;
export type OperatorValue = Operator[keyof Operator]["value"];

// Fonction qui retourne le message d'erreur à afficher
export const ERROR_MSG = (type: string) => `(Élément de type: ${type} mal rempli)`;

// Fonction qui retourne le tableau sous forme de chaine de caractère.
export function ArrayToString(array: TokenGlobal[]) {
  return array.reduce((acc, curr) => acc + curr.toString(), "");
}
