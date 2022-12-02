import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import mdx from "@mdx-js/rollup";
import raw from 'rehype-raw';

export default {
  input: "src/index.ts",
  output: {
    sourcemap: true,
    dir: "dist",
  },
  plugins: [
    mdx({
      jsxImportSource: "solid-jsx",
      rehypePlugins: [raw],
      remarkRehypeOptions: {
        allowDangerousHtml: true
      },
    }),
    typescript(),
    json(),
    dynamicImportVars.default(),
  ],
  external: ["solid-jsx/jsx-runtime"]
};
