import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenCondition } from "../interfaces/token.js";
import type { TokenConditionConstructor } from "../interfaces/token-contructor.js";
import type { TokenGlobal } from "../interfaces/token-global.js";
import { ArrayToString, ERROR_MSG, type TokenType } from "../interfaces/utils.js";
import { Token } from "./token.js";
import { TokenExpression } from "./token-expression.js";

export class TokenCondition extends Token<TokenType["CONDITION"]> implements ITokenCondition {
  then: TokenGlobal[];
  else: TokenGlobal[];
  condition: TokenExpression;

  constructor(token: TokenConditionConstructor) {
    const { condition = new TokenExpression({}), thenBlock = [], elseBlock = [] } = token;
    super({ type: TOKEN_TYPE.CONDITION, value: "", hidden: token.hidden });
    this.then = thenBlock;
    this.else = elseBlock;
    this.condition = condition;
  }

  protected _render(): string {
    if (this.isValid()) {
      const prefix = `##if ${this.condition}##then ${ArrayToString(this.then)} `;
      const text = this.else.length === 0 ? "" : `##else ${ArrayToString(this.else)}`;
      return `${prefix}${text}##endif `;
    }
    return ERROR_MSG(TOKEN_TITLE.CONDITION);
  }

  protected _renderTitle(): string {
    return TOKEN_TITLE.CONDITION;
  }

  public isValid() {
    return this.condition.isValid();
  }
}
