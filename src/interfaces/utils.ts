import type { TOKEN_TYPE } from "../constants/token.type.js";
import type { IAnyToken } from "./any.token.js";
import type { IToken, ITokenData } from "./token.js";

export type Hidden<T> = T & { hidden?: boolean };
export type Prettify<T> = { [K in keyof T]: T[K] } & {};
export type OmitStrict<T extends {}, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TokenValue = string | IAnyToken | IAnyToken[];
export type TokenTypes = typeof TOKEN_TYPE;
export type TokenType = TokenTypes[keyof TokenTypes];
export type OmitTokenKey<T> = Prettify<Hidden<Pick<ITokenData, "value"> & Partial<Omit<T, keyof IToken>>>>;
