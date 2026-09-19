import { describe, expect, it } from "vitest";
import { ListToken } from "../../src/class/list.token.js";
import { TOKEN_TITLE } from "../../src/constants/token.title.js";
import { TOKEN_TYPE } from "../../src/constants/token.type.js";
import { getErrorMessage } from "../../src/utils/error-message.js";
import { text } from "../helpers/fixtures.js";

describe("ListToken — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new ListToken(input);

    // THEN
    expect(token).toEqual(
      expect.objectContaining({
        type: TOKEN_TYPE.LIST,
        value: "",
        children: [],
        parent: [],
        alias: "",
        jumpLine: true,
        hidden: false,
      }),
    );
  });

  it("conserve les valeurs fournies", () => {
    // GIVEN
    const input = { value: "liste", alias: "a", parent: ["p"], jumpLine: false, children: [text("c")] };

    // WHEN
    const token = new ListToken(input);

    // THEN
    expect(token).toEqual(expect.objectContaining(input));
  });
});

describe("ListToken — isValid", () => {
  it("accepte un alias et une valeur non vides", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a" });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette une liste sans alias", () => {
    // GIVEN
    const token = new ListToken({ value: "liste" });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });

  it("rejette une liste sans valeur", () => {
    // GIVEN
    const token = new ListToken({ alias: "a" });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });

  it("rejette une liste sans alias ni valeur", () => {
    // GIVEN
    const token = new ListToken({});

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });
});

describe("ListToken — getPrefix", () => {
  it("construit le préfixe avec une espace finale significative", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a" });

    // WHEN
    const prefix = token.getPrefix();

    // THEN
    expect(prefix).toBe('a="liste" ');
  });

  it("préfixe la valeur par un parent unique", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a", parent: ["p"] });

    // WHEN
    const prefix = token.getPrefix();

    // THEN
    expect(prefix).toBe('a="p.liste" ');
  });

  it("joint plusieurs parents par des points", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a", parent: ["p1", "p2"] });

    // WHEN
    const prefix = token.getPrefix();

    // THEN
    expect(prefix).toBe('a="p1.p2.liste" ');
  });
});

describe("ListToken — getSurround", () => {
  it("encadre le contenu par les marqueurs de liste", () => {
    // GIVEN
    const token = new ListToken({});

    // WHEN
    const surrounded = token.getSurround("contenu");

    // THEN
    expect(surrounded).toBe("#@contenu@#");
  });

  it("encadre un contenu vide", () => {
    // GIVEN
    const token = new ListToken({});

    // WHEN
    const surrounded = token.getSurround("");

    // THEN
    expect(surrounded).toBe("#@@#");
  });
});

describe("ListToken — toString", () => {
  it("rend une liste vide avec un saut de ligne par défaut", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a" });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('#@a="liste" \n@#');
  });

  it("omet le saut de ligne quand jumpLine est faux", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a", jumpLine: false });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('#@a="liste" @#');
  });

  it("concatène les enfants sans séparateur", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a", children: [text("x"), text("y")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('#@a="liste" xy\n@#');
  });

  it("combine enfants, parents et absence de saut de ligne", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a", parent: ["p"], children: [text("x")], jumpLine: false });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('#@a="p.liste" x@#');
  });

  it("ignore les enfants cachés", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a", children: [text("x"), text("y", true)] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('#@a="liste" x\n@#');
  });

  it("rend le message d'erreur quand la liste est invalide", () => {
    // GIVEN
    const token = new ListToken({ alias: "a" });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.LIST));
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a", hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("ListToken — getTitle", () => {
  it("intègre l'alias quand la liste est valide", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a" });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.LIST}: a`);
  });

  it("retombe sur le libellé générique quand la liste est invalide", () => {
    // GIVEN
    const token = new ListToken({ alias: "a" });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.LIST);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new ListToken({ value: "liste", alias: "a", hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.LIST}: a`);
  });
});
