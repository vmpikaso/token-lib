import type { Operator } from "../constants/operators.js";
import type { Separator } from "../constants/separator.js";
import type { IAnyToken } from "./any.token.js";
import type { TokenType, TokenTypes, TokenValue } from "./utils.js";

export interface IToken<T extends TokenType = TokenType, U extends TokenValue = string> {
  type: T;
  value: U;
  hidden: boolean;
  getId(): number;
  getTitle(): string;
  toString(): string;
  isValid(): boolean;
}

export type ITokenData<T extends TokenType = TokenType, U extends TokenValue = string> = Pick<
  IToken<T, U>,
  "type" | "value" | "hidden"
>;
export type TextTokenType = TokenTypes["TEXT" | "COMMA" | "SPACE" | "JUMPLINE" | "SEPARATOR" | "NUMBER"];
export type ContainerTokenType = TokenTypes["HOOK" | "BRACKET" | "PARENTHESE" | "QUOTE"];

export interface ITextToken extends IToken<TextTokenType> {}

export interface IOperatorToken extends IToken<TokenTypes["OPERATOR"], Operator> {}

export interface IFieldToken extends IToken<TokenTypes["FIELD"]> {
  options: string[];
  addQuote?: boolean;
  parent?: string;
}

export interface IListToken extends IToken<TokenTypes["LIST"]> {
  children: IAnyToken[];
  parent: string[];
  alias: string;
  jumpLine: boolean;
}

export interface IColumnToken extends IToken<TokenTypes["COLUMN"]> {
  content: IAnyToken[];
}

export interface IHeaderToken extends IToken<TokenTypes["HEADER"]> {
  content: string[];
  separator: Separator;
}

export interface IHeaderWithListToken extends IToken<TokenTypes["HEADER_WITH_LIST"]> {
  list?: IListToken;
  separator: Separator;
  columns: IColumnToken[];
}

export interface IExpressionToken extends IToken<TokenTypes["EXPRESSION"]> {
  expression: IAnyToken[];
}

export interface IConditionToken extends IToken<TokenTypes["CONDITION"]> {
  then: IAnyToken[];
  else: IAnyToken[];
  condition: IExpressionToken;
}

export interface IContainerToken extends IToken<ContainerTokenType> {
  content: IAnyToken[];
}
