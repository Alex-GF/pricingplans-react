import { Tokens, TokenType, tokenize } from "../../parsers/expressionParser";

describe("Expression parser test suite", () => {
  it("Given a literal should create", () => {
    const expectedResult: Tokens = [
      { type: TokenType.Literal, value: "Test", start: 0, end: 3 },
    ];
    expect(tokenize("Test")).toStrictEqual(expectedResult);
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
    const expression = "This (is a test) <= > 123";
    const expectedResult: Tokens = [
      { type: TokenType.Literal, value: "This", start: 0, end: 3 },
      {
        type: TokenType.OpenParen,
        value: "(",
        start: 5,
        end: 5,
      },
      {
        type: TokenType.Literal,
        value: "is",
        start: 6,
        end: 7,
      },
      {
        type: TokenType.Literal,
        value: "a",
        start: 9,
        end: 9,
      },
      {
        type: TokenType.Literal,
        value: "test",
        start: 11,
        end: 14,
      },
      {
        type: TokenType.ClosedParen,
        value: ")",
        start: 15,
        end: 15,
      },
      {
        type: TokenType.BinaryOperator,
        value: "<=",
        start: 17,
        end: 18,
      },
      {
        type: TokenType.BinaryOperator,
        value: ">",
        start: 20,
        end: 20,
      },
      {
        type: TokenType.Number,
        value: "123",
        start: 22,
        end: 24,
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
        type: TokenType.SingleQuote,
        value: "'",
        start: 12,
        end: 12,
      },
      {
        type: TokenType.Reserved,
        value: "features",
        start: 13,
        end: 20,
      },
      {
        type: TokenType.SingleQuote,
        value: "'",
        start: 21,
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
        type: TokenType.SingleQuote,
        value: "'",
        start: 24,
        end: 24,
      },
      {
        type: TokenType.Literal,
        value: "test",
        start: 25,
        end: 28,
      },
      {
        type: TokenType.SingleQuote,
        value: "'",
        start: 29,
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
        type: TokenType.SingleQuote,
        value: "'",
        start: 12,
        end: 12,
      },
      {
        type: TokenType.Reserved,
        value: "usageLimits",
        start: 13,
        end: 23,
      },
      {
        type: TokenType.SingleQuote,
        value: "'",
        start: 24,
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
        type: TokenType.SingleQuote,
        value: "'",
        start: 27,
        end: 27,
      },
      {
        type: TokenType.Literal,
        value: "maxPets",
        start: 28,
        end: 34,
      },
      {
        type: TokenType.SingleQuote,
        value: "'",
        start: 35,
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
        type: TokenType.SingleQuote,
        value: "'",
        start: 52,
        end: 52,
      },
      {
        type: TokenType.Literal,
        value: "pets",
        start: 53,
        end: 56,
      },
      {
        type: TokenType.SingleQuote,
        value: "'",
        start: 57,
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
