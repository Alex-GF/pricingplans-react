import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import commonjs from "@rollup/plugin-commonjs";
import watchAssets from "rollup-plugin-watch-assets";
import replace from "@rollup/plugin-replace";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

//Postcss Plugins
import cssnano from "cssnano";

export default [
  {
    input: "src/lib/components/editor/editor.tsx",
    output: [
      {
        file: "public/bundle.js",
        format: "esm",
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
          {
            src: "src/lib/components/editor/index.html",
            dest: "public",
          },
          {
            src: "src/lib/components/editor/assets/**/*",
            dest: "public/assets",
          },
        ],
      }),
      watchAssets({ assets: ["src"] }),
      serve({
        open: true,
        contentBase: "public",
        historyApiFallback: true,
        host: "localhost",
        port: 3000,
      }),
      livereload("public"),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": '"development"',
      }),
    ],
  },
];
