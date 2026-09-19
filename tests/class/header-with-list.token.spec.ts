import { describe, expect, it } from "vitest";
import { ColumnToken } from "../../src/class/column.token.js";
import { HeaderWithListToken } from "../../src/class/header-with-list.token.js";
import { ListToken } from "../../src/class/list.token.js";
import { SEPARATORS } from "../../src/constants/separator.js";
import { TOKEN_TITLE } from "../../src/constants/token.title.js";
import { TOKEN_TYPE } from "../../src/constants/token.type.js";
import { getErrorMessage } from "../../src/utils/error-message.js";
import { makeColumn, makeList, text } from "../helpers/fixtures.js";

describe("HeaderWithListToken — constructeur", () => {
  it("applique les valeurs par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new HeaderWithListToken(input);

    // THEN
    expect(token).toEqual(
      expect.objectContaining({ type: TOKEN_TYPE.HEADER_WITH_LIST, columns: [], list: undefined, value: "" }),
    );
  });

  it("utilise le point-virgule comme séparateur par défaut", () => {
    // GIVEN
    const input = {};

    // WHEN
    const token = new HeaderWithListToken(input);

    // THEN
    expect(token.separator).toBe(";");
  });

  it("conserve la liste et les colonnes fournies", () => {
    // GIVEN
    const list = makeList();
    const input = { list, columns: [makeColumn("C1", "v1")] };

    // WHEN
    const token = new HeaderWithListToken(input);

    // THEN
    expect(token.list).toBe(list);
    expect(token).toEqual(expect.objectContaining(input));
  });
});

describe("HeaderWithListToken — isValid", () => {
  it("accepte un en-tête doté d'une liste", () => {
    // GIVEN
    const token = new HeaderWithListToken({ list: makeList() });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });

  it("rejette un en-tête sans liste", () => {
    // GIVEN
    const token = new HeaderWithListToken({});

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(false);
  });

  it("reste valide même sans colonne", () => {
    // GIVEN
    const token = new HeaderWithListToken({ list: makeList(), columns: [] });

    // WHEN
    const result = token.isValid();

    // THEN
    expect(result).toBe(true);
  });
});

describe("HeaderWithListToken — toString", () => {
  it("rend le message d'erreur quand la liste est absente", () => {
    // GIVEN
    const token = new HeaderWithListToken({});

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.HEADER_WITH_LIST));
  });

  it("rend le message d'erreur quand la liste est invalide", () => {
    // GIVEN
    const token = new HeaderWithListToken({ list: new ListToken({}), columns: [makeColumn("C1", "v1")] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(getErrorMessage(TOKEN_TITLE.HEADER_WITH_LIST));
  });

  it("ne rend que la ligne de titres quand la liste est cachée", () => {
    // GIVEN
    const token = new HeaderWithListToken({
      list: new ListToken({ value: "liste", alias: "a", hidden: true }),
      columns: [makeColumn("C1", "v1")],
    });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("C1\n");
  });

  it("rend les enfants de la liste après le contenu des colonnes", () => {
    // GIVEN
    const token = new HeaderWithListToken({
      list: new ListToken({ value: "liste", alias: "a", children: [text("ENFANT")] }),
      columns: [makeColumn("C1", "v1")],
    });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('C1\n#@a="liste" v1ENFANT\n@#');
  });

  it("honore le jumpLine de la liste", () => {
    // GIVEN
    const token = new HeaderWithListToken({
      list: new ListToken({ value: "liste", alias: "a", jumpLine: false }),
      columns: [makeColumn("C1", "v1")],
    });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('C1\n#@a="liste" v1@#');
  });

  it("assemble la ligne de titres et la liste", () => {
    // GIVEN
    const token = new HeaderWithListToken({
      list: makeList(),
      columns: [makeColumn("C1", "v1"), makeColumn("C2", "v2")],
    });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('C1;C2\n#@a="liste" v1;v2\n@#');
  });

  it("applique le séparateur fourni aux titres comme au contenu", () => {
    // GIVEN
    const token = new HeaderWithListToken({
      list: makeList(),
      columns: [makeColumn("C1", "v1"), makeColumn("C2", "v2")],
      separator: SEPARATORS.COMMA.value,
    });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('C1,C2\n#@a="liste" v1,v2\n@#');
  });

  it("ignore entièrement les colonnes cachées, titre compris", () => {
    // GIVEN
    const token = new HeaderWithListToken({
      list: makeList(),
      columns: [makeColumn("C1", "v1"), makeColumn("C2", "v2", true), makeColumn("C3", "v3")],
    });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('C1;C3\n#@a="liste" v1;v3\n@#');
  });

  it("produit des lignes vides quand toutes les colonnes sont cachées", () => {
    // GIVEN
    const token = new HeaderWithListToken({ list: makeList(), columns: [makeColumn("C1", "v1", true)] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('\n#@a="liste" \n@#');
  });

  it("produit des lignes vides quand il n'y a aucune colonne", () => {
    // GIVEN
    const token = new HeaderWithListToken({ list: makeList() });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('\n#@a="liste" \n@#');
  });

  it("intègre le message d'erreur d'une colonne invalide", () => {
    // GIVEN
    const token = new HeaderWithListToken({ list: makeList(), columns: [new ColumnToken({ content: [text("v1")] })] });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe(`\n#@a="liste" ${getErrorMessage(TOKEN_TITLE.COLUMN)}\n@#`);
  });

  it("utilise le préfixe de la liste, y compris ses parents", () => {
    // GIVEN
    const token = new HeaderWithListToken({
      list: new ListToken({ value: "liste", alias: "a", parent: ["p"] }),
      columns: [makeColumn("C1", "v1")],
    });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe('C1\n#@a="p.liste" v1\n@#');
  });

  it("renvoie une chaîne vide quand le jeton est caché", () => {
    // GIVEN
    const token = new HeaderWithListToken({ list: makeList(), columns: [makeColumn("C1", "v1")], hidden: true });

    // WHEN
    const result = token.toString();

    // THEN
    expect(result).toBe("");
  });
});

describe("HeaderWithListToken — getTitle", () => {
  it("renvoie le libellé dédié", () => {
    // GIVEN
    const token = new HeaderWithListToken({ list: makeList() });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(TOKEN_TITLE.HEADER_WITH_LIST);
  });

  it("préfixe le libellé quand le jeton est caché", () => {
    // GIVEN
    const token = new HeaderWithListToken({ hidden: true });

    // WHEN
    const title = token.getTitle();

    // THEN
    expect(title).toBe(`(Caché) ${TOKEN_TITLE.HEADER_WITH_LIST}`);
  });
});
