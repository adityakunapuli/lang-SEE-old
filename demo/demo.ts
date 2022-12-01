import {basicSetup, EditorView} from "codemirror"
import {completions, SEE} from "./dist/index"
import {HighlightStyle, syntaxHighlighting} from '@codemirror/language'
import {oneDarkTheme} from '@codemirror/theme-one-dark'
import {tags} from "@lezer/highlight"
import {keymap} from "@codemirror/view"
import {indentWithTab} from "@codemirror/commands"


import {autocompletion} from "@codemirror/autocomplete"

const myHighlightStyle = HighlightStyle.define([
    {tag: tags.string, color: "#ffffff"},
    {tag: tags.number, color: "#00ff0c"},
    {tag: tags.keyword, color: "#ffaa00", fontStyle: "italic"},
    {tag: tags.bool, color: "#0095ff"},
    {tag: tags.logicOperator, color: "#ff5400"},
    {tag: tags.comment, color: "#939598", fontStyle: "italic"}


])

function myCompletions(context: { matchBefore: (arg0: RegExp) => any; explicit: any; pos: any }) {
    let before = context.matchBefore(/\w+/)
    // If completion wasn't explicitly started and there
    // is no word before the cursor, don't open completions.
    if (!context.explicit && !before) return null
    return {
        from: before ? before.from : context.pos,
        options: completions,
        validFor: /^\w*$/
    }
}


;(window as any).view = new EditorView({
    doc:
        `CREATE using FORM  <type>
ENDFORM
VALIDATION <field>
GIVEN field1, file2, file3 ENDGIVEN

# Creates part-picker form
IF (A > 1 AND A < 10) OR (B=20 OR B=45)
  - Set PartNumber = 100
  - Set PartRevision = B
ELSE IF X > 4
  - Create Document
  - Create Part
ELSE IF X = "-"
  - Set Doc = 10
  - Set Dx  = 12
ELSE
  - Revise Document
  - DISPLAY "Document Revised"
END

ENDVALIDATION
ENDCREATE
    `,
    extensions: [
        SEE(),
        // indentOnInput(),
        // keymap.of([...defaultKeymap,]),
        syntaxHighlighting(myHighlightStyle),
        basicSetup,
        oneDarkTheme,
        autocompletion({override: [myCompletions]}),
        keymap.of([indentWithTab]),

    ],
    parent: document.querySelector("#editor")!
})
