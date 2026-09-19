import type { TOKEN_TYPE } from "../constants/token-type.js";
import type { IToken } from "./token.js";
import type { ITokenGlobal, TokenGlobal } from "./token-global.js";

export type Hidden<T> = T & { hidden?: boolean };
export type Prettify<T> = { [K in keyof T]: T[K] } & {};
export type OmitStrict<T extends {}, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TokenValue = string | ITokenGlobal | ITokenGlobal[];
export type TokenTypes = typeof TOKEN_TYPE;
export type TokenType = TokenTypes[keyof TokenTypes];
export type OmitTokenKey<T> = Prettify<Hidden<OmitStrict<IToken, "type" | "hidden"> & Partial<Omit<T, keyof IToken>>>>;

// Fonction qui retourne le message d'erreur à afficher
export const ERROR_MSG = (type: string, hidden = false) => `(Élément ${hidden ? "caché " : ""}de type ${type} mal rempli)`;

// Fonction qui retourne le tableau sous forme de chaine de caractère.
export function ArrayToString(array: TokenGlobal[]) {
  return array.reduce((acc, curr) => acc + curr.toString(), "");
}
