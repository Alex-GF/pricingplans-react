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
});
