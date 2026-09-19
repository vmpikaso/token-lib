import type { TokenGlobal } from "../interfaces/token-global.js";

// Fonction qui retourne le tableau sous forme de chaîne de caractères.
export function arrayToString(array: TokenGlobal[]): string {
  return array.reduce((acc, curr) => acc + curr.toString(), "");
}
