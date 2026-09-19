import { describe, expect, it } from "vitest";
import { TokenExpression } from "../../src/class/token-expression.js";
import { TokenOperator } from "../../src/class/token-operator.js";
import { OPERATOR } from "../../src/constants/operators.js";
import { TOKEN_TITLE } from "../../src/constants/token-title.js";
import { TOKEN_TYPE } from "../../src/constants/token-type.js";
import { ERROR_MSG } from "../../src/interfaces/utils.js";
import { text } from "../helpers/fixtures.js";

describe("TokenExpression — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new TokenExpression(input);

    // THEN
    expect(token).toEqual(expect.objectContaining({ type: TOKEN_TYPE.EXPRESSION, expression: [], value: "", hidden: false }));
  });

  it("conserve l'expression fournie", () => {
    // GIVEN
    const input = { expression: [text("a")] };

    // WHEN
    const token = new TokenExpression(input);

    // THEN
    expect(token.expression).toHaveLength(1);
  });
});

describe("TokenExpression — isValid", () => {
  it("accepte une expression non vide", () => {
    // GIVEN
    const token = new TokenExpression({ expression: [text("a")] });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette une expression vide", () => {
    // GIVEN
    const token = new TokenExpression({});

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });
});

describe("TokenExpression — toString", () => {
  it("encadre un membre unique par les marqueurs d'expression", () => {
    // GIVEN
    const token = new TokenExpression({ expression: [text("a")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("@&a&@");
  });

  it("concatène les membres sans séparateur", () => {
    // GIVEN
    const token = new TokenExpression({
      expression: [text("a"), new TokenOperator({ value: OPERATOR.EQUAL.value }), text("b")],
    });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("@&a==b&@");
  });

  it("ignore les membres cachés", () => {
    // GIVEN
    const token = new TokenExpression({ expression: [text("a"), text("b", true)] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("@&a&@");
  });

  it("rend le message d'erreur quand l'expression est vide", () => {
    // GIVEN
    const token = new TokenExpression({});

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(ERROR_MSG(TOKEN_TITLE.EXPRESSION));
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new TokenExpression({ expression: [text("a")], hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("TokenExpression — getTitle", () => {
  it("renvoie le libellé d'expression", () => {
    // GIVEN
    const token = new TokenExpression({ expression: [text("a")] });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.EXPRESSION);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new TokenExpression({ hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.EXPRESSION}`);
  });
});
