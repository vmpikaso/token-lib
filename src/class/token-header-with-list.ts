import { SEPARATOR } from "../constants/separator.js";
import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenHeaderWithList } from "../interfaces/token.js";
import type { TokenHeaderWithListConstructor } from "../interfaces/token-contructor.js";
import { ERROR_MSG, type Separator, type TokenType } from "../interfaces/utils.js";
import { Token } from "./token.js";
import type { TokenColumn } from "./token-column.js";
import type { TokenList } from "./token-list.js";

export class TokenHeaderWithList extends Token<TokenType["HEADER_WITH_LIST"]> implements ITokenHeaderWithList {
  list?: TokenList;
  separator: Separator;
  columns: TokenColumn[];

  constructor(token: TokenHeaderWithListConstructor) {
    const { columns = [], separator = SEPARATOR.SEMICOLON.value } = token;
    super({
      type: TOKEN_TYPE.HEADER_WITH_LIST,
      value: "",
      hidden: token.hidden,
    });
    this.list = token.list;
    this.separator = separator;
    this.columns = columns;
  }

  protected _render(): string {
    if (!this.list) {
      return ERROR_MSG(this.getTitle());
    }

    const headerInfo = this.columns.reduce(
      (acc, column) => {
        if (!column.hidden) {
          acc.titles.push(column.value);
          acc.content.push(column.toString());
        }
        return acc;
      },
      { titles: [] as string[], content: [] as string[] },
    );
    const headerTitle = headerInfo.titles.join(this.separator);
    const content = headerInfo.content.join(this.separator);
    const listContent = `${this.list.getPrefix()}${content}\n`;
    return `${headerTitle}\n${this.list.getSurround(listContent)}`;
  }

  protected _renderTitle(): string {
    return TOKEN_TITLE.HEADER_WITH_LIST;
  }

  public isValid(): boolean {
    return this.list !== undefined;
  }
}
