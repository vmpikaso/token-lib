import { describe, expect, it } from "vitest";
import { FieldToken } from "../../src/class/field.token.js";
import { TOKEN_TITLE } from "../../src/constants/token.title.js";
import { TOKEN_TYPE } from "../../src/constants/token.type.js";
import { getErrorMessage } from "../../src/utils/error-message.js";

describe("FieldToken — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new FieldToken(input);

    // THEN
    expect(token).toEqual(
      expect.objectContaining({
        type: TOKEN_TYPE.FIELD,
        value: "",
        options: [],
        addQuote: true,
        parent: undefined,
        hidden: false,
      }),
    );
  });

  it("conserve les valeurs fournies", () => {
    // GIVEN
    const input = { value: "nom", options: ["upper"], addQuote: false, parent: "user", hidden: true };

    // WHEN
    const token = new FieldToken(input);

    // THEN
    expect(token).toEqual(expect.objectContaining(input));
  });
});

describe("FieldToken — toString", () => {
  it("entoure le champ de guillemets par défaut", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom" });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('"@@nom@@"');
  });

  it("omet les guillemets quand addQuote est faux", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom", addQuote: false });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("@@nom@@");
  });

  it("préfixe par le parent quand il est renseigné", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom", parent: "user" });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('"@@user.nom@@"');
  });

  it("ignore un parent vide", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom", parent: "" });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('"@@nom@@"');
  });

  it("ajoute une seule option", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom", options: ["upper"] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('"@@nom|upper@@"');
  });

  it("ajoute plusieurs options séparées par une barre verticale", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom", options: ["upper", "trim"] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('"@@nom|upper|trim@@"');
  });

  it("combine parent, options et absence de guillemets", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom", parent: "user", options: ["upper"], addQuote: false });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("@@user.nom|upper@@");
  });

  it("rend le message d'erreur quand le champ n'a pas de valeur", () => {
    // GIVEN
    const token = new FieldToken({});

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.FIELD));
  });

  it("rend le message d'erreur même avec des options renseignées", () => {
    // GIVEN
    const token = new FieldToken({ options: ["upper"] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.FIELD));
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom", hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("FieldToken — getTitle", () => {
  it("utilise le préfixe du champ quand il est valide", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom" });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe("nom");
  });

  it("intègre le parent dans le libellé", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom", parent: "user" });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe("user.nom");
  });

  it("n'intègre pas les options dans le libellé", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom", options: ["upper"] });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe("nom");
  });

  it("retombe sur le libellé générique quand le champ est invalide", () => {
    // GIVEN
    const token = new FieldToken({});

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.FIELD);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom", hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe("(Caché) nom");
  });
});

describe("FieldToken — isValid", () => {
  it("accepte un champ avec une valeur", () => {
    // GIVEN
    const token = new FieldToken({ value: "nom" });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette un champ sans valeur", () => {
    // GIVEN
    const token = new FieldToken({});

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });
});
