import { ValueType } from "../types/index";
import { AllFeatures } from "../types/features";

type Noop = "";
type Lower = "<";
type LowerEquals = "<=";
type Equals = "==";
type GreaterEquals = ">=";
type Greater = ">";
type Different = "!=";
type And = "&&";
type Or = "||";
type None = "None";

export type UserContextAttributes = UserContextAttribute[];

export interface UserContextAttribute {
  name: string;
  valueType: ValueType;
}

export type Operators =
  | Noop
  | Lower
  | LowerEquals
  | Equals
  | GreaterEquals
  | Greater
  | Different
  | And
  | Or
  | None;

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

export function parseAttributeExpressionToUserAttributes(
  features: AllFeatures[]
): UserContextAttributes {
  return features.map((feature) => {
    const expression = parseExpression(feature.expression);

    return { valueType: feature.valueType, name: expression.userContext || "" };
  });
}

function parseToken(token: string): ParsedToken {
  const userContextRegex = /userContext\['(\w+)'\]/gm;
  const planContextRegex = /planContext\['(\w+)'\]/gm;
  const userContextMatch = Array.from(token.matchAll(userContextRegex));
  const planContextMatch = Array.from(token.matchAll(planContextRegex));

  if (token === "<") {
    return { type: "Operator", value: "<" };
  } else if (token === "<=") {
    return { type: "Operator", value: "<=" };
  } else if (token === "==") {
    return { type: "Operator", value: "==" };
  } else if (token === ">=") {
    return { type: "Operator", value: ">=" };
  } else if (token === ">") {
    return { type: "Operator", value: ">" };
  } else if (token === "!=") {
    return { type: "Operator", value: "!=" };
  } else if (token === "&&") {
    return { type: "Operator", value: "&&" };
  } else if (token === "||") {
    return { type: "Operator", value: "||" };
  } else if (token === "None") {
    return { type: "Operator", value: "None" };
  } else if (token === "") {
    return { type: "Noop", value: "" };
  } else if (userContextMatch.length === 0 && planContextMatch.length > 0) {
    return { type: "PlanContext", value: planContextMatch[0][1] };
  } else if (userContextMatch.length > 0 && planContextMatch.length === 0) {
    return { type: "UserContext", value: userContextMatch[0][1] };
  } else if (userContextMatch.length === 0 && planContextMatch.length === 0) {
    return { type: "CustomValue", value: token };
  } else {
    return { type: "Unknown", value: "" };
  }
}

export function parseExpression(expression: string): Expression {
  const tokens = expression
    .trim()
    .split(" ")
    .map((token) => parseToken(token));

  let res: Expression = { operator: "", planContext: "" };

  tokens.map((token) => {
    switch (token.type) {
      case "PlanContext": {
        res.planContext = token.value;
        break;
      }
      case "UserContext": {
        res.userContext = token.value;
        break;
      }
      case "CustomValue": {
        res.customValue = token.value;
        break;
      }
      case "Operator":
        res.operator = token.value as Operators;
      case "Noop":
      case "Unknown":
        break;
    }
  });
  return res;
}

export function computeEvaluation(
  leftOperand: string,
  operator: Operators,
  rightOperand: string
) {
  switch (operator) {
    case "":
      return "";
    case "<":
    case "<=":
    case "==":
    case ">=":
    case ">":
    case "!=":
    case "||":
    case "&&":
      return `${leftOperand} ${operator} ${rightOperand}`;
    case "None":
      return leftOperand;
  }
}

export function computeType(value: any): ValueType {
  switch (typeof value) {
    case "string":
      return ValueType.TEXT;
    case "number":
      return ValueType.NUMERIC;
    case "boolean":
      return ValueType.BOOLEAN;
    default:
      return ValueType.TEXT;
  }
}
