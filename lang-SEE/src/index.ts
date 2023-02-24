// noinspection RegExpRedundantEscape,JSUnusedLocalSymbols

import {parser} from "./syntax.grammar";
import {continuedIndent, foldInside, foldNodeProp, indentNodeProp, LanguageSupport, LRLanguage, TreeIndentContext} from "@codemirror/language";
import {styleTags, tags as t} from "@lezer/highlight";
import {completeFromList} from "@codemirror/autocomplete";
import {SyntaxNode} from "@lezer/common"

function indentBody(context: TreeIndentContext, node: SyntaxNode) {
    let base = context.lineIndent(node.from)
    let line = context.lineAt(context.pos, -1), to = line.from + line.text.length
    // Don't consider blank, deindented lines at the end of the
    // block part of the block
    if (!/\S/.test(line.text) &&
        context.node.to < to + 100 &&
        !/\S/.test(context.state.sliceDoc(to, context.node.to)) &&
        context.lineIndent(context.pos, -1) <= base)
        return null
    // A normally deindenting keyword that appears at a higher
    // indentation than the block should probably be handled by the next
    // level
    if (/^\s*(else:|elif |except |finally:)/.test(context.textAfter) && context.lineIndent(context.pos, -1) > base)
        return null
    return base + context.unit
}

export let parserWithMetadata = parser.configure({
    props: [
        indentNodeProp.add({
            IfSet: continuedIndent({except: /^\s*\}/}),
            Array: continuedIndent({except: /^\s*\]/}),
            IfStatement: continuedIndent({except: /^\s*\}/}),
            // IfSet: context => indentBody(context, context.node) ?? context.continue(),
            // IfSet: cx =>  /^\s*\}$/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
            Script: context => {
                if (context.pos + /\s*/.exec(context.textAfter)![0].length >= context.node.to) {
                    let endBody = null
                    for (let cur: SyntaxNode | null = context.node, to = cur.to; ;) {
                        cur = cur.lastChild
                        if (!cur || cur.to != to) break
                        if (cur.type.name == "Body") endBody = cur
                    }
                    if (endBody) {
                        let bodyIndent = indentBody(context, endBody)
                        if (bodyIndent != null) return bodyIndent
                    }
                }
                return context.continue()
            }
        }),

        foldNodeProp.add({
            "IfSet Object Array": foldInside
        }),
        styleTags({
            Identifier: t.variableName,
            Boolean: t.bool,
            String: t.string,
            Comment: t.comment,
            "( )": t.paren
        }),

    ]
})


export const SEELanguage = LRLanguage.define({
    parser: parserWithMetadata,
    languageData: {
        commentTokens: {line: "#"},
        indentOnInput: /^\s*([\}\]\)]|else:|elif |except |finally:|set )$/
    }
})


export const completions = [
    {"label": "CREATE", "type": "function"},
    {"label": "FORM", "type": "keyword"},
    {"label": "ENDFORM", "type": "keyword"},
    {"label": "VALIDATION", "type": "keyword"},
    {"label": "GIVEN", "type": "keyword"},
    {"label": "ENDGIVEN", "type": "keyword"},
    {"label": "IF", "type": "bool"},
    {"label": "AND", "type": "bool"},
    {"label": "OR", "type": "bool"},
    {"label": "SET", "type": "keyword"},
    {"label": "DISPLAY", "type": "keyword"},
    {"label": "END", "type": "book"},
    {"label": "ENDVALIDATION", "type": "keyword"},
    {"label": "ENDCREATE", "type": "keyword"},
    {"label": "park", "type": "constant", "info": "Test completion"},
    {"label": "password", "type": "variable"}
]


export const SEECompletion = SEELanguage.data.of({
    autocomplete: completeFromList(completions)
})

export function SEE() {
    return new LanguageSupport(SEELanguage, [SEECompletion]
    )
}



