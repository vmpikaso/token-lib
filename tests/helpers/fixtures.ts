import { ColumnToken } from "../../src/class/column.token.js";
import { ExpressionToken } from "../../src/class/expression.token.js";
import { ListToken } from "../../src/class/list.token.js";
import { TextToken } from "../../src/class/text.token.js";

/** Jeton texte minimal, utilisé comme enfant dans les conteneurs, listes et expressions. */
export const text = (value: string, hidden = false) => new TextToken({ value, hidden });

/** Liste valide minimale : alias et valeur renseignés, sans parent ni enfant. */
export const makeList = () => new ListToken({ value: "liste", alias: "a" });

/** Colonne portant un unique jeton texte. */
export const makeColumn = (value: string, content: string, hidden = false) =>
  new ColumnToken({ value, content: [text(content)], hidden });

/** Expression valide, utilisable comme condition d'un ConditionToken (celle par défaut est vide, donc invalide). */
export const validCondition = (hidden = false) => new ExpressionToken({ expression: [text("x")], hidden });
