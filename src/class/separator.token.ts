import { TOKEN_TITLE } from "../constants/token.title.js";
import { TOKEN_TYPE } from "../constants/token.type.js";
import type { ITextToken } from "../interfaces/token.js";
import { TextToken } from "./text.token.js";

export class SeparatorToken extends TextToken {
  constructor({ value = "", hidden = false }: Partial<Omit<ITextToken, "type">>) {
    super({ type: TOKEN_TYPE.SEPARATOR, value: value, hidden: hidden });
  }

  protected override _renderTitle(): string {
    return `${TOKEN_TITLE.SEPARATOR} ( ${this.value} )`;
  }
}
