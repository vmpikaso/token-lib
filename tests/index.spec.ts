import { describe, expect, it } from "vitest";
import * as api from "../src/index.js";

const CLASSES = [
  "Token",
  "TokenColumn",
  "TokenCondition",
  "TokenContainer",
  "TokenExpression",
  "TokenField",
  "TokenHeader",
  "TokenHeaderWithList",
  "TokenList",
  "TokenOperator",
  "TokenText",
] as const;

const CONSTANTS = ["OPERATORS", "OPERATOR_VALUES", "SEPARATORS", "TOKEN_TITLE", "TOKEN_TYPE"] as const;

const HELPERS = ["arrayToString", "getErrorMessage"] as const;

/**
 * Capturé au chargement du module, avant l'exécution du moindre test : vaut 0
 * uniquement si l'import du barrel n'a construit aucun jeton lui-même.
 */
const idOfFirstTokenAfterImport = new api.Token({}).getId();

/** Vue indexable du barrel : l'accès dynamique au namespace lui-même est déconseillé. */
const exported: Record<string, unknown> = api;

describe("surface publique du barrel", () => {
  it("exporte les onze classes de jetons", () => {
    // GIVEN
    const names = CLASSES;

    // WHEN
    const types = names.map((name) => typeof exported[name]);

    // THEN
    expect(types).toEqual(names.map(() => "function"));
  });

  it("exporte les cinq constantes", () => {
    // GIVEN
    const names = CONSTANTS;

    // WHEN
    const values = names.map((name) => exported[name]);

    // THEN
    expect(values.every((value) => typeof value === "object" && value !== null)).toBe(true);
  });

  it("exporte les deux fonctions utilitaires", () => {
    // GIVEN
    const names = HELPERS;

    // WHEN
    const types = names.map((name) => typeof exported[name]);

    // THEN
    expect(types).toEqual(names.map(() => "function"));
  });

  it("n'expose rien d'autre que la surface attendue", () => {
    // GIVEN
    const expected = [...CLASSES, ...CONSTANTS, ...HELPERS].sort();

    // WHEN
    const actual = Object.keys(api).sort();

    // THEN
    expect(actual).toEqual(expected);
  });

  it("expose des classes réellement instanciables", () => {
    // GIVEN
    const token = new api.TokenField({ value: "nom" });

    // WHEN
    const result = token.toString();

    // THEN
    expect(token).toBeInstanceOf(api.Token);
    expect(result).toBe('"@@nom@@"');
  });

  it("ne construit aucun jeton à l'import", () => {
    // GIVEN
    const id = idOfFirstTokenAfterImport;

    // WHEN
    const isFirst = id === 0;

    // THEN
    expect(isFirst).toBe(true);
  });
});
