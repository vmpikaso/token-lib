import type { TokenColumn } from "../class/token-column.js";
import type { TokenExpression } from "../class/token-expression.js";
import type { TokenList } from "../class/token-list.js";
import type { Operator } from "../constants/operators.js";
import type {
  IToken,
  ITokenColumn,
  ITokenCondition,
  ITokenContainer,
  ITokenContainerType,
  ITokenExpression,
  ITokenField,
  ITokenHeader,
  ITokenHeaderWithList,
  ITokenList,
  ITokenOperator,
} from "./token.js";
import type { TokenGlobal } from "./token-global.js";
import type { OmitStrict, OmitTokenKey, Prettify, TokenType, TokenValue } from "./utils.js";

type TokenConstructor<T, TOmit extends "value" | "hidden" | Exclude<keyof T, keyof IToken<TokenType, string>>, TExtra> = Prettify<
  OmitStrict<OmitTokenKey<T>, "value" | TOmit> & TExtra
>;

export type TokenExpressionConstructor = TokenConstructor<ITokenExpression, "expression", { expression?: TokenGlobal[] }>;

export type TokenConditionConstructor = TokenConstructor<
  ITokenCondition,
  "then" | "else" | "condition",
  { condition?: TokenExpression; thenBlock?: TokenGlobal[]; elseBlock?: TokenGlobal[] }
>;

export type TokenColumnConstructor = TokenConstructor<ITokenColumn, "content", { value?: string; content?: TokenGlobal[] }>;

export type TokenHeaderConstructor = TokenConstructor<ITokenHeader, "content", { content?: string[] }>;

export type TokenHeaderWithListConstructor = TokenConstructor<
  ITokenHeaderWithList,
  "columns" | "list",
  { columns?: TokenColumn[]; list?: TokenList }
>;

export type TokenContainerConstructor = TokenConstructor<
  ITokenContainer,
  "content",
  { content?: TokenGlobal[]; type?: ITokenContainerType }
>;

export type TokenListConstructor = TokenConstructor<ITokenList, "children", { value?: string; children?: TokenGlobal[] }>;

export type TokenOperatorConstructor = TokenConstructor<ITokenOperator, "value", { value?: Operator }>;

export type TokenFieldConstructor = TokenConstructor<ITokenField, "value", { value?: string }>;

export type BaseTokenConstructor<T extends TokenType = TokenType, U extends TokenValue = string> = Partial<IToken<T, U>>;
