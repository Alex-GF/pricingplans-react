import {
  Expression,
  TerminalNodeType,
  parseExpression,
} from "../../parsers/expressionParser";

describe("Test suite for expression parser", () => {
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
});
