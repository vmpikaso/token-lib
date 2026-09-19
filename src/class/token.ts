import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { IToken } from "../interfaces/token.js";
import type { BaseTokenConstructor } from "../interfaces/token-constructor.js";
import type { TokenType, TokenTypes, TokenValue } from "../interfaces/utils.js";

export class Token<T extends TokenType = TokenTypes["TEXT"], U extends TokenValue = string> implements IToken<T, U> {
  protected static currentId = 0;
  private _id = 0;
  type: T;
  value: U;
  hidden: boolean;

  constructor({ hidden = false, type = TOKEN_TYPE.TEXT as T, value = "" as U }: BaseTokenConstructor<T, U>) {
    this.type = type;
    this.value = value;
    this.hidden = hidden;
    this._id = Token.currentId;
    Token.currentId++;
  }

  protected _render(): string {
    return this.value.toString();
  }

  protected _renderTitle(): string {
    return TOKEN_TITLE.TOKEN;
  }

  public getId() {
    return this._id;
  }

  public static reset() {
    Token.currentId = 0;
  }

  public getTitle(): string {
    return this.hidden ? `(Caché) ${this._renderTitle()}` : this._renderTitle();
  }

  public toString(): string {
    return this.hidden ? "" : this._render();
  }

  public isValid(): boolean {
    if (typeof this.value === "string") {
      return this.value.length > 0;
    }
    if (Array.isArray(this.value)) {
      return this.value.length > 0;
    }
    return this.value !== null && this.value !== undefined && this.value.value !== "";
  }
}
