import {
  SEPARATORS,
  TOKEN_TYPE,
  Token,
  TokenColumn,
  TokenField,
  TokenHeader,
  TokenHeaderWithList,
  TokenList,
  TokenText,
} from "../src/index.js";

const token = new Token({ type: TOKEN_TYPE.TEXT, value: "hello", hidden: false });
const tokenField = new TokenField({ value: "pouet", addQuote: false, hidden: false });
const tokenList = new TokenList({ value: "liste", alias: "alias", hidden: false });
const tokenColumn1 = new TokenColumn({ value: "Entete1", hidden: false });
const tokenHeader = new TokenHeader({ content: ["entete1", "entete2"], hidden: false });
const tokenHeaderWithList = new TokenHeaderWithList({ list: tokenList, columns: [tokenColumn1], hidden: false });
const tokenText = new TokenText({ type: TOKEN_TYPE.SEPARATOR, value: SEPARATORS.SEMICOLON.value, hidden: false });
const tokens = [tokenHeader, tokenHeaderWithList, token, tokenField, tokenList, tokenText];

console.log(tokenHeaderWithList.getTitle());
console.log(tokens.reduce((acc, token) => `${acc}${token.toString()}`, ""));
