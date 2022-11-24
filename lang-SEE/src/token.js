// import {ContextTracker} from "@lezer/lr"
// import {indent} from "./parser.terms.js"

//
// function IndentLevel(parent, depth) {
//     this.parent = parent
//     // -1 means this is not an actual indent level but a set of brackets
//     this.depth = depth
//     this.hash = (parent ? parent.hash + parent.hash << 8 : 0) + depth + (depth << 4)
// }
//
//
// const topIndent = new IndentLevel(null, 0)
//
// function countIndent(space) {
//     let depth = 0
//     for (let i = 0; i < space.length; i++)
//         depth += space.charCodeAt(i) === tab ? 8 - (depth % 8) : 1
//     return depth
// }
//
// export const trackIndent = new ContextTracker({
//     start: topIndent,
//     reduce(context, term) {
//         return context.depth < 0 && bracketed.has(term) ? context.parent : context
//     },
//     shift(context, term, stack, input) {
//         if (term == indent) return new IndentLevel(context, countIndent(input.read(input.pos, stack.pos)))
//         if (term == dedent) return context.parent
//         if (term == ParenL || term == BracketL || term == BraceL) return new IndentLevel(context, -1)
//         return context
//     },
//     hash(context) {
//         return context.hash
//     }
// })
