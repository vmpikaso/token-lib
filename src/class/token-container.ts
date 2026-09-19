import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenContainer, ITokenContainerType } from "../interfaces/token.js";
import type { TokenContainerConstructor } from "../interfaces/token-constructor.js";
import type { TokenGlobal } from "../interfaces/token-global.js";
import { ArrayToString, ERROR_MSG } from "../interfaces/utils.js";
import { Token } from "./token.js";

export class TokenContainer extends Token<ITokenContainerType> implements ITokenContainer {
  content: TokenGlobal[];
  constructor(token: TokenContainerConstructor) {
    const { type = TOKEN_TYPE.PARENTHESE, content = [] } = token;
    super({ type, value: "", hidden: token.hidden });
    this.content = content;
  }

  public override isValid(): boolean {
    return this.content.length > 0;
  }

  protected override _render(): string {
    if (this.isValid()) {
      switch (this.type) {
        case TOKEN_TYPE.PARENTHESE:
          return `(${ArrayToString(this.content)})`;
        case TOKEN_TYPE.QUOTE:
          return `"${ArrayToString(this.content)}"`;
        case TOKEN_TYPE.BRACKET:
          return `{${ArrayToString(this.content)}}`;
        case TOKEN_TYPE.HOOK:
          return `[${ArrayToString(this.content)}]`;
        default:
          return ArrayToString(this.content);
      }
    }
    return ERROR_MSG(this._renderTitle(), this.hidden);
  }

  protected override _renderTitle(): string {
    switch (this.type) {
      case TOKEN_TYPE.PARENTHESE:
        return TOKEN_TITLE.PARENTHESE;
      case TOKEN_TYPE.QUOTE:
        return TOKEN_TITLE.QUOTE;
      case TOKEN_TYPE.BRACKET:
        return TOKEN_TITLE.BRACKET;
      case TOKEN_TYPE.HOOK:
        return TOKEN_TITLE.HOOK;
      default:
        return TOKEN_TITLE.CONTAINER;
    }
  }
}
