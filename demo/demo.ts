import {EditorView, basicSetup} from "codemirror"
// import {javascript} from "../lang-javascript"
import {SEE} from "../lang-example"

;(window as any).view = new EditorView({
  doc: 'console.log("Hello world")',
  extensions: [
    basicSetup,
    SEE(),
  ],
  parent: document.querySelector("#editor")!
})
