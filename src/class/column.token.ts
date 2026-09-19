import { TOKEN_TITLE } from "../constants/token.title.js";
import { TOKEN_TYPE } from "../constants/token.type.js";
import type { AnyToken } from "../interfaces/any.token.js";
import type { ColumnTokenConstructor } from "../interfaces/token.constructor.js";
import type { IColumnToken } from "../interfaces/token.js";
import type { TokenTypes } from "../interfaces/utils.js";
import { arrayToString } from "../utils/array-to-string.js";
import { getErrorMessage } from "../utils/error-message.js";
import { Token } from "./token.js";

export class ColumnToken extends Token<TokenTypes["COLUMN"]> implements IColumnToken {
  content: AnyToken[];

  constructor(token: ColumnTokenConstructor) {
    const { content = [], value = "" } = token;
    super({ type: TOKEN_TYPE.COLUMN, value: value, hidden: token.hidden });
    this.content = content;
  }

  protected override _render(): string {
    if (this.isValid()) {
      return this.content.length > 0 ? arrayToString(this.content) : "";
    }
    return getErrorMessage(TOKEN_TITLE.COLUMN, this.hidden);
  }

  protected override _renderTitle(): string {
    return this.isValid() ? `${TOKEN_TITLE.COLUMN}: ${this.value}` : TOKEN_TITLE.COLUMN;
  }

  override isValid(): boolean {
    return this.value.length > 0;
  }
}
