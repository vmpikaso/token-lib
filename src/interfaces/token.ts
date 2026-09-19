import type { Operator } from "../constants/operators.js";
import type { Separator } from "../constants/separator.js";
import type { ITokenGlobal } from "./token-global.js";
import type { TokenType, TokenTypes, TokenValue } from "./utils.js";

export interface IToken<T extends TokenType = TokenType, U extends TokenValue = string> {
  type: T;
  value: U;
  hidden: boolean;
}
export type ITokenTextType = TokenTypes["TEXT" | "COMMA" | "SPACE" | "JUMPLINE" | "SEPARATOR" | "NUMBER"];
export type ITokenContainerType = TokenTypes["HOOK" | "BRACKET" | "PARENTHESE" | "QUOTE"];

export interface ITokenText extends IToken<ITokenTextType> {}

export interface ITokenOperator extends IToken<TokenTypes["OPERATOR"], Operator> {}

export interface ITokenField extends IToken<TokenTypes["FIELD"]> {
  options: string[];
  addQuote?: boolean;
  parent?: string;
}

export interface ITokenList extends IToken<TokenTypes["LIST"]> {
  children: ITokenGlobal[];
  parent: string[];
  alias: string;
  jumpLine: boolean;
}

export interface ITokenColumn extends IToken<TokenTypes["COLUMN"]> {
  content: ITokenGlobal[];
}

export interface ITokenHeader extends IToken<TokenTypes["HEADER"]> {
  content: string[];
  separator: Separator;
}

export interface ITokenHeaderWithList extends IToken<TokenTypes["HEADER_WITH_LIST"]> {
  list?: ITokenList;
  separator: Separator;
  columns: ITokenColumn[];
}

export interface ITokenExpression extends IToken<TokenTypes["EXPRESSION"]> {
  expression: ITokenGlobal[];
}

export interface ITokenCondition extends IToken<TokenTypes["CONDITION"]> {
  then: ITokenGlobal[];
  else: ITokenGlobal[];
  condition: ITokenExpression;
}

export interface ITokenContainer extends IToken<ITokenContainerType> {
  content: ITokenGlobal[];
}
