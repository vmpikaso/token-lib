import type { ITokenGlobal } from "./token-global.js";
import type { Separator, TokenType, TokenTypeValue, TokenValue } from "./utils.js";

export interface IToken<T extends TokenTypeValue = TokenTypeValue, U extends TokenValue = string> {
  type: T;
  value: U;
  hidden: boolean;
}
export type ITokenTextType = TokenType["TEXT" | "COMMA" | "SPACE" | "JUMPLINE" | "SEPARATOR" | "NUMBER"];
export type ITokenContainerType = TokenType["HOOK" | "BRACKET" | "PARENTHESE" | "QUOTE"];

export interface ITokenText extends IToken<ITokenTextType> {}

export interface ITokenOperator extends IToken<TokenType["OPERATOR"]> {}

export interface ITokenField extends IToken<TokenType["FIELD"]> {
  options: string[];
  addQuote?: boolean;
  parent?: string;
}

export interface ITokenList extends IToken<TokenType["LIST"]> {
  children: ITokenGlobal[];
  parent: string[];
  alias: string;
  jumpLine: boolean;
}

export interface ITokenColumn extends IToken<TokenType["COLUMN"]> {
  content: ITokenGlobal[];
}

export interface ITokenHeader extends IToken<TokenType["HEADER"]> {
  content: string[];
  separator: Separator;
}

export interface ITokenHeaderWithList extends IToken<TokenType["HEADER_WITH_LIST"]> {
  list?: ITokenList;
  separator: Separator;
  columns: ITokenColumn[];
}

export interface ITokenExpression extends IToken<TokenType["EXPRESSION"]> {
  expression: ITokenGlobal[];
}

export interface ITokenCondition extends IToken<TokenType["CONDITION"]> {
  then: ITokenGlobal[];
  else: ITokenGlobal[];
  condition: ITokenExpression;
}

export interface ITokenContainer extends IToken<ITokenContainerType> {
  content: ITokenGlobal[];
}
