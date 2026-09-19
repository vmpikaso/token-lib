import { describe, expect, it } from "vitest";
import { TokenOperator } from "../../src/class/token-operator.js";
import { OPERATOR } from "../../src/constants/operators.js";
import { TOKEN_TITLE } from "../../src/constants/token-title.js";
import { TOKEN_TYPE } from "../../src/constants/token-type.js";

describe("TokenOperator — constructeur", () => {
  it("force le type opérateur", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new TokenOperator(input);

    // THEN
    expect(token.type).toBe(TOKEN_TYPE.OPERATOR);
  });

  it("retombe sur la valeur sentinelle « operator » sans valeur fournie", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new TokenOperator(input);

    // THEN
    expect(token.value).toBe(TOKEN_TYPE.OPERATOR);
  });

  it("conserve l'opérateur fourni", () => {
    // GIVEN
    const input = { value: OPERATOR.AND.value };

    // WHEN
    const token = new TokenOperator(input);

    // THEN
    expect(token.value).toBe("&&");
  });
});

describe("TokenOperator — getTitle", () => {
  it("renvoie le libellé nu quand la valeur est la sentinelle par défaut", () => {
    // GIVEN
    const token = new TokenOperator({});

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.OPERATOR);
  });

  it("intègre le symbole + dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.MORE.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( + )`);
  });

  it("intègre le symbole - dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.LESS.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( - )`);
  });

  it("intègre le symbole * dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.MULTIPLY.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( * )`);
  });

  it("intègre le symbole / dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.DIVIDE.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( / )`);
  });

  it("intègre le symbole % dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.MODULO.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( % )`);
  });

  it("intègre le symbole && dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.AND.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( && )`);
  });

  it("intègre le symbole || dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.OR.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( || )`);
  });

  it("intègre le symbole == dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.EQUAL.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( == )`);
  });

  it("intègre le symbole != dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.DIFFERENT.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( != )`);
  });

  it("intègre le symbole > dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.GREAT_THAN.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( > )`);
  });

  it("intègre le symbole >= dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.GREAT_OR_EQUAL.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( >= )`);
  });

  it("intègre le symbole < dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.LESS_THAN.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( < )`);
  });

  it("intègre le symbole <= dans le libellé", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.LESS_OR_EQUAL.value });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`${TOKEN_TITLE.OPERATOR} ( <= )`);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.MORE.value, hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.OPERATOR} ( + )`);
  });
});

describe("TokenOperator — toString", () => {
  it("rend le symbole + tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.MORE.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("+");
  });

  it("rend le symbole - tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.LESS.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("-");
  });

  it("rend le symbole * tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.MULTIPLY.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("*");
  });

  it("rend le symbole / tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.DIVIDE.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("/");
  });

  it("rend le symbole % tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.MODULO.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("%");
  });

  it("rend le symbole && tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.AND.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("&&");
  });

  it("rend le symbole || tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.OR.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("||");
  });

  it("rend le symbole == tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.EQUAL.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("==");
  });

  it("rend le symbole != tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.DIFFERENT.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("!=");
  });

  it("rend le symbole > tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.GREAT_THAN.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(">");
  });

  it("rend le symbole >= tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.GREAT_OR_EQUAL.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(">=");
  });

  it("rend le symbole < tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.LESS_THAN.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("<");
  });

  it("rend le symbole <= tel quel", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.LESS_OR_EQUAL.value });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("<=");
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.OR.value, hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("TokenOperator — isValid", () => {
  // La validité d'un opérateur retombe entièrement sur celle de la classe de base
  // (longueur de la valeur), déjà couverte exhaustivement dans token.spec.ts : deux
  // symboles représentatifs suffisent ici.
  it("accepte un symbole d'un caractère", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.MORE.value });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("accepte un symbole de deux caractères", () => {
    // GIVEN
    const token = new TokenOperator({ value: OPERATOR.GREAT_OR_EQUAL.value });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });
});
