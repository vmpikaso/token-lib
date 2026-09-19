import { beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../src/class/token.js";
import { TokenField } from "../../src/class/token-field.js";
import { TOKEN_TITLE } from "../../src/constants/token-title.js";
import { TOKEN_TYPE } from "../../src/constants/token-type.js";
import type { ITokenGlobal } from "../../src/interfaces/token-global.js";
import type { TokenType } from "../../src/interfaces/utils.js";
import { text } from "../helpers/fixtures.js";

beforeEach(() => {
  Token.reset();
});

describe("Token — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new Token(input);

    // THEN
    expect(token).toEqual(expect.objectContaining({ type: TOKEN_TYPE.TEXT, value: "", hidden: false }));
  });

  it("conserve les valeurs fournies explicitement", () => {
    // GIVEN
    const input = { type: TOKEN_TYPE.TEXT, value: "hello", hidden: true };

    // WHEN
    const token = new Token(input);

    // THEN
    expect(token).toEqual(expect.objectContaining({ type: TOKEN_TYPE.TEXT, value: "hello", hidden: true }));
  });

  it("ne remplace pas une chaîne vide fournie explicitement", () => {
    // GIVEN
    const input = { value: "" };

    // WHEN
    const token = new Token(input);

    // THEN
    expect(token.value).toBe("");
  });
});

describe("Token — getId / reset", () => {
  it("part de 1 à la première construction après un reset", () => {
    // GIVEN
    Token.reset();

    // WHEN
    const token = new Token({});

    // THEN
    expect(token.getId()).toBe(1);
  });

  it("incrémente le compteur à chaque construction", () => {
    // GIVEN
    new Token({});
    new Token({});

    // WHEN
    const token = new Token({});

    // THEN
    expect(token.getId()).toBe(3);
  });

  it("partage un compteur global avec les sous-classes", () => {
    // GIVEN
    const token = new Token({});

    // WHEN
    new TokenField({ value: "x" });

    // THEN
    expect(token.getId()).toBe(2);
  });

  it("renvoie le compteur global et non un identifiant d'instance", () => {
    // GIVEN
    const first = new Token({});
    const second = new Token({});

    // WHEN
    const firstId = first.getId();
    const secondId = second.getId();

    // THEN
    expect(firstId).toBe(secondId);
  });

  it("remet le compteur à zéro", () => {
    // GIVEN
    new Token({});

    // WHEN
    Token.reset();
    const token = new Token({});

    // THEN
    expect(token.getId()).toBe(1);
  });
});

describe("Token — getTitle", () => {
  it("renvoie le libellé de base quand le jeton est visible", () => {
    // GIVEN
    const token = new Token({ value: "x" });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.TOKEN);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new Token({ value: "x", hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.TOKEN}`);
  });
});

describe("Token — toString", () => {
  it("rend la valeur quand le jeton est visible", () => {
    // GIVEN
    const token = new Token({ value: "hello" });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("hello");
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new Token({ value: "hello", hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });

  it("rend un tableau de jetons via Array.prototype.toString", () => {
    // GIVEN
    const token = new Token<TokenType["TEXT"], ITokenGlobal[]>({ value: [text("a"), text("b")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("a,b");
  });

  it("délègue le rendu à un jeton imbriqué passé comme valeur", () => {
    // GIVEN
    const token = new Token<TokenType["TEXT"], ITokenGlobal>({ value: text("imbriqué") });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("imbriqué");
  });
});

describe("Token — isValid", () => {
  it("accepte une valeur chaîne non vide", () => {
    // GIVEN
    const token = new Token({ value: "x" });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette une valeur chaîne vide", () => {
    // GIVEN
    const token = new Token({ value: "" });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });

  it("accepte un tableau non vide", () => {
    // GIVEN
    const token = new Token<TokenType["TEXT"], ITokenGlobal[]>({ value: [text("a")] });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette un tableau vide", () => {
    // GIVEN
    const token = new Token<TokenType["TEXT"], ITokenGlobal[]>({ value: [] });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });

  it("accepte un jeton imbriqué dont la valeur est non vide", () => {
    // GIVEN
    const token = new Token<TokenType["TEXT"], ITokenGlobal>({ value: text("x") });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette un jeton imbriqué dont la valeur est vide", () => {
    // GIVEN
    const token = new Token<TokenType["TEXT"], ITokenGlobal>({ value: text("") });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });

  it("ignore l'état caché pour déterminer la validité", () => {
    // GIVEN
    const token = new Token({ value: "x", hidden: true });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });
});
