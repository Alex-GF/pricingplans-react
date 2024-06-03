export enum TokenType {
  Number = "NUMBER",
  Literal = "LITERAL",
  OpenParen = "OPEN_PARENTHESIS",
  ClosedParen = "CLOSED_PARENTHESIS",
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
  return ["<=", ">=", "==", "!="].includes(source);
}

function isSingleOperator(source: string) {
  return ["+", "-", "*", "/", "<", ">", "!"].includes(source);
}

function isNumber(source: string) {
  return source.charCodeAt(0) >= 48 && source.charCodeAt(0) <= 57;
}

function isAlpha(source: string) {
  return (
    (source.charCodeAt(0) >= 65 && source.charCodeAt(0) <= 90) ||
    (source.charCodeAt(0) >= 97 && source.charCodeAt(0) <= 122)
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

export function tokenize(source: string): Tokens {
  const tokens = [];
  let buffer = "";
  let cursor = 0;
  while (cursor < source.length) {
    const character = source[cursor];
    if (isSkippable(character)) {
      cursor++;
      continue;
    } else if (character === "(") {
      tokens.push(token(TokenType.OpenParen, character, cursor, cursor));
      cursor++;
      continue;
    } else if (character === ")") {
      tokens.push(token(TokenType.ClosedParen, character, cursor, cursor));
      cursor++;
      continue;
    } else {
      if (
        source[cursor + 1] &&
        isComposedOperator(source[cursor] + source[cursor + 1])
      ) {
        tokens.push(
          token(
            TokenType.BinaryOperator,
            source[cursor] + source[cursor + 1],
            cursor,
            cursor + 1
          )
        );
        cursor += 2;
      } else if (isSingleOperator(source[cursor])) {
        tokens.push(
          token(TokenType.BinaryOperator, source[cursor], cursor, cursor)
        );
        cursor++;
      } else if (isNumber(source[cursor])) {
        const start = cursor;
        while (cursor < source.length && isNumber(source[cursor])) {
          buffer += source[cursor];
          cursor++;
        }
        tokens.push(token(TokenType.Number, buffer, start, cursor - 1));
        buffer = "";
      } else {
        const start = cursor;
        while (cursor < source.length && isAlpha(source[cursor])) {
          buffer += source[cursor];
          cursor++;
        }

        if (RESERVERD_WORDS.includes(buffer)) {
          tokens.push(token(TokenType.Reserved, buffer, start, cursor - 1));
        } else {
          tokens.push(token(TokenType.Literal, buffer, start, cursor - 1));
        }
        buffer = "";
      }
    }
  }

  return tokens;
}
