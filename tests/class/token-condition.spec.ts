import { describe, expect, it } from "vitest";
import { TokenCondition } from "../../src/class/token-condition.js";
import { TokenExpression } from "../../src/class/token-expression.js";
import { TOKEN_TITLE } from "../../src/constants/token-title.js";
import { TOKEN_TYPE } from "../../src/constants/token-type.js";
import { getErrorMessage } from "../../src/utils/error-message.js";
import { text, validCondition } from "../helpers/fixtures.js";

describe("TokenCondition — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new TokenCondition(input);

    // THEN
    expect(token).toEqual(
      expect.objectContaining({
        type: TOKEN_TYPE.CONDITION,
        then: [],
        else: [],
        value: "",
        condition: expect.any(TokenExpression),
      }),
    );
  });

  it("construit une condition par défaut vide, donc invalide", () => {
    // GIVEN
    const token = new TokenCondition({});

    // WHEN
    const result = token.condition.isValid();

    // THEN
    expect(result).toBe(false);
  });

  it("mappe thenBlock et elseBlock sur les champs then et else", () => {
    // GIVEN
    const input = { thenBlock: [text("y")], elseBlock: [text("z")] };

    // WHEN
    const token = new TokenCondition(input);

    // THEN
    expect(token).toEqual(expect.objectContaining({ then: input.thenBlock, else: input.elseBlock }));
  });
});

describe("TokenCondition — isValid", () => {
  it("délègue la validité à la condition", () => {
    // GIVEN
    const token = new TokenCondition({ condition: validCondition() });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("est invalide quand la condition est vide", () => {
    // GIVEN
    const token = new TokenCondition({});

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });

  it("reste valide avec une condition cachée", () => {
    // GIVEN
    const token = new TokenCondition({ condition: validCondition(true) });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });
});

describe("TokenCondition — toString", () => {
  it("rend un bloc if/then sans else", () => {
    // GIVEN
    const token = new TokenCondition({ condition: validCondition(), thenBlock: [text("y")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("##if @&x&@##then y ##endif ");
  });

  it("ajoute le bloc else quand il est renseigné", () => {
    // GIVEN
    const token = new TokenCondition({ condition: validCondition(), thenBlock: [text("y")], elseBlock: [text("z")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("##if @&x&@##then y ##else z##endif ");
  });

  it("rend un bloc then vide sans échouer", () => {
    // GIVEN
    const token = new TokenCondition({ condition: validCondition() });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("##if @&x&@##then  ##endif ");
  });

  it("concatène plusieurs jetons dans chaque bloc", () => {
    // GIVEN
    const token = new TokenCondition({
      condition: validCondition(),
      thenBlock: [text("y1"), text("y2")],
      elseBlock: [text("z1"), text("z2")],
    });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("##if @&x&@##then y1y2 ##else z1z2##endif ");
  });

  it("n'interpole rien pour une condition cachée bien que celle-ci reste valide", () => {
    // GIVEN
    const token = new TokenCondition({ condition: validCondition(true), thenBlock: [text("y")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("##if ##then y ##endif ");
  });

  it("rend le message d'erreur quand la condition est invalide", () => {
    // GIVEN
    const token = new TokenCondition({ thenBlock: [text("y")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.CONDITION));
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new TokenCondition({ condition: validCondition(), thenBlock: [text("y")], hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("TokenCondition — getTitle", () => {
  it("renvoie le libellé de condition", () => {
    // GIVEN
    const token = new TokenCondition({ condition: validCondition() });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.CONDITION);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new TokenCondition({ hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.CONDITION}`);
  });
});
