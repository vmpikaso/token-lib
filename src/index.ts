import { Token } from "./class/token.js";
import { TokenColumn } from "./class/token-column.js";
import { TokenField } from "./class/token-field.js";
import { TokenHeader, TokenHeaderWithList } from "./class/token-header.js";
import { TokenList } from "./class/token-list.js";
import { TokenText } from "./class/token-text.js";
import { SEPARATOR } from "./constants/separator.js";
import { TOKEN_TYPE } from "./constants/token-type.js";
import type { TokenGlobal } from "./interfaces/token-global.js";

const token = new Token({
  type: TOKEN_TYPE.TEXT,
  value: "hello",
  hidden: false,
});
const tokenField = new TokenField({
  value: "pouet",
  addQuote: false,
  hidden: false,
});
const tokenList = new TokenList({
  value: "liste",
  alias: "alias",
  hidden: false,
});
const tokenColumn1 = new TokenColumn({ value: "Entete1", hidden: false });
const tokenHeader = new TokenHeader({
  content: ["entete1", "entete2"],
  hidden: false,
});
const tokenHeaderWithList = new TokenHeaderWithList({
  list: tokenList,
  columns: [tokenColumn1],
  hidden: false,
});
const tokenText = new TokenText({
  type: TOKEN_TYPE.SEPARATOR,
  value: SEPARATOR.SEMICOLON.value,
  hidden: false,
});
const tokens = [tokenHeader, tokenHeaderWithList, token, tokenField, tokenList, tokenText];

function testTokenType(token: TokenGlobal) {
  switch (token.type) {
    case "number":
      console.log(token);
      break;
    case "bracket":
      console.log(token);
      break;
    case "column":
      console.log(token);
      break;
    case "comma":
      console.log(token);
      break;
    case "condition":
      console.log(token);
      break;
    case "expression":
      console.log(token);
      break;
    case "field":
      console.log(token);
      break;
    case "header":
      console.log(token);
      break;
    case "header_with_list":
      console.log(token);
      break;
    case "hook":
      console.log(token);
      break;
    case "jumpLine":
      console.log(token);
      break;
    case "list":
      console.log(token.children);
      break;
    case "operator":
      console.log(token);
      break;
    case "parenthese":
      console.log(token);
      break;
    case "quote":
      console.log(token);
      break;
    case "separator":
      console.log(token);
      break;
    case "space":
      console.log(token);
      break;
    case "text":
      console.log(token);
      break;
  }
}

// console.log(token);
// console.log(tokenField);
// console.log(tokenList);
console.log(tokenHeaderWithList.getTitle());
console.log(tokens.reduce((acc, token) => `${acc}${token.toString()}`, ""));
