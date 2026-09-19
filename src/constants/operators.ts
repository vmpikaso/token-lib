export type OperatorItem = { name: string; value: string };

export const OPERATORS = {
  MORE: { name: "Plus", value: "+" },
  LESS: { name: "Moins", value: "-" },
  MULTIPLY: { name: "Multiplié", value: "*" },
  DIVIDE: { name: "Divisé", value: "/" },
  MODULO: { name: "Modulo", value: "%" },
  AND: { name: "ET", value: "&&" },
  OR: { name: "OU", value: "||" },
  EQUAL: { name: "Equal", value: "==" },
  DIFFERENT: { name: "Différent", value: "!=" },
  GREAT_THAN: { name: "Supérieur à", value: ">" },
  GREAT_OR_EQUAL: { name: "Supérieur ou équal à", value: ">=" },
  LESS_THAN: { name: "Inférieur à", value: "<" },
  LESS_OR_EQUAL: { name: "Inférieur ou équal à", value: "<=" },
} as const satisfies Record<string, OperatorItem>;

export type Operator = (typeof OPERATORS)[keyof typeof OPERATORS]["value"];

export const OPERATOR_VALUES = new Set<Operator>(Object.values(OPERATORS).map((operator) => operator.value));
