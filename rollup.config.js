import typescript from "rollup-plugin-ts"
import {lezer} from "@lezer/generator/rollup"

export default {
  input: "lang-SEE/src/index.ts",
  external: id => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
  output: [
    {file: "demo/dist/index.cjs", format: "cjs"},
    {dir: "./demo/dist", format: "es"}
  ],
  plugins: [lezer(), typescript()]
}
