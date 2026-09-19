import { describe, expect, it } from "vitest";
import { ArrayToString, ERROR_MSG } from "../../src/interfaces/utils.js";
import { text } from "../helpers/fixtures.js";

describe("ERROR_MSG", () => {
  it("produit le message d'erreur complet pour un type donné", () => {
    // GIVEN
    const type = "Champ";

    // WHEN
    const message = ERROR_MSG(type);

    // THEN
    expect(message).toBe("(Élément de type Champ mal rempli)");
  });

  it("signale un élément caché sans altérer la phrase", () => {
    // GIVEN
    const type = "Entête";

    // WHEN
    const message = ERROR_MSG(type, true);

    // THEN
    expect(message).toBe("(Élément caché de type Entête mal rempli)");
  });

  it("ne signale rien quand l'élément est visible", () => {
    // GIVEN
    const type = "Entête";

    // WHEN
    const message = ERROR_MSG(type, false);

    // THEN
    expect(message).toBe("(Élément de type Entête mal rempli)");
  });

  it("accepte une chaîne vide", () => {
    // GIVEN
    const type = "";

    // WHEN
    const message = ERROR_MSG(type);

    // THEN
    expect(message).toBe("(Élément de type  mal rempli)");
  });
});

describe("ArrayToString", () => {
  it("renvoie une chaîne vide pour un tableau vide", () => {
    // GIVEN
    const tokens = [];

    // WHEN
    const result = ArrayToString(tokens);

    // THEN
    expect(result).toBe("");
  });

  it("concatène un seul jeton", () => {
    // GIVEN
    const tokens = [text("a")];

    // WHEN
    const result = ArrayToString(tokens);

    // THEN
    expect(result).toBe("a");
  });

  it("concatène les jetons dans l'ordre, sans séparateur", () => {
    // GIVEN
    const tokens = [text("a"), text("b"), text("c")];

    // WHEN
    const result = ArrayToString(tokens);

    // THEN
    expect(result).toBe("abc");
  });

  it("n'ajoute rien pour un jeton caché", () => {
    // GIVEN
    const tokens = [text("a"), text("b", true), text("c")];

    // WHEN
    const result = ArrayToString(tokens);

    // THEN
    expect(result).toBe("ac");
  });

  it("renvoie une chaîne vide si tous les jetons sont cachés", () => {
    // GIVEN
    const tokens = [text("a", true), text("b", true)];

    // WHEN
    const result = ArrayToString(tokens);

    // THEN
    expect(result).toBe("");
  });
});
