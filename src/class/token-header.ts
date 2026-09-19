import { SEPARATORS, type Separator } from "../constants/separator.js";
import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenHeader } from "../interfaces/token.js";
import type { TokenHeaderConstructor } from "../interfaces/token-constructor.js";
import { ERROR_MSG, type TokenTypes } from "../interfaces/utils.js";
import { Token } from "./token.js";

export class TokenHeader extends Token<TokenTypes["HEADER"]> implements ITokenHeader {
  content: string[];
  separator: Separator;

  constructor(token: TokenHeaderConstructor) {
    const { content = [], separator = SEPARATORS.SEMICOLON.value } = token;
    super({ type: TOKEN_TYPE.HEADER, value: "", hidden: token.hidden });
    this.content = content;
    this.separator = separator;
  }

  protected _render(): string {
    return this.isValid() ? `${this.content.join(this.separator)}\n` : ERROR_MSG(TOKEN_TITLE.HEADER, this.hidden);
  }

  protected _renderTitle(): string {
    return TOKEN_TITLE.HEADER;
  }

  public isValid(): boolean {
    return this.content.length > 0;
  }
}
