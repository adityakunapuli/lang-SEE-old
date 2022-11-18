import { basicSetup, EditorView } from "codemirror";
import { completions, SEE } from "../lang-example";
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { oneDarkTheme } from '@codemirror/theme-one-dark';
import { tags } from "@lezer/highlight";
import { autocompletion } from "@codemirror/autocomplete";
const myHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: "#fc6" },
    { tag: tags.comment, color: "#f5d", fontStyle: "italic" }
]);
function myCompletions(context) {
    let before = context.matchBefore(/\w+/);
    // If completion wasn't explicitly started and there
    // is no word before the cursor, don't open completions.
    if (!context.explicit && !before)
        return null;
    return {
        from: before ? before.from : context.pos,
        options: completions,
        validFor: /^\w*$/
    };
}
;
window.view = new EditorView({
    doc: '',
    extensions: [
        SEE(),
        // indentOnInput(),
        // keymap.of([...defaultKeymap,]),
        basicSetup,
        oneDarkTheme,
        autocompletion({ override: [myCompletions] }),
        syntaxHighlighting(myHighlightStyle)
    ],
    parent: document.querySelector("#editor")
});
