import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenList } from "../interfaces/token.js";
import type { TokenListConstructor } from "../interfaces/token-contructor.js";
import type { TokenGlobal } from "../interfaces/token-global.js";
import { ArrayToString, ERROR_MSG, type TokenType } from "../interfaces/utils.js";
import { Token } from "./token.js";

export class TokenList extends Token<TokenType["LIST"]> implements ITokenList {
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

  protected _render(): string {
    if (this.isValid()) {
      const text = this.children.length > 0 ? ArrayToString(this.children) : "";
      return this.getSurround(`${this.getPrefix()}${text}${this.jumpLine ? "\n" : ""}`);
    }
    return ERROR_MSG(TOKEN_TITLE.LIST);
  }

  protected _renderTitle(): string {
    return this.isValid() ? `${TOKEN_TITLE.LIST}: ${this.alias}` : TOKEN_TITLE.LIST;
  }

  public getPrefix(): string {
    return `${this.alias}="${this.parent.length > 0 ? `${this.parent.join(".")}.${this.value}` : this.value}" `;
  }

  public getSurround(content: string): string {
    return `#@${content}@#`;
  }

  public isValid(): boolean {
    return this.alias.length > 0 && this.value.length > 0;
  }
}
