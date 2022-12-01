import typescript from "rollup-plugin-ts"
import {lezer} from "@lezer/generator/rollup"
import {nodeResolve} from "@rollup/plugin-node-resolve"

// exports demo.ts -> static/demo.js
export default {
    input: "demo/demo.ts",
    output: [
        {dir: "demo/static", format: "es"},
    ],
    plugins: [lezer(), typescript(), nodeResolve()]
}
