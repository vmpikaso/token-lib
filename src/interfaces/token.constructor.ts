import type { ColumnToken } from "../class/column.token.js";
import type { ExpressionToken } from "../class/expression.token.js";
import type { ListToken } from "../class/list.token.js";
import type { Operator } from "../constants/operators.js";
import type { AnyToken } from "./any.token.js";
import type {
  ContainerTokenType,
  IColumnToken,
  IConditionToken,
  IContainerToken,
  IExpressionToken,
  IFieldToken,
  IHeaderToken,
  IHeaderWithListToken,
  IListToken,
  IOperatorToken,
  IToken,
  ITokenData,
} from "./token.js";
import type { OmitStrict, OmitTokenKey, Prettify, TokenType, TokenValue } from "./utils.js";

type TokenConstructor<T, TOmit extends "value" | "hidden" | Exclude<keyof T, keyof IToken<TokenType, string>>, TExtra> = Prettify<
  OmitStrict<OmitTokenKey<T>, "value" | TOmit> & TExtra
>;

export type ExpressionTokenConstructor = TokenConstructor<IExpressionToken, "expression", { expression?: AnyToken[] }>;

export type ConditionTokenConstructor = TokenConstructor<
  IConditionToken,
  "then" | "else" | "condition",
  { condition?: ExpressionToken; thenBlock?: AnyToken[]; elseBlock?: AnyToken[] }
>;

export type ColumnTokenConstructor = TokenConstructor<IColumnToken, "content", { value?: string; content?: AnyToken[] }>;

export type HeaderTokenConstructor = TokenConstructor<IHeaderToken, "content", { content?: string[] }>;

export type HeaderWithListTokenConstructor = TokenConstructor<
  IHeaderWithListToken,
  "columns" | "list",
  { columns?: ColumnToken[]; list?: ListToken }
>;

export type ContainerTokenConstructor = TokenConstructor<
  IContainerToken,
  "content",
  { content?: AnyToken[]; type?: ContainerTokenType }
>;

export type ListTokenConstructor = TokenConstructor<IListToken, "children", { value?: string; children?: AnyToken[] }>;

export type OperatorTokenConstructor = TokenConstructor<IOperatorToken, "value", { value?: Operator }>;

export type FieldTokenConstructor = TokenConstructor<IFieldToken, "value", { value?: string }>;

export type BaseTokenConstructor<T extends TokenType = TokenType, U extends TokenValue = string> = Prettify<
  Pick<ITokenData<T, U>, "type" | "value"> & { hidden?: boolean }
>;
