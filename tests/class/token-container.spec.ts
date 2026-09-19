import { describe, expect, it } from "vitest";
import { TokenContainer } from "../../src/class/token-container.js";
import { TOKEN_TITLE } from "../../src/constants/token-title.js";
import { TOKEN_TYPE } from "../../src/constants/token-type.js";
import type { ITokenContainerType } from "../../src/interfaces/token.js";
import { ERROR_MSG } from "../../src/interfaces/utils.js";
import { text } from "../helpers/fixtures.js";

/** Un type hors de l'union ITokenContainerType : seul moyen d'atteindre les branches `default`. */
const UNKNOWN_TYPE = TOKEN_TYPE.TEXT as unknown as ITokenContainerType;

describe("TokenContainer — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new TokenContainer(input);

    // THEN
    expect(token).toEqual(expect.objectContaining({ type: TOKEN_TYPE.PARENTHESE, content: [], value: "", hidden: false }));
  });

  it("conserve le type et le contenu fournis", () => {
    // GIVEN
    const input = { type: TOKEN_TYPE.HOOK, content: [text("x")] };

    // WHEN
    const token = new TokenContainer(input);

    // THEN
    expect(token).toEqual(expect.objectContaining(input));
  });
});

describe("TokenContainer — isValid", () => {
  it("accepte un conteneur avec du contenu", () => {
    // GIVEN
    const token = new TokenContainer({ content: [text("x")] });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette un conteneur vide", () => {
    // GIVEN
    const token = new TokenContainer({});

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });
});

describe("TokenContainer — toString", () => {
  it("encadre le contenu par des parenthèses", () => {
    // GIVEN
    const token = new TokenContainer({ type: TOKEN_TYPE.PARENTHESE, content: [text("x"), text("y")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("(xy)");
  });

  it("encadre le contenu par des guillemets", () => {
    // GIVEN
    const token = new TokenContainer({ type: TOKEN_TYPE.QUOTE, content: [text("x"), text("y")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('"xy"');
  });

  it("encadre le contenu par des accolades", () => {
    // GIVEN
    const token = new TokenContainer({ type: TOKEN_TYPE.BRACKET, content: [text("x"), text("y")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("{xy}");
  });

  it("encadre le contenu par des crochets", () => {
    // GIVEN
    const token = new TokenContainer({ type: TOKEN_TYPE.HOOK, content: [text("x"), text("y")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("[xy]");
  });

  it("n'encadre rien pour un type inconnu", () => {
    // GIVEN
    const token = new TokenContainer({ type: UNKNOWN_TYPE, content: [text("x"), text("y")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("xy");
  });

  it("ignore le contenu caché", () => {
    // GIVEN
    const token = new TokenContainer({ content: [text("x"), text("y", true)] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("(x)");
  });

  it("rend le message d'erreur avec le libellé du conteneur quand il est vide", () => {
    // GIVEN
    const token = new TokenContainer({ type: TOKEN_TYPE.QUOTE });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(ERROR_MSG(TOKEN_TITLE.QUOTE));
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new TokenContainer({ content: [text("x")], hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("TokenContainer — getTitle", () => {
  it("libelle une parenthèse", () => {
    // GIVEN
    const token = new TokenContainer({ type: TOKEN_TYPE.PARENTHESE });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.PARENTHESE);
  });

  it("libelle un guillemet", () => {
    // GIVEN
    const token = new TokenContainer({ type: TOKEN_TYPE.QUOTE });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.QUOTE);
  });

  it("libelle une accolade", () => {
    // GIVEN
    const token = new TokenContainer({ type: TOKEN_TYPE.BRACKET });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.BRACKET);
  });

  it("libelle un crochet", () => {
    // GIVEN
    const token = new TokenContainer({ type: TOKEN_TYPE.HOOK });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.HOOK);
  });

  it("retombe sur le libellé générique pour un type inconnu", () => {
    // GIVEN
    const token = new TokenContainer({ type: UNKNOWN_TYPE });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.CONTAINER);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new TokenContainer({ type: TOKEN_TYPE.BRACKET, hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.BRACKET}`);
  });
});
