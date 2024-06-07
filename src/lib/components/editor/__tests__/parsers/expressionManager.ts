import { roots } from "protobufjs";
import {
  Expression,
  TerminalNodeType,
  parseExpression,
} from "../../parsers/expressionParser";
import { ValueType } from "../../types";

describe("Test suite for expression parser", () => {
  it("Given a single expression should only return left", () => {
    const expresssion = "planContext['features']['test']";
    const ast: Expression = {
      type: TerminalNodeType.PlanContext,
      root: "features",
      value: "test",
    };
    expect(parseExpression(expresssion)).toStrictEqual(ast);
  });
  it("Given a expression should return AST", () => {
    const expresssion =
      "planContext['usageLimits']['maxPets'] <= userContext['pets']";
    const ast: Expression = {
      left: {
        type: TerminalNodeType.PlanContext,
        root: "usageLimits",
        value: "maxPets",
      },
      right: {
        type: TerminalNodeType.UserContext,
        value: "pets",
      },
      operator: "<=",
    };
    expect(parseExpression(expresssion)).toStrictEqual(ast);
  });

  it("Given a boolean expression should return AST", () => {
    const expresssion =
      "planContext['features']['privateRepo'] && userContext['repo']";
    const ast: Expression = {
      left: {
        type: TerminalNodeType.PlanContext,
        root: "features",
        value: "privateRepo",
      },
      right: {
        type: TerminalNodeType.UserContext,
        value: "repo",
      },
      operator: "&&",
    };
    expect(parseExpression(expresssion)).toStrictEqual(ast);
  });

  it("Given a text expression should return valid AST", () => {
    const expresssion = "planContext['features']['rol'] == 'ADMIN'";
    const ast: Expression = {
      left: {
        type: TerminalNodeType.PlanContext,
        root: "features",
        value: "rol",
      },
      right: {
        type: TerminalNodeType.String,
        value: "ADMIN",
      },
      operator: "==",
    };
    expect(parseExpression(expresssion)).toStrictEqual(ast);
  });

  it("Given only userContext should throw Invalid Expression", () => {
    const expression = "userContext['wrong']";

    expect(() => parseExpression(expression)).toThrow();
  });

  it("Given only a string should throw Invalid Expression", () => {
    const expression = "'Wrong'";
    expect(() => parseExpression(expression)).toThrow();
  });
});
