import type { ColumnToken } from "../class/column.token.js";
import type { ConditionToken } from "../class/condition.token.js";
import type { ContainerToken } from "../class/container.token.js";
import type { ExpressionToken } from "../class/expression.token.js";
import type { FieldToken } from "../class/field.token.js";
import type { HeaderToken } from "../class/header.token.js";
import type { HeaderWithListToken } from "../class/header-with-list.token.js";
import type { ListToken } from "../class/list.token.js";
import type { OperatorToken } from "../class/operator.token.js";
import type { SeparatorToken } from "../class/separator.token.js";
import type { TextToken } from "../class/text.token.js";
import type {
  IColumnToken,
  IConditionToken,
  IContainerToken,
  IExpressionToken,
  IFieldToken,
  IHeaderToken,
  IHeaderWithListToken,
  IListToken,
  IOperatorToken,
  ITextToken,
} from "./token.js";

export type IAnyToken =
  | ITextToken
  | IFieldToken
  | IListToken
  | IColumnToken
  | IHeaderToken
  | IHeaderWithListToken
  | IExpressionToken
  | IConditionToken
  | IContainerToken
  | IOperatorToken;

export type AnyToken =
  | TextToken
  | FieldToken
  | ListToken
  | ColumnToken
  | HeaderToken
  | HeaderWithListToken
  | ExpressionToken
  | ConditionToken
  | ContainerToken
  | OperatorToken
  | SeparatorToken;
