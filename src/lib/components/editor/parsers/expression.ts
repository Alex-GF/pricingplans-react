import { ValueType } from "../types/index";
import { AllFeatures } from "../types/features";

export enum Operators {
  Noop = "noop",
  Lower = "lt",
  LowerEquals = "lte",
  Greater = "gt",
  GreaterEquals = "gte",
  Equals = "eq",
  NotEquals = "nq",
  And = "and",
  Or = "or",
}

export type OperatorAndRepresentation = Record<Operators, string>;

export const OPERATORS_DICTIONARY: OperatorAndRepresentation = {
  [Operators.Noop]: "",
  [Operators.Lower]: "<",
  [Operators.LowerEquals]: "<=",
  [Operators.Greater]: ">",
  [Operators.GreaterEquals]: ">=",
  [Operators.Equals]: "==",
  [Operators.NotEquals]: "!=",
  [Operators.And]: "&&",
  [Operators.Or]: "||",
} as const;

export interface ExpressionState {
  operator: Operators;
  userContext: string;
  usageLimit: string;
  expressionType: "expression" | "binaryExpression";
}

export type UserContextAttributes = UserContextAttribute[];

export interface UserContextAttribute {
  name: string;
  valueType: ValueType;
}

export type Tokens =
  | NoopToken
  | OperatorToken
  | UserContextToken
  | PlanContextToken
  | CustomValueToken
  | UnknownToken;

export type NoopToken = "Noop";
export type OperatorToken = "Operator";
export type UserContextToken = "UserContext";
export type PlanContextToken = "PlanContext";
export type CustomValueToken = "CustomValue";
export type UnknownToken = "Unknown";
export type ParsedToken = { type: Tokens; value: string };

export type Command = "add" | "edit" | "delete";

export interface Expression {
  operator: Operators;
  planContext: string;
  userContext?: string;
  customValue?: string;
}

export function computeEvaluation(
  leftOperand: string,
  operator: Operators,
  rightOperand: string
) {
  if (operator === Operators.Noop) {
    return "";
  }
  return `${leftOperand} ${OPERATORS_DICTIONARY[operator]} ${rightOperand}`;
}

export function computeType(value: any): ValueType {
  switch (typeof value) {
    case "string":
      return ValueType.Text;
    case "number":
      return ValueType.Numeric;
    case "boolean":
      return ValueType.Boolean;
    default:
      return ValueType.Text;
  }
}
