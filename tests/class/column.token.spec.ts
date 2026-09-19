import { describe, expect, it } from "vitest";
import { ColumnToken } from "../../src/class/column.token.js";
import { TOKEN_TITLE } from "../../src/constants/token.title.js";
import { TOKEN_TYPE } from "../../src/constants/token.type.js";
import { getErrorMessage } from "../../src/utils/error-message.js";
import { text } from "../helpers/fixtures.js";

describe("ColumnToken — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new ColumnToken(input);

    // THEN
    expect(token).toEqual(expect.objectContaining({ type: TOKEN_TYPE.COLUMN, value: "", content: [], hidden: false }));
  });

  it("conserve les valeurs fournies", () => {
    // GIVEN
    const input = { value: "Entete", content: [text("x")], hidden: true };

    // WHEN
    const token = new ColumnToken(input);

    // THEN
    expect(token).toEqual(expect.objectContaining(input));
  });
});

describe("ColumnToken — isValid", () => {
  it("ne dépend que de la valeur, pas du contenu", () => {
    // GIVEN
    const token = new ColumnToken({ value: "Entete" });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette une colonne sans valeur même avec du contenu", () => {
    // GIVEN
    const token = new ColumnToken({ content: [text("x")] });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });
});

describe("ColumnToken — toString", () => {
  it("renvoie une chaîne vide quand la colonne est valide mais sans contenu", () => {
    // GIVEN
    const token = new ColumnToken({ value: "Entete" });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });

  it("concatène le contenu sans séparateur", () => {
    // GIVEN
    const token = new ColumnToken({ value: "Entete", content: [text("x"), text("y")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("xy");
  });

  it("ignore le contenu caché", () => {
    // GIVEN
    const token = new ColumnToken({ value: "Entete", content: [text("x"), text("y", true)] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("x");
  });

  it("rend le message d'erreur quand la colonne est invalide", () => {
    // GIVEN
    const token = new ColumnToken({ content: [text("x")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.COLUMN));
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new ColumnToken({ value: "Entete", content: [text("x")], hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("ColumnToken — getTitle", () => {
  it("intègre la valeur quand la colonne est valide", () => {
    // GIVEN
    const token = new ColumnToken({ value: "Entete" });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.COLUMN}: Entete`);
  });

  it("retombe sur le libellé générique quand la colonne est invalide", () => {
    // GIVEN
    const token = new ColumnToken({});

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.COLUMN);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new ColumnToken({ value: "Entete", hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.COLUMN}: Entete`);
  });
});
