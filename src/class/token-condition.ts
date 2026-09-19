import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenCondition } from "../interfaces/token.js";
import type { TokenConditionConstructor } from "../interfaces/token-constructor.js";
import type { TokenGlobal } from "../interfaces/token-global.js";
import type { TokenTypes } from "../interfaces/utils.js";
import { arrayToString } from "../utils/array-to-string.js";
import { getErrorMessage } from "../utils/error-message.js";
import { Token } from "./token.js";
import { TokenExpression } from "./token-expression.js";

export class TokenCondition extends Token<TokenTypes["CONDITION"]> implements ITokenCondition {
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

  protected override _render(): string {
    if (this.isValid()) {
      const prefix = `##if ${this.condition}##then ${arrayToString(this.then)} `;
      const text = this.else.length === 0 ? "" : `##else ${arrayToString(this.else)}`;
      return `${prefix}${text}##endif `;
    }
    return getErrorMessage(TOKEN_TITLE.CONDITION, this.hidden);
  }

  protected override _renderTitle(): string {
    return TOKEN_TITLE.CONDITION;
  }

  override isValid(): boolean {
    return this.condition.isValid();
  }
}
