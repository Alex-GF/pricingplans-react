import { Tokens, TokenType, tokenize } from "../../parsers/expressionParser";

describe("Expression parser test suite", () => {
  it("Given word surrounded by single quotes should produce a String", () => {
    const expectedResult: Tokens = [
      { type: TokenType.String, value: "'String'", start: 0, end: 7 },
    ];
    expect(tokenize("'String'")).toStrictEqual(expectedResult);
  });

  it("Given digits should create a number", () => {
    const expectedResult: Tokens = [
      { type: TokenType.Number, value: "1234", start: 0, end: 3 },
    ];
    expect(tokenize("1234")).toStrictEqual(expectedResult);
  });

  it("Given operator should return an operator", () => {
    const expression = "< > <= >= + - * / == !=";
    const expectedResult: Tokens = [
      { type: TokenType.BinaryOperator, value: "<", start: 0, end: 0 },
      { type: TokenType.BinaryOperator, value: ">", start: 2, end: 2 },
      { type: TokenType.BinaryOperator, value: "<=", start: 4, end: 5 },
      { type: TokenType.BinaryOperator, value: ">=", start: 7, end: 8 },
      { type: TokenType.BinaryOperator, value: "+", start: 10, end: 10 },
      { type: TokenType.BinaryOperator, value: "-", start: 12, end: 12 },
      { type: TokenType.BinaryOperator, value: "*", start: 14, end: 14 },
      { type: TokenType.BinaryOperator, value: "/", start: 16, end: 16 },
      { type: TokenType.BinaryOperator, value: "==", start: 18, end: 19 },
      { type: TokenType.BinaryOperator, value: "!=", start: 21, end: 22 },
    ];
    expect(tokenize(expression)).toStrictEqual(expectedResult);
  });

  it("Given non defined token should throw", () => {
    expect(() => tokenize("$")).toThrow();
  });

  it("Given keyword should interpret correctly", () => {
    const expression = "planContext userContext";
    const expectedResult: Tokens = [
      { type: TokenType.Reserved, value: "planContext", start: 0, end: 10 },
      {
        type: TokenType.Reserved,
        value: "userContext",
        start: 12,
        end: 22,
      },
    ];
    expect(tokenize(expression)).toStrictEqual(expectedResult);
  });

  it("Given mix of tokens should parse correctly", () => {
    const expression = "'This' 1 <= userContext";
    const expectedResult: Tokens = [
      { type: TokenType.String, value: "'This'", start: 0, end: 5 },
      {
        type: TokenType.Number,
        value: "1",
        start: 7,
        end: 7,
      },
      {
        type: TokenType.BinaryOperator,
        value: "<=",
        start: 9,
        end: 10,
      },
      {
        type: TokenType.Reserved,
        value: "userContext",
        start: 12,
        end: 22,
      },
    ];
    expect(tokenize(expression)).toStrictEqual(expectedResult);
  });

  it("Given a keyword and brackets should parse content inside", () => {
    const expression = "planContext['features']['test']";
    const expectedResult: Tokens = [
      { type: TokenType.Reserved, value: "planContext", start: 0, end: 10 },
      {
        type: TokenType.OpenBracket,
        value: "[",
        start: 11,
        end: 11,
      },
      {
        type: TokenType.String,
        value: "'features'",
        start: 12,
        end: 21,
      },
      {
        type: TokenType.ClosedBracket,
        value: "]",
        start: 22,
        end: 22,
      },
      {
        type: TokenType.OpenBracket,
        value: "[",
        start: 23,
        end: 23,
      },
      {
        type: TokenType.String,
        value: "'test'",
        start: 24,
        end: 29,
      },

      {
        type: TokenType.ClosedBracket,
        value: "]",
        start: 30,
        end: 30,
      },
    ];
    expect(tokenize(expression)).toStrictEqual(expectedResult);
  });

  it("Given a binary expression should tokenize it correctly", () => {
    const expression =
      "planContext['usageLimits']['maxPets'] < userContext['pets']";
    const expectedResult: Tokens = [
      { type: TokenType.Reserved, value: "planContext", start: 0, end: 10 },
      {
        type: TokenType.OpenBracket,
        value: "[",
        start: 11,
        end: 11,
      },

      {
        type: TokenType.String,
        value: "'usageLimits'",
        start: 12,
        end: 24,
      },

      {
        type: TokenType.ClosedBracket,
        value: "]",
        start: 25,
        end: 25,
      },
      {
        type: TokenType.OpenBracket,
        value: "[",
        start: 26,
        end: 26,
      },

      {
        type: TokenType.String,
        value: "'maxPets'",
        start: 27,
        end: 35,
      },
      {
        type: TokenType.ClosedBracket,
        value: "]",
        start: 36,
        end: 36,
      },
      {
        type: TokenType.BinaryOperator,
        value: "<",
        start: 38,
        end: 38,
      },
      {
        type: TokenType.Reserved,
        value: "userContext",
        start: 40,
        end: 50,
      },
      {
        type: TokenType.OpenBracket,
        value: "[",
        start: 51,
        end: 51,
      },
      {
        type: TokenType.String,
        value: "'pets'",
        start: 52,
        end: 57,
      },

      {
        type: TokenType.ClosedBracket,
        value: "]",
        start: 58,
        end: 58,
      },
    ];
    expect(tokenize(expression)).toStrictEqual(expectedResult);
  });
});
