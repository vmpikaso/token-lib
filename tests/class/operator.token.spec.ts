import { describe, expect, it } from "vitest";
import { OperatorToken } from "../../src/class/operator.token.js";
import { OPERATORS, type Operator } from "../../src/constants/operators.js";
import { TOKEN_TITLE } from "../../src/constants/token.title.js";
import { TOKEN_TYPE } from "../../src/constants/token.type.js";
import { getErrorMessage } from "../../src/utils/error-message.js";

/** `toString()` court-circuite sur un jeton caché : on observe `_render` directement. */
const render = (token: OperatorToken) => (token as unknown as { _render(): string })._render();

describe("OperatorToken — constructeur", () => {
  it("force le type opérateur", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new OperatorToken(input);

    // THEN
    expect(token.type).toBe(TOKEN_TYPE.OPERATOR);
  });

  it("laisse la valeur vide quand aucun symbole n'est fourni", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new OperatorToken(input);

    // THEN
    expect(token.value).toBe("");
  });

  it("conserve l'opérateur fourni", () => {
    // GIVEN
    const input = { value: OPERATORS.AND.value };

    // WHEN
    const token = new OperatorToken(input);

    // THEN
    expect(token.value).toBe("&&");
  });
});

describe("OperatorToken — getTitle", () => {
  it("renvoie le libellé nu tant qu'aucun symbole n'est choisi", () => {
    // GIVEN
    const token = new OperatorToken({});

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.OPERATOR);
  });

  it("intègre le symbole + dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.PLUS.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( + )`);
  });

  it("intègre le symbole - dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.MINUS.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( - )`);
  });

  it("intègre le symbole * dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.MULTIPLY.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( * )`);
  });

  it("intègre le symbole / dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.DIVIDE.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( / )`);
  });

  it("intègre le symbole % dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.MODULO.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( % )`);
  });

  it("intègre le symbole && dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.AND.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( && )`);
  });

  it("intègre le symbole || dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.OR.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( || )`);
  });

  it("intègre le symbole == dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.EQUAL.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( == )`);
  });

  it("intègre le symbole != dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.DIFFERENT.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( != )`);
  });

  it("intègre le symbole > dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.GREATER_THAN.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( > )`);
  });

  it("intègre le symbole >= dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.GREATER_OR_EQUAL.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( >= )`);
  });

  it("intègre le symbole < dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.LESS_THAN.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( < )`);
  });

  it("intègre le symbole <= dans le libellé", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.LESS_OR_EQUAL.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( <= )`);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.PLUS.value, hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.OPERATOR} ( + )`);
  });
});

describe("OperatorToken — toString", () => {
  it("rend le symbole + tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.PLUS.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("+");
  });

  it("rend le symbole - tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.MINUS.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("-");
  });

  it("rend le symbole * tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.MULTIPLY.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("*");
  });

  it("rend le symbole / tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.DIVIDE.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("/");
  });

  it("rend le symbole % tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.MODULO.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("%");
  });

  it("rend le symbole && tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.AND.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("&&");
  });

  it("rend le symbole || tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.OR.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("||");
  });

  it("rend le symbole == tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.EQUAL.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("==");
  });

  it("rend le symbole != tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.DIFFERENT.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("!=");
  });

  it("rend le symbole > tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.GREATER_THAN.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(">");
  });

  it("rend le symbole >= tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.GREATER_OR_EQUAL.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(">=");
  });

  it("rend le symbole < tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.LESS_THAN.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("<");
  });

  it("rend le symbole <= tel quel", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.LESS_OR_EQUAL.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("<=");
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.OR.value, hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("OperatorToken — état non renseigné", () => {
  it("est invalide tant qu'aucun symbole n'est choisi", () => {
    // GIVEN
    const token = new OperatorToken({});

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });

  it("rend le message d'erreur plutôt qu'un symbole fantaisiste", () => {
    // GIVEN
    const token = new OperatorToken({});

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.OPERATOR));
  });

  it("signale l'état caché dans le message d'erreur", () => {
    // GIVEN
    const token = new OperatorToken({ hidden: true });

    // WHEN
    const result = render(token);

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.OPERATOR, true));
  });

  it("rejette un symbole qui n'appartient pas à la liste des opérateurs", () => {
    // GIVEN
    const token = new OperatorToken({ value: "**" as Operator });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });

  it("rend le message d'erreur pour un symbole inconnu", () => {
    // GIVEN
    const token = new OperatorToken({ value: "**" as Operator });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.OPERATOR));
  });
});

describe("OperatorToken — isValid", () => {
  // La validité d'un opérateur retombe entièrement sur celle de la classe de base
  // (longueur de la valeur), déjà couverte exhaustivement dans token.spec.ts : deux
  // symboles représentatifs suffisent ici.
  it("accepte un symbole d'un caractère", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.PLUS.value });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("accepte un symbole de deux caractères", () => {
    // GIVEN
    const token = new OperatorToken({ value: OPERATORS.GREATER_OR_EQUAL.value });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });
});
