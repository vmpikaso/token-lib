import { describe, expect, it } from "vitest";
import { TextToken } from "../../src/class/text.token.js";
import { SEPARATORS } from "../../src/constants/separator.js";
import { TOKEN_TITLE } from "../../src/constants/token.title.js";
import { TOKEN_TYPE } from "../../src/constants/token.type.js";

describe("TextToken — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new TextToken(input);

    // THEN
    expect(token).toEqual(expect.objectContaining({ type: TOKEN_TYPE.TEXT, value: "", hidden: false }));
  });

  it("conserve les valeurs fournies", () => {
    // GIVEN
    const input = { type: TOKEN_TYPE.COMMA, value: ",", hidden: true };

    // WHEN
    const token = new TextToken(input);

    // THEN
    expect(token).toEqual(expect.objectContaining({ type: TOKEN_TYPE.COMMA, value: ",", hidden: true }));
  });
});

describe("TextToken — getTitle", () => {
  it("libelle une virgule", () => {
    // GIVEN
    const token = new TextToken({ type: TOKEN_TYPE.COMMA, value: "," });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.COMMA);
  });

  it("libelle une espace", () => {
    // GIVEN
    const token = new TextToken({ type: TOKEN_TYPE.SPACE, value: " " });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.SPACE);
  });

  it("libelle un saut de ligne", () => {
    // GIVEN
    const token = new TextToken({ type: TOKEN_TYPE.JUMPLINE, value: "\n" });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.JUMPLINE);
  });

  it("libelle un texte simple", () => {
    // GIVEN
    const token = new TextToken({ type: TOKEN_TYPE.TEXT, value: "bonjour" });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.TEXT);
  });

  it("intègre la valeur dans le libellé d'un séparateur", () => {
    // GIVEN
    const token = new TextToken({ type: TOKEN_TYPE.SEPARATOR, value: SEPARATORS.SEMICOLON.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.SEPARATOR} ( ; )`);
  });

  it("intègre la valeur dans le libellé d'un nombre", () => {
    // GIVEN
    const token = new TextToken({ type: TOKEN_TYPE.NUMBER, value: "42" });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.NUMBER}: 42`);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new TextToken({ type: TOKEN_TYPE.SPACE, hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.SPACE}`);
  });
});

describe("TextToken — toString", () => {
  it("rend la valeur brute", () => {
    // GIVEN
    const token = new TextToken({ value: "bonjour" });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("bonjour");
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new TextToken({ value: "bonjour", hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("TextToken — isValid", () => {
  it("accepte une valeur non vide", () => {
    // GIVEN
    const token = new TextToken({ value: "x" });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette une valeur vide", () => {
    // GIVEN
    const token = new TextToken({});

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });
});
