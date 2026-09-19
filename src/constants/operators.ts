export type OperatorItem = { label: string; value: string };

export const OPERATORS = {
  PLUS: { label: "Plus", value: "+" },
  MINUS: { label: "Moins", value: "-" },
  MULTIPLY: { label: "Multiplié par", value: "*" },
  DIVIDE: { label: "Divisé par", value: "/" },
  MODULO: { label: "Modulo", value: "%" },
  AND: { label: "Et", value: "&&" },
  OR: { label: "Ou", value: "||" },
  EQUAL: { label: "Égal à", value: "==" },
  DIFFERENT: { label: "Différent de", value: "!=" },
  GREATER_THAN: { label: "Supérieur à", value: ">" },
  GREATER_OR_EQUAL: { label: "Supérieur ou égal à", value: ">=" },
  LESS_THAN: { label: "Inférieur à", value: "<" },
  LESS_OR_EQUAL: { label: "Inférieur ou égal à", value: "<=" },
} as const satisfies Record<string, OperatorItem>;

export type Operator = (typeof OPERATORS)[keyof typeof OPERATORS]["value"];

export const OPERATOR_VALUES = new Set<Operator>(Object.values(OPERATORS).map((operator) => operator.value));
