import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenOperator } from "../interfaces/token.js";
import type { TokenOperatorConstructor } from "../interfaces/token-contructor.js";
import { Token } from "./token.js";

export class TokenOperator extends Token<"operator"> implements ITokenOperator {
  constructor(token: TokenOperatorConstructor) {
    const { value = "operator" } = token;
    super({ type: TOKEN_TYPE.OPERATOR, value, hidden: token.hidden });
  }

  protected _renderTitle(): string {
    return this.value !== TOKEN_TYPE.OPERATOR ? `${TOKEN_TITLE.OPERATOR} ( ${this.value} )` : TOKEN_TITLE.OPERATOR;
  }
}
