import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenColumn } from "../interfaces/token.js";
import type { TokenColumnConstructor } from "../interfaces/token-constructor.js";
import type { TokenGlobal } from "../interfaces/token-global.js";
import { ArrayToString, ERROR_MSG, type TokenTypes } from "../interfaces/utils.js";
import { Token } from "./token.js";

export class TokenColumn extends Token<TokenTypes["COLUMN"]> implements ITokenColumn {
  content: TokenGlobal[];

  constructor(token: TokenColumnConstructor) {
    const { content = [], value = "" } = token;
    super({ type: TOKEN_TYPE.COLUMN, value: value, hidden: token.hidden });
    this.content = content;
  }

  protected override _render(): string {
    if (this.isValid()) {
      return this.content.length > 0 ? ArrayToString(this.content) : "";
    }
    return ERROR_MSG(TOKEN_TITLE.COLUMN, this.hidden);
  }

  protected override _renderTitle(): string {
    return this.isValid() ? `${TOKEN_TITLE.COLUMN}: ${this.value}` : TOKEN_TITLE.COLUMN;
  }

  public override isValid(): boolean {
    return this.value.length > 0;
  }
}
