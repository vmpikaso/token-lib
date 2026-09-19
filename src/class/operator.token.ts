import { OPERATOR_VALUES, type Operator } from "../constants/operators.js";
import { TOKEN_TITLE } from "../constants/token.title.js";
import { TOKEN_TYPE } from "../constants/token.type.js";
import type { OperatorTokenConstructor } from "../interfaces/token.constructor.js";
import type { IOperatorToken } from "../interfaces/token.js";
import type { TokenTypes } from "../interfaces/utils.js";
import { getErrorMessage } from "../utils/error-message.js";
import { Token } from "./token.js";

export class OperatorToken extends Token<TokenTypes["OPERATOR"], Operator> implements IOperatorToken {
  constructor(token: OperatorTokenConstructor) {
    const { value = "" as Operator } = token;
    super({ type: TOKEN_TYPE.OPERATOR, value, hidden: token.hidden });
  }

  protected override _render(): string {
    return this.isValid() ? this.value : getErrorMessage(TOKEN_TITLE.OPERATOR, this.hidden);
  }

  protected override _renderTitle(): string {
    return this.isValid() ? `${TOKEN_TITLE.OPERATOR} ( ${this.value} )` : TOKEN_TITLE.OPERATOR;
  }

  override isValid(): boolean {
    return OPERATOR_VALUES.has(this.value);
  }
}
