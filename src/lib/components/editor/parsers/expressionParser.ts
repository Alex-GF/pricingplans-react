import { Value, ValueType } from "../types";
import { TokenType, Tokens, tokenize } from "./tokenizer";

export type Expression =
  | {
      left: TerminalNode;
      right: TerminalNode;
      operator: string;
    }
  | PlanContextNode;

export enum TerminalNodeType {
  Number = "number",
  String = "string",
  PlanContext = "planContext",
  UserContext = "userContext",
}

interface NumberNode {
  type: TerminalNodeType.Number;
  value: number;
}

interface StringNode {
  type: TerminalNodeType.String;
  value: string;
}

interface PlanContextNode {
  type: TerminalNodeType.PlanContext;
  root: "features" | "usageLimits";
  value: string;
}

interface UserContextNode {
  type: TerminalNodeType.UserContext;
  value: string;
}

type TerminalNode = StringNode | NumberNode | PlanContextNode | UserContextNode;

export function parseExpression(expression: string): Expression {
  const tokens = tokenize(expression);

  let cursor = 0;
  while (cursor < tokens.length) {
    if (tokens[cursor].type === TokenType.BinaryOperator) {
      const operator = tokens[cursor].value;
      switch (operator) {
        case "==":
        case "!=":
          return {
            left: parseTerminalNode(tokens.slice(0, cursor)),
            right: parseTerminalNode(tokens.slice(cursor + 1)),
            operator,
          };
        case "<":
        case "<=":
        case ">":
        case ">=": {
          const left = parseTerminalNode(tokens.slice(0, cursor));
          const right = parseTerminalNode(tokens.slice(cursor + 1));
          if (left.type === TerminalNodeType.String) {
            throw Error(
              `Left side has a string. You cannot compare a string with these operators < <= >= >`
            );
          }

          if (right.type === TerminalNodeType.String) {
            throw Error(
              `Rigth side has a string. You cannot compare a string with these operators < <= >= >`
            );
          }
          return { left, right, operator };
        }

        case "&&":
        case "||": {
          const left = parseTerminalNode(tokens.slice(0, cursor));
          const right = parseTerminalNode(tokens.slice(cursor + 1));
          if (left.type === TerminalNodeType.String) {
            throw Error(
              `Left side has a string. You cannot do logical operations with && or ||`
            );
          }

          if (right.type === TerminalNodeType.String) {
            throw Error(
              `Rigth side has a string. You cannot do logical operations with && or ||`
            );
          }

          if (left.type === TerminalNodeType.Number) {
            throw Error(
              `Left side has a number. You cannot do logical operations with && or ||`
            );
          }

          if (right.type === TerminalNodeType.Number) {
            throw Error(
              `Rigth side has a number. You cannot do logical operations with && or ||`
            );
          }

          return {
            left,
            right,
            operator,
          };
        }
        default:
          throw Error("Unsuported operator " + operator);
      }
    }
    cursor++;
  }

  if (
    tokens[0].type === TokenType.Reserved &&
    tokens[0].value === "planContext"
  ) {
    return parsePlanContextNode(tokens);
  }
  throw Error(
    "Invalid expression " +
      expression +
      `\n Identified tokens are ${JSON.stringify(tokens, null, 2)}\n`
  );
}

function parseTerminalNode(tokens: Tokens): TerminalNode {
  if (tokens.length === 1) {
    if (tokens[0].type === TokenType.Number) {
      return { type: TerminalNodeType.Number, value: Number(tokens[0].value) };
    } else if (tokens[0].type === TokenType.String) {
      return {
        type: TerminalNodeType.String,
        value: tokens[0].value.slice(1, -1),
      };
    } else {
      throw Error(
        "Unexpected token:\n" +
          `Type: ${tokens[0].type}\n` +
          `Value: ${tokens[0].value}\n`
      );
    }
  } else {
    if (
      tokens[0].type === TokenType.Reserved &&
      tokens[0].value === "userContext"
    ) {
      return parseUserConntextNode(tokens);
    } else if (
      tokens[0].type === TokenType.Reserved &&
      tokens[0].value === "planContext"
    ) {
      return parsePlanContextNode(tokens);
    } else {
      throw Error(
        "Unable to handle this stream of tokens:\n" +
          `${JSON.stringify(tokens, null, 2)}`
      );
    }
  }
}

