export enum TokenType {
  Number = "NUMBER",
  String = "STRING",
  OpenParen = "OPEN_PARENTHESIS",
  ClosedParen = "CLOSED_PARENTHESIS",
  OpenBracket = "OPEN_BRACKET",
  ClosedBracket = "CLOSED_BRACKET",
  BinaryOperator = "BINARY_OPERATOR",
  Reserved = "RESERVED",
}

export interface Token {
  type: TokenType;
  value: string;
  start: number;
  end: number;
}

export type Tokens = Token[];

function isSkippable(source: string) {
  return source === " " || source === "\t";
}

function isComposedOperator(source: string) {
  return ["<=", ">=", "==", "!=", "&&", "||"].includes(source);
}

function isSingleOperator(source: string) {
  return ["+", "-", "*", "/", "<", ">", "!"].includes(source);
}

function isNumber(source: string) {
  return (
    source.charCodeAt(0) >= "0".charCodeAt(0) &&
    source.charCodeAt(0) <= "9".charCodeAt(0)
  );
}

function isAlpha(source: string) {
  return (
    (source.charCodeAt(0) >= "A".charCodeAt(0) &&
      source.charCodeAt(0) <= "Z".charCodeAt(0)) ||
    (source.charCodeAt(0) >= "a".charCodeAt(0) &&
      source.charCodeAt(0) <= "z".charCodeAt(0))
  );
}

function token(
  type: TokenType,
  value: string,
  start: number,
  end: number
): Token {
  return { type, value, start, end };
}

const RESERVERD_WORDS = [
  "planContext",
  "userContext",
  "features",
  "usageLimits",
];

export function tokenize(expression: string): Tokens {
  const tokens = [];
  let buffer = "";
  let cursor = 0;
  while (cursor < expression.length) {
    const character = expression[cursor];
    if (isSkippable(character)) {
      cursor++;
    } else if (character === "(") {
      tokens.push(token(TokenType.OpenParen, character, cursor, cursor));
      cursor++;
    } else if (character === ")") {
      tokens.push(token(TokenType.ClosedParen, character, cursor, cursor));
      cursor++;
    } else if (character === "[") {
      tokens.push(token(TokenType.OpenBracket, character, cursor, cursor));
      cursor++;
    } else if (character === "]") {
      tokens.push(token(TokenType.ClosedBracket, character, cursor, cursor));
      cursor++;
    } else if (character === "'") {
      const start = cursor;
      const quotes = [expression[cursor]];
      while (cursor < expression.length && quotes.length === 1) {
        buffer += expression[cursor];
        if (cursor !== start && expression[cursor] === "'") {
          quotes.pop();
        }
        cursor++;
      }

      if (quotes.length !== 0) {
        throw Error("Syntax error unmatched quotes when lexing string token");
      }

      tokens.push(
        token(TokenType.String, buffer, start, start + buffer.length - 1)
      );
      buffer = "";
    } else if (
      expression[cursor + 1] &&
      isComposedOperator(expression[cursor] + expression[cursor + 1])
    ) {
      tokens.push(
        token(
          TokenType.BinaryOperator,
          expression[cursor] + expression[cursor + 1],
          cursor,
          cursor + 1
        )
      );
      cursor += 2;
    } else if (isSingleOperator(expression[cursor])) {
      tokens.push(
        token(TokenType.BinaryOperator, expression[cursor], cursor, cursor)
      );
      cursor++;
    } else if (isNumber(expression[cursor])) {
      const start = cursor;
      while (cursor < expression.length && isNumber(expression[cursor])) {
        buffer += expression[cursor];
        cursor++;
      }
      tokens.push(token(TokenType.Number, buffer, start, cursor - 1));
      buffer = "";
    } else {
      if (!isAlpha(expression[cursor])) {
        throw Error(
          `Illegal token Unicode ${expression[cursor].charCodeAt(0)}`
        );
      }
      const start = cursor;

      while (cursor < expression.length && isAlpha(expression[cursor])) {
        buffer += expression[cursor];
        cursor++;
      }

      if (RESERVERD_WORDS.includes(buffer)) {
        tokens.push(token(TokenType.Reserved, buffer, start, cursor - 1));
      }
      buffer = "";
    }
  }

  return tokens;
}
