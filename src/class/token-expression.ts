import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenExpression } from "../interfaces/token.js";
import type { TokenExpressionConstructor } from "../interfaces/token-constructor.js";
import type { TokenGlobal } from "../interfaces/token-global.js";
import type { TokenTypes } from "../interfaces/utils.js";
import { arrayToString } from "../utils/array-to-string.js";
import { getErrorMessage } from "../utils/error-message.js";
import { Token } from "./token.js";

export class TokenExpression extends Token<TokenTypes["EXPRESSION"]> implements ITokenExpression {
  expression: TokenGlobal[];

  constructor(token: TokenExpressionConstructor) {
    const { expression = [] } = token;
    super({ type: TOKEN_TYPE.EXPRESSION, value: "", hidden: token.hidden });
    this.expression = expression;
  }

  protected override _render(): string {
    if (this.isValid()) {
      return `@&${arrayToString(this.expression)}&@`;
    }
    return getErrorMessage(TOKEN_TITLE.EXPRESSION, this.hidden);
  }

  protected override _renderTitle(): string {
    return TOKEN_TITLE.EXPRESSION;
  }

  override isValid(): boolean {
    return this.expression.length > 0;
  }
}
