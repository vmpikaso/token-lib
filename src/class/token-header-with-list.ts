import { SEPARATORS, type Separator } from "../constants/separator.js";
import { TOKEN_TITLE } from "../constants/token-title.js";
import { TOKEN_TYPE } from "../constants/token-type.js";
import type { ITokenHeaderWithList } from "../interfaces/token.js";
import type { TokenHeaderWithListConstructor } from "../interfaces/token-constructor.js";
import type { TokenTypes } from "../interfaces/utils.js";
import { arrayToString } from "../utils/array-to-string.js";
import { getErrorMessage } from "../utils/error-message.js";
import { Token } from "./token.js";
import type { TokenColumn } from "./token-column.js";
import type { TokenList } from "./token-list.js";

export class TokenHeaderWithList extends Token<TokenTypes["HEADER_WITH_LIST"]> implements ITokenHeaderWithList {
  list?: TokenList;
  separator: Separator;
  columns: TokenColumn[];

  constructor(token: TokenHeaderWithListConstructor) {
    const { columns = [], separator = SEPARATORS.SEMICOLON.value } = token;
    super({
      type: TOKEN_TYPE.HEADER_WITH_LIST,
      value: "",
      hidden: token.hidden,
    });
    this.list = token.list;
    this.separator = separator;
    this.columns = columns;
  }

  protected override _render(): string {
    if (!this.isValid()) {
      return getErrorMessage(TOKEN_TITLE.HEADER_WITH_LIST, this.hidden);
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

    if (this.list.hidden) {
      return `${headerTitle}\n`;
    }

    const content = headerInfo.content.join(this.separator);
    const children = arrayToString(this.list.children);
    const listContent = `${this.list.getPrefix()}${content}${children}${this.list.jumpLine ? "\n" : ""}`;
    return `${headerTitle}\n${this.list.getSurround(listContent)}`;
  }

  protected override _renderTitle(): string {
    return TOKEN_TITLE.HEADER_WITH_LIST;
  }

  override isValid(): this is this & { list: TokenList } {
    return this.list?.isValid() ?? false;
  }
}
