import { describe, expect, it } from "vitest";
import { getErrorMessage } from "../../src/utils/error-message.js";

describe("getErrorMessage", () => {
  it("produit le message d'erreur complet pour un type donné", () => {
    // GIVEN
    const title = "Champ";

    // WHEN
    const message = getErrorMessage(title);

    // THEN
    expect(message).toBe("(Élément de type Champ mal rempli)");
  });

  it("signale un élément caché sans altérer la phrase", () => {
    // GIVEN
    const title = "En-tête";

    // WHEN
    const message = getErrorMessage(title, true);

    // THEN
    expect(message).toBe("(Élément caché de type En-tête mal rempli)");
  });

  it("ne signale rien quand l'élément est visible", () => {
    // GIVEN
    const title = "En-tête";

    // WHEN
    const message = getErrorMessage(title, false);

    // THEN
    expect(message).toBe("(Élément de type En-tête mal rempli)");
  });

  it("accepte une chaîne vide", () => {
    // GIVEN
    const title = "";

    // WHEN
    const message = getErrorMessage(title);

    // THEN
    expect(message).toBe("(Élément de type  mal rempli)");
  });
});
