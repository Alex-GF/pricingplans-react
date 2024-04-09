import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import commonjs from "@rollup/plugin-commonjs";
import watchAssets from "rollup-plugin-watch-assets";
import replace from "@rollup/plugin-replace";

//Postcss Plugins
import cssnano from "cssnano";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      typescript({ compilerOptions: { sourceMap: true } }),
      postcss({ plugins: [cssnano()] }),
      copy({
        targets: [
          { src: "src/lib/components/editor/assets/**/*", dest: "dist/assets" },
        ],
      }),
      watchAssets({ assets: ["src"] }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": '"development"',
      }),
    ],
    external: [
      "axios",
      "buffer",
      "long",
      "protobufjs/minimal",
      "react",
      "react-dom",
      "react-router-dom",
    ],
  },
];
