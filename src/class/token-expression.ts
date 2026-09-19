import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenExpression } from "../interfaces/token.js";
import type { TokenExpressionConstructor } from "../interfaces/token-contructor.js";
import type { TokenGlobal } from "../interfaces/token-global.js";
import { ArrayToString, ERROR_MSG, type TokenType } from "../interfaces/utils.js";
import { Token } from "./token.js";

export class TokenExpression extends Token<TokenType["EXPRESSION"]> implements ITokenExpression {
  expression: TokenGlobal[];

  constructor(token: TokenExpressionConstructor) {
    const { expression = [] } = token;
    super({ type: TOKEN_TYPE.EXPRESSION, value: "", hidden: token.hidden });
    this.expression = expression;
  }

  protected _render(): string {
    if (this.isValid()) {
      return `@&${this.expression.length > 0 ? ArrayToString(this.expression) : " "}&@`;
    }
    return ERROR_MSG(TOKEN_TITLE.EXPRESSION);
  }

  protected _renderTitle(): string {
    return TOKEN_TITLE.EXPRESSION;
  }

  public isValid() {
    return this.expression.length > 0;
  }
}
