import { SEPARATORS, type Separator } from "../constants/separator.js";
import { TOKEN_TITLE } from "../constants/token.title.js";
import { TOKEN_TYPE } from "../constants/token.type.js";
import type { HeaderTokenConstructor } from "../interfaces/token.constructor.js";
import type { IHeaderToken } from "../interfaces/token.js";
import type { TokenTypes } from "../interfaces/utils.js";
import { getErrorMessage } from "../utils/error-message.js";
import { Token } from "./token.js";

export class HeaderToken extends Token<TokenTypes["HEADER"]> implements IHeaderToken {
  content: string[];
  separator: Separator;

  constructor(token: HeaderTokenConstructor) {
    const { content = [], separator = SEPARATORS.SEMICOLON.value } = token;
    super({ type: TOKEN_TYPE.HEADER, value: "", hidden: token.hidden });
    this.content = content;
    this.separator = separator;
  }

  protected override _render(): string {
    return this.isValid() ? `${this.content.join(this.separator)}\n` : getErrorMessage(TOKEN_TITLE.HEADER, this.hidden);
  }

  protected override _renderTitle(): string {
    return TOKEN_TITLE.HEADER;
  }

  override isValid(): boolean {
    return this.content.length > 0;
  }
}
