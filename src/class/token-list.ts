import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenList } from "../interfaces/token.js";
import type { TokenListConstructor } from "../interfaces/token-constructor.js";
import type { TokenGlobal } from "../interfaces/token-global.js";
import type { TokenTypes } from "../interfaces/utils.js";
import { arrayToString } from "../utils/array-to-string.js";
import { getErrorMessage } from "../utils/error-message.js";
import { Token } from "./token.js";

export class TokenList extends Token<TokenTypes["LIST"]> implements ITokenList {
  children: TokenGlobal[];
  parent: string[];
  alias: string;
  jumpLine: boolean;

  constructor(token: TokenListConstructor) {
    const { children = [], parent = [], alias = "", jumpLine = true } = token;
    super({ type: TOKEN_TYPE.LIST, value: token.value, hidden: token.hidden });
    this.children = children;
    this.parent = parent;
    this.alias = alias;
    this.jumpLine = jumpLine;
  }

  protected override _render(): string {
    if (this.isValid()) {
      const text = this.children.length > 0 ? arrayToString(this.children) : "";
      return this.getSurround(`${this.getPrefix()}${text}${this.jumpLine ? "\n" : ""}`);
    }
    return getErrorMessage(TOKEN_TITLE.LIST, this.hidden);
  }

  protected override _renderTitle(): string {
    return this.isValid() ? `${TOKEN_TITLE.LIST}: ${this.alias}` : TOKEN_TITLE.LIST;
  }

  getPrefix(): string {
    return `${this.alias}="${this.parent.length > 0 ? `${this.parent.join(".")}.${this.value}` : this.value}" `;
  }

  getSurround(content: string): string {
    return `#@${content}@#`;
  }

  override isValid(): boolean {
    return this.alias.length > 0 && this.value.length > 0;
  }
}
