import { describe, expect, it } from "vitest";
import type { TokenGlobal } from "../../src/index.js";
import { arrayToString } from "../../src/utils/array-to-string.js";
import { text } from "../helpers/fixtures.js";

describe("arrayToString", () => {
  it("renvoie une chaîne vide pour un tableau vide", () => {
    // GIVEN
    const tokens: TokenGlobal[] = [];

    // WHEN
    const result = arrayToString(tokens);

    // THEN
    expect(result).toBe("");
  });

  it("concatène un seul jeton", () => {
    // GIVEN
    const tokens = [text("a")];

    // WHEN
    const result = arrayToString(tokens);

    // THEN
    expect(result).toBe("a");
  });

  it("concatène les jetons dans l'ordre, sans séparateur", () => {
    // GIVEN
    const tokens = [text("a"), text("b"), text("c")];

    // WHEN
    const result = arrayToString(tokens);

    // THEN
    expect(result).toBe("abc");
  });

  it("n'ajoute rien pour un jeton caché", () => {
    // GIVEN
    const tokens = [text("a"), text("b", true), text("c")];

    // WHEN
    const result = arrayToString(tokens);

    // THEN
    expect(result).toBe("ac");
  });

  it("renvoie une chaîne vide si tous les jetons sont cachés", () => {
    // GIVEN
    const tokens = [text("a", true), text("b", true)];

    // WHEN
    const result = arrayToString(tokens);

    // THEN
    expect(result).toBe("");
  });
});
