import type { Config } from "jest";

const config: Config = {
  // [...]
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        // ts-jest configuration goes here
      },
    ],
  },
};

export default config;
