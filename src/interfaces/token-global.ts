import type { Token } from "../class/token.js";
import type { TokenColumn } from "../class/token-column.js";
import type { TokenCondition } from "../class/token-condition.js";
import type { TokenContainer } from "../class/token-container.js";
import type { TokenExpression } from "../class/token-expression.js";
import type { TokenField } from "../class/token-field.js";
import type { TokenHeader } from "../class/token-header.js";
import type { TokenHeaderWithList } from "../class/token-header-with-list.js";
import type { TokenList } from "../class/token-list.js";
import type { TokenOperator } from "../class/token-operator.js";
import type { TokenText } from "../class/token-text.js";
import type {
  IToken,
  ITokenColumn,
  ITokenCondition,
  ITokenContainer,
  ITokenExpression,
  ITokenField,
  ITokenHeader,
  ITokenHeaderWithList,
  ITokenList,
  ITokenOperator,
  ITokenText,
} from "./token.js";

export type ITokenGlobal =
  | IToken
  | ITokenText
  | ITokenField
  | ITokenList
  | ITokenColumn
  | ITokenHeader
  | ITokenHeaderWithList
  | ITokenExpression
  | ITokenCondition
  | ITokenContainer
  | ITokenOperator;

export type TokenGlobal =
  | Token
  | TokenText
  | TokenField
  | TokenList
  | TokenColumn
  | TokenHeader
  | TokenHeaderWithList
  | TokenExpression
  | TokenCondition
  | TokenContainer
  | TokenOperator;
