import { describe, expect, it } from "vitest";
import { HeaderToken } from "../../src/class/header.token.js";
import { SEPARATORS } from "../../src/constants/separator.js";
import { TOKEN_TITLE } from "../../src/constants/token.title.js";
import { TOKEN_TYPE } from "../../src/constants/token.type.js";
import { getErrorMessage } from "../../src/utils/error-message.js";

describe("HeaderToken — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new HeaderToken(input);

    // THEN
    expect(token).toEqual(expect.objectContaining({ type: TOKEN_TYPE.HEADER, content: [], hidden: false }));
  });

  it("utilise le point-virgule comme séparateur par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new HeaderToken(input);

    // THEN
    expect(token.separator).toBe(SEPARATORS.SEMICOLON.value);
    expect(SEPARATORS.SEMICOLON.value).toBe(";");
  });

  it("force la valeur à une chaîne vide", () => {
    // GIVEN
    const input = { content: ["a"] };

    // WHEN
    const token = new HeaderToken(input);

    // THEN
    expect(token.value).toBe("");
  });

  it("conserve le séparateur fourni", () => {
    // GIVEN
    const input = { separator: SEPARATORS.COMMA.value };

    // WHEN
    const token = new HeaderToken(input);

    // THEN
    expect(token.separator).toBe(SEPARATORS.COMMA.value);
  });
});

describe("HeaderToken — isValid", () => {
  it("accepte un en-tête avec du contenu", () => {
    // GIVEN
    const token = new HeaderToken({ content: ["a"] });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette un en-tête sans contenu", () => {
    // GIVEN
    const token = new HeaderToken({});

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });
});

describe("HeaderToken — toString", () => {
  it("joint le contenu par des points-virgules et termine par un saut de ligne", () => {
    // GIVEN
    const token = new HeaderToken({ content: ["a", "b"] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("a;b\n");
  });

  it("utilise le séparateur fourni", () => {
    // GIVEN
    const token = new HeaderToken({ content: ["a", "b"], separator: SEPARATORS.COMMA.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("a,b\n");
  });

  it("n'ajoute pas de séparateur pour une seule colonne", () => {
    // GIVEN
    const token = new HeaderToken({ content: ["a"] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("a\n");
  });

  it("rend le message d'erreur quand l'en-tête est vide", () => {
    // GIVEN
    const token = new HeaderToken({});

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.HEADER));
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new HeaderToken({ content: ["a"], hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("HeaderToken — getTitle", () => {
  it("renvoie le libellé d'en-tête", () => {
    // GIVEN
    const token = new HeaderToken({ content: ["a"] });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.HEADER);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new HeaderToken({ hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.HEADER}`);
  });
});
