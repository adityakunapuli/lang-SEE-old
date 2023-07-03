// noinspection RegExpRedundantEscape,JSUnusedLocalSymbols

import {parser} from "./syntax.grammar";
import {continuedIndent, foldInside, foldNodeProp, indentNodeProp, LanguageSupport, LRLanguage, syntaxTree, TreeIndentContext} from "@codemirror/language";
import {styleTags, tags as t} from "@lezer/highlight";
import {completeFromList} from "@codemirror/autocomplete";
import {SyntaxNode} from "@lezer/common"

import {elementName, htmlCompletionSourceWith, TagSpec} from "./complete"
import {EditorView} from "@codemirror/view";
import {EditorSelection} from "@codemirror/state";

export {htmlCompletionSource, TagSpec, htmlCompletionSourceWith} from "./complete"

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
    },
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
    // DUMMY/TESTS
    {"label": "FOO", "type": "keyword"},
    {"label": "<html>", "type": "keyword"},
    {"label": "myuser", "type": "constant", "info": "Test completion"},
    {"label": "password", "type": "variable"}
]


export const SEECompletion = SEELanguage.data.of({
    autocomplete: completeFromList(completions)
})

export function SEE(
    config: {
        // =================================================
        // these are all config values that can be passed
        // into the instance using in the html file--e.g.,
        // =================================================
        // matchClosingTags?: boolean,
        // selfClosingTags?: boolean,
        // extraTags?: Record<string, TagSpec>,
    } = {}
) {
    return new LanguageSupport(SEELanguage, [SEECompletion, autoCloseTags,]
    )
}

const selfClosers = new Set(
    "area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "))

export const autoCloseTags = EditorView.inputHandler.of((view, from, to, text) => {
    // if (view.composing || view.state.readOnly || from != to || (text != ">" && text != "/") ||
    //     !htmlLanguage.isActiveAt(view.state, from, -1)) return false
    let {state} = view
    let changes = state.changeByRange(range => {
        let {head} = range, around = syntaxTree(state).resolveInner(head, -1), name
        if (around.name == "TagName" || around.name == "StartTag") around = around.parent!
        if (text == ">" && around.name == "OpenTag") {
            if (around.parent?.lastChild?.name != "CloseTag" &&
                (name = elementName(state.doc, around.parent, head)) &&
                !selfClosers.has(name)) {
                let hasRightBracket = view.state.doc.sliceString(head, head + 1) === ">";
                let insert = `${hasRightBracket ? "" : ">"}</${name}>`
                return {range: EditorSelection.cursor(head + 1), changes: {from: head + (hasRightBracket ? 1 : 0), insert}}
            }
        } else if (text == "/" && around.name == "OpenTag") {
            let empty = around.parent, base = empty?.parent
            if (empty!.from == head - 1 && base!.lastChild?.name != "CloseTag" &&
                (name = elementName(state.doc, base, head)) &&
                !selfClosers.has(name)) {
                let hasRightBracket = view.state.doc.sliceString(head, head + 1) === ">"
                let insert = `/${name}${hasRightBracket ? "" : ">"}`
                let pos = head + insert.length + (hasRightBracket ? 1 : 0)
                return {range: EditorSelection.cursor(pos), changes: {from: head, insert}}
            }
        }
        return {range}
    })
    if (changes.changes.empty) return false
    view.dispatch(changes, {userEvent: "input.type", scrollIntoView: true})
    return true
})
