import type { AnyToken } from "../interfaces/any.token.js";

// Fonction qui retourne le tableau sous forme de chaîne de caractères.
export function arrayToString(array: AnyToken[]): string {
  return array.reduce((acc, curr) => acc + curr.toString(), "");
}
