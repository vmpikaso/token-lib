import {
  ColumnToken,
  FieldToken,
  HeaderToken,
  HeaderWithListToken,
  ListToken,
  SEPARATORS,
  TextToken,
  TOKEN_TYPE,
  Token,
} from "../src/index.js";

const token = new Token({ type: TOKEN_TYPE.TEXT, value: "hello", hidden: false });
const fieldToken = new FieldToken({ value: "pouet", addQuote: false, hidden: false });
const listToken = new ListToken({ value: "liste", alias: "alias", hidden: false });
const columnToken1 = new ColumnToken({ value: "Entete1", hidden: false });
const headerToken = new HeaderToken({ content: ["entete1", "entete2"], hidden: false });
const headerWithListToken = new HeaderWithListToken({ list: listToken, columns: [columnToken1], hidden: false });
const textToken = new TextToken({ type: TOKEN_TYPE.SEPARATOR, value: SEPARATORS.SEMICOLON.value, hidden: false });
const tokens = [headerToken, headerWithListToken, token, fieldToken, listToken, textToken];

console.log(headerWithListToken.getTitle());
console.log(tokens.reduce((acc, token) => `${acc}${token.toString()}`, ""));
