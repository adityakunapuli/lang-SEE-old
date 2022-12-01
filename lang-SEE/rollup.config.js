import typescript from "rollup-plugin-ts"
import {lezer} from "@lezer/generator/rollup"

export default {
    input: "src/index.ts",
    external: id => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
    output: [
        // the following two lines export the files into the demo/dist dir
        {file: "../demo/dist/index.cjs", format: "cjs"},
        {dir: "../demo/dist", format: "es"},
        // these lines defaults to the current dist dir
        {file: "dist/index.cjs", format: "cjs"},
        {dir: "./dist", format: "es"}
    ],
    plugins: [lezer(), typescript()]
}