function parsePlanContextNode(tokens: Tokens): PlanContextNode {
  if (tokens.length !== 7) {
    throw Error(
      "Invalid syntax when accesing planContext. Valid syntax is userContext['<features | usageLimits>']['<string>']"
    );
  }

  if (tokens[1].type !== TokenType.OpenBracket) {
    throw Error(
      "Expected OPENING_BRACKETS '[' after planContext but found\n" +
        `TokenType: ${tokens[1].type}\n` +
        `Value: "${tokens[1].value}"\n`
    );
  }

  if (tokens[2].type !== TokenType.String) {
    throw Error(
      "Expected a <string> to access the userContext map but found:\n" +
        `Type: ${tokens[2].type}\n` +
        `Value: ${tokens[2].value}\n`
    );
  }

  const root = tokens[2].value.slice(1, -1);

  if (!["usageLimits", "features"].includes(root)) {
    throw Error(
      "Expected  to access features or usageLimits map but found:\n" +
        `Type: ${tokens[2].type}\n` +
        `Value: ${tokens[2].value}\n`
    );
  }

  if (tokens[3].type !== TokenType.ClosedBracket) {
    throw Error(
      "Expected to close Map accessing expression with closing bracket ']'  but found:\n" +
        `Type: ${tokens[3].type}\n` +
        `Value: ${tokens[3].value}\n`
    );
  }

  if (tokens[4].type !== TokenType.OpenBracket) {
    throw Error(
      "Expected OPENING_BRACKETS '[' to access a feature but found\n" +
        `TokenType: ${tokens[4].type}\n` +
        `Value: "${tokens[4].value}"\n`
    );
  }

  if (tokens[5].type !== TokenType.String) {
    throw Error(
      "Expected a <string> to access a concrete feature but found:\n" +
        `Type: ${tokens[5].type}\n` +
        `Value: ${tokens[5].value}\n`
    );
  }

  if (tokens[6].type !== TokenType.ClosedBracket) {
    throw Error(
      "Expected to close Map accessing expression with closing bracket ']'  but found:\n" +
        `Type: ${tokens[6].type}\n` +
        `Value: ${tokens[6].value}\n`
    );
  }

  return {
    type: TerminalNodeType.PlanContext,
    root: root === "features" ? "features" : "usageLimits",
    value: tokens[5].value.slice(1, -1),
  };
}

function parseUserConntextNode(tokens: Tokens): UserContextNode {
  if (tokens.length !== 4) {
    throw Error(
      "Invalid syntax when accesing userContext. Valid syntax is userContext['<string>']"
    );
  }

  if (tokens[1].type !== TokenType.OpenBracket) {
    throw Error(
      "Expected OPENING_BRACKETS '[' after userContext but found\n" +
        `TokenType: ${tokens[1].type}\n` +
        `Value: "${tokens[1].value}"\n`
    );
  }

  if (tokens[2].type !== TokenType.String) {
    throw Error(
      "Expected a <string> to access the userContext map but found:\n" +
        `Type: ${tokens[2].type}\n` +
        `Value: ${tokens[2].value}\n`
    );
  }

  if (tokens[3].type !== TokenType.ClosedBracket) {
    throw Error(
      "Expected to close Map accessing expression with closing bracket ']'  but found:\n" +
        `Type: ${tokens[3].type}\n` +
        `Value: ${tokens[3].value}\n`
    );
  }

  return {
    type: TerminalNodeType.UserContext,
    value: tokens[2].value.slice(1, -1),
  };
}
