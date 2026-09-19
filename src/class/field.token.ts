import { TOKEN_TITLE } from "../constants/token.title.js";
import { TOKEN_TYPE } from "../constants/token.type.js";
import type { FieldTokenConstructor } from "../interfaces/token.constructor.js";
import type { IFieldToken } from "../interfaces/token.js";
import type { TokenTypes } from "../interfaces/utils.js";
import { getErrorMessage } from "../utils/error-message.js";
import { Token } from "./token.js";

export class FieldToken extends Token<TokenTypes["FIELD"]> implements IFieldToken {
  options: string[];
  addQuote: boolean;
  parent?: string;

  constructor(token: FieldTokenConstructor) {
    const { options = [], addQuote = true, value = "", parent } = token;
    super({ type: TOKEN_TYPE.FIELD, value, hidden: token.hidden });
    this.options = options;
    this.addQuote = addQuote;
    this.parent = parent;
  }

  private getSurround(text: string) {
    return this.addQuote ? `"@@${text}@@"` : `@@${text}@@`;
  }

  private getPrefix(): string {
    return this.parent ? `${this.parent}.${this.value}` : this.value;
  }

  protected override _renderTitle(): string {
    return this.isValid() ? this.getPrefix() : TOKEN_TITLE.FIELD;
  }

  protected override _render(): string {
    if (this.isValid()) {
      const text = this.options.length > 0 ? `|${this.options?.join("|")}` : "";
      return this.getSurround(`${this.getPrefix()}${text}`);
    }
    return getErrorMessage(TOKEN_TITLE.FIELD, this.hidden);
  }
}
