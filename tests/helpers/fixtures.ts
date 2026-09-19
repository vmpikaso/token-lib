import { TokenColumn } from "../../src/class/token-column.js";
import { TokenExpression } from "../../src/class/token-expression.js";
import { TokenList } from "../../src/class/token-list.js";
import { TokenText } from "../../src/class/token-text.js";

/** Jeton texte minimal, utilisé comme enfant dans les conteneurs, listes et expressions. */
export const text = (value: string, hidden = false) => new TokenText({ value, hidden });

/** Liste valide minimale : alias et valeur renseignés, sans parent ni enfant. */
export const makeList = () => new TokenList({ value: "liste", alias: "a" });

/** Colonne portant un unique jeton texte. */
export const makeColumn = (value: string, content: string, hidden = false) =>
  new TokenColumn({ value, content: [text(content)], hidden });

/** Expression valide, utilisable comme condition d'un TokenCondition (celle par défaut est vide, donc invalide). */
export const validCondition = (hidden = false) => new TokenExpression({ expression: [text("x")], hidden });
