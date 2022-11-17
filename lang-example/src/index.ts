import {parser} from "./syntax.grammar";
import {delimitedIndent, foldInside, foldNodeProp, indentNodeProp, LanguageSupport, LRLanguage} from "@codemirror/language";
import {styleTags, tags as t} from "@lezer/highlight";
import {completeFromList} from "@codemirror/autocomplete";

export let parserWithMetadata = parser.configure({
    props: [
        indentNodeProp.add({
            Application: delimitedIndent({closing: ")", align: false})
        }),
        foldNodeProp.add({
            Application: foldInside
        }),
        styleTags({
            Identifier: t.variableName,
            Boolean: t.bool,
            String: t.string,
            LineComment: t.lineComment,
            "( )": t.paren
        }),
        indentNodeProp.add({
            Application: context => context.column(context.node.from) + context.unit
        })
    ]
})


export const SEELanguage = LRLanguage.define({
    parser: parserWithMetadata,
    languageData: {
        commentTokens: {line: ";"}
    }
})


export const completions = [
    {"label": "CREATE", "type": "keyword"},
    {"label": "FORM", "type": "keyword"},
    {"label": "ENDFORM", "type": "keyword"},
    {"label": "VALIDATION", "type": "keyword"},
    {"label": "GIVEN", "type": "keyword"},
    {"label": "ENDGIVEN", "type": "keyword"},
    {"label": "IF", "type": "keyword"},
    {"label": "AND", "type": "keyword"},
    {"label": "OR", "type": "keyword"},
    {"label": "SET", "type": "keyword"},
    {"label": "DISPLAY MSG", "type": "keyword"},
    {"label": "END", "type": "keyword"},
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

