import { OPERATOR_VALUES, type Operator } from "../constants/operators.js";
import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenOperator } from "../interfaces/token.js";
import type { TokenOperatorConstructor } from "../interfaces/token-constructor.js";
import { ERROR_MSG } from "../interfaces/utils.js";
import { Token } from "./token.js";

export class TokenOperator extends Token<"operator"> implements ITokenOperator {
  constructor(token: TokenOperatorConstructor) {
    const { value = "" as Operator } = token;
    super({ type: TOKEN_TYPE.OPERATOR, value, hidden: token.hidden });
  }

  protected _render(): string {
    return this.isValid() ? this.value : ERROR_MSG(TOKEN_TITLE.OPERATOR, this.hidden);
  }

  protected _renderTitle(): string {
    return this.isValid() ? `${TOKEN_TITLE.OPERATOR} ( ${this.value} )` : TOKEN_TITLE.OPERATOR;
  }

  public isValid(): boolean {
    return OPERATOR_VALUES.has(this.value as Operator);
  }
}
