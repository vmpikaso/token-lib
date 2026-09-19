import { describe, expect, it } from "vitest";
import { ExpressionToken } from "../../src/class/expression.token.js";
import { OperatorToken } from "../../src/class/operator.token.js";
import { OPERATORS } from "../../src/constants/operators.js";
import { TOKEN_TITLE } from "../../src/constants/token.title.js";
import { TOKEN_TYPE } from "../../src/constants/token.type.js";
import { getErrorMessage } from "../../src/utils/error-message.js";
import { text } from "../helpers/fixtures.js";

describe("ExpressionToken — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new ExpressionToken(input);

    // THEN
    expect(token).toEqual(expect.objectContaining({ type: TOKEN_TYPE.EXPRESSION, expression: [], value: "", hidden: false }));
  });

  it("conserve l'expression fournie", () => {
    // GIVEN
    const input = { expression: [text("a")] };

    // WHEN
    const token = new ExpressionToken(input);

    // THEN
    expect(token.expression).toHaveLength(1);
  });
});

describe("ExpressionToken — isValid", () => {
  it("accepte une expression non vide", () => {
    // GIVEN
    const token = new ExpressionToken({ expression: [text("a")] });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette une expression vide", () => {
    // GIVEN
    const token = new ExpressionToken({});

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });
});

describe("ExpressionToken — toString", () => {
  it("encadre un membre unique par les marqueurs d'expression", () => {
    // GIVEN
    const token = new ExpressionToken({ expression: [text("a")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("@&a&@");
  });

  it("concatène les membres sans séparateur", () => {
    // GIVEN
    const token = new ExpressionToken({
      expression: [text("a"), new OperatorToken({ value: OPERATORS.EQUAL.value }), text("b")],
    });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("@&a==b&@");
  });

  it("ignore les membres cachés", () => {
    // GIVEN
    const token = new ExpressionToken({ expression: [text("a"), text("b", true)] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("@&a&@");
  });

  it("rend le message d'erreur quand l'expression est vide", () => {
    // GIVEN
    const token = new ExpressionToken({});

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.EXPRESSION));
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new ExpressionToken({ expression: [text("a")], hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("ExpressionToken — getTitle", () => {
  it("renvoie le libellé d'expression", () => {
    // GIVEN
    const token = new ExpressionToken({ expression: [text("a")] });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.EXPRESSION);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new ExpressionToken({ hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.EXPRESSION}`);
  });
});
