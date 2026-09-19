import { TOKEN_TITLE } from "../constants/token.title.js";
import { TOKEN_TYPE } from "../constants/token.type.js";
import type { AnyToken } from "../interfaces/any.token.js";
import type { ConditionTokenConstructor } from "../interfaces/token.constructor.js";
import type { IConditionToken } from "../interfaces/token.js";
import type { TokenTypes } from "../interfaces/utils.js";
import { arrayToString } from "../utils/array-to-string.js";
import { getErrorMessage } from "../utils/error-message.js";
import { ExpressionToken } from "./expression.token.js";
import { Token } from "./token.js";

export class ConditionToken extends Token<TokenTypes["CONDITION"]> implements IConditionToken {
  then: AnyToken[];
  else: AnyToken[];
  condition: ExpressionToken;

  constructor(token: ConditionTokenConstructor) {
    const { condition = new ExpressionToken({}), thenBlock = [], elseBlock = [] } = token;
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
