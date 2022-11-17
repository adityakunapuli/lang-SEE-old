'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lr = require('@lezer/lr');
var language = require('@codemirror/language');
var highlight = require('@lezer/highlight');
var autocomplete = require('@codemirror/autocomplete');

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = lr.LRParser.deserialize({
  version: 14,
  states: "!WQYQPOOOhQPO'#CdOOQO'#Ci'#CiOOQO'#Ce'#CeQYQPOOOOQO,59O,59OOyQPO,59OOOQO-E6c-E6cOOQO1G.j1G.j",
  stateData: "![~O[OSPOS~ORQOSQOTQOVPO~ORQOSQOTQOUTOVPO~ORQOSQOTQOUWOVPO~O",
  goto: "u^PPPPPPPP_ePPPoXQOPSUQSOQUPTVSUXROPSU",
  nodeNames: "⚠ LineComment Program Identifier String Boolean ) ( Application",
  maxTerm: 13,
  nodeProps: [
    ["openedBy", 6,"("],
    ["closedBy", 7,")"]
  ],
  skippedNodes: [0,1],
  repeatNodeCount: 1,
  tokenData: "%c~R^XY}YZ}]^}pq}rs!`st#|xy$[yz$a}!O$f!Q![$f!]!^$z!c!}$f#R#S$f#T#o$f~!SS[~XY}YZ}]^}pq}~!cVOr!`rs!xs#O!`#O#P!}#P;'S!`;'S;=`#v<%lO!`~!}OS~~#QRO;'S!`;'S;=`#Z;=`O!`~#^WOr!`rs!xs#O!`#O#P!}#P;'S!`;'S;=`#v;=`<%l!`<%lO!`~#yP;=`<%l!`~$PQ#Y#Z$V#h#i$V~$[OT~~$aOV~~$fOU~~$kTR~}!O$f!Q![$f!c!}$f#R#S$f#T#o$f~%PSP~OY$zZ;'S$z;'S;=`%]<%lO$z~%`P;=`<%l$z",
  tokenizers: [0],
  topRules: {"Program":[0,2]},
  tokenPrec: 0
});

let parserWithMetadata = parser.configure({
    props: [
        language.indentNodeProp.add({
            Application: language.delimitedIndent({ closing: ")", align: false })
        }),
        language.foldNodeProp.add({
            Application: language.foldInside
        }),
        highlight.styleTags({
            Identifier: highlight.tags.variableName,
            Boolean: highlight.tags.bool,
            String: highlight.tags.string,
            LineComment: highlight.tags.lineComment,
            "( )": highlight.tags.paren
        }),
        language.indentNodeProp.add({
            Application: context => context.column(context.node.from) + context.unit
        })
    ]
});
const SEELanguage = language.LRLanguage.define({
    parser: parserWithMetadata,
    languageData: {
        commentTokens: { line: ";" }
    }
});
const completions = [
    { "label": "CREATE", "type": "keyword" },
    { "label": "FORM", "type": "keyword" },
    { "label": "ENDFORM", "type": "keyword" },
    { "label": "VALIDATION", "type": "keyword" },
    { "label": "GIVEN", "type": "keyword" },
    { "label": "ENDGIVEN", "type": "keyword" },
    { "label": "IF", "type": "keyword" },
    { "label": "AND", "type": "keyword" },
    { "label": "OR", "type": "keyword" },
    { "label": "SET", "type": "keyword" },
    { "label": "DISPLAY MSG", "type": "keyword" },
    { "label": "END", "type": "keyword" },
    { "label": "ENDVALIDATION", "type": "keyword" },
    { "label": "ENDCREATE", "type": "keyword" },
    { "label": "park", "type": "constant", "info": "Test completion" },
    { "label": "password", "type": "variable" }
];
const SEECompletion = SEELanguage.data.of({
    autocomplete: autocomplete.completeFromList(completions)
});
function SEE() {
    return new language.LanguageSupport(SEELanguage, [SEECompletion]);
}

exports.SEE = SEE;
exports.SEECompletion = SEECompletion;
exports.SEELanguage = SEELanguage;
exports.completions = completions;
exports.parserWithMetadata = parserWithMetadata;
