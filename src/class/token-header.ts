import { SEPARATOR } from "../constants/separator.js";
import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenHeader } from "../interfaces/token.js";
import type { TokenHeaderConstructor } from "../interfaces/token-contructor.js";
import { ERROR_MSG, type Separator, type TokenType } from "../interfaces/utils.js";
import { Token } from "./token.js";

export class TokenHeader extends Token<TokenType["HEADER"]> implements ITokenHeader {
  content: string[];
  separator: Separator;

  constructor(token: TokenHeaderConstructor) {
    const { content = [], separator = SEPARATOR.SEMICOLON.value } = token;
    super({ type: TOKEN_TYPE.HEADER, value: "", hidden: token.hidden });
    this.content = content;
    this.separator = separator;
  }

  protected _render(): string {
    return this.isValid() ? `${this.content.join(this.separator)}\n` : ERROR_MSG(this.getTitle());
  }

  protected _renderTitle(): string {
    return TOKEN_TITLE.HEADER;
  }

  public isValid(): boolean {
    return this.content.length > 0;
  }
}
