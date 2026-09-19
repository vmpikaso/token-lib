import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenText, ITokenTextType } from "../interfaces/token.js";
import { Token } from "./token.js";

export class TokenText extends Token<ITokenTextType> implements ITokenText {
  constructor({ type = TOKEN_TYPE.TEXT, value = "", hidden = false }: Partial<ITokenText>) {
    super({ type: type, value: value, hidden: hidden });
  }

  protected override _renderTitle(): string {
    switch (this.type) {
      case TOKEN_TYPE.COMMA:
        return TOKEN_TITLE.COMMA;
      case TOKEN_TYPE.SPACE:
        return TOKEN_TITLE.SPACE;
      case TOKEN_TYPE.JUMPLINE:
        return TOKEN_TITLE.JUMPLINE;
      case TOKEN_TYPE.SEPARATOR:
        return `${TOKEN_TITLE.SEPARATOR} ( ${this.value} )`;
      case TOKEN_TYPE.NUMBER:
        return `${TOKEN_TITLE.NUMBER}: ${this.value}`;
      default:
        return TOKEN_TITLE.TEXT;
    }
  }
}
