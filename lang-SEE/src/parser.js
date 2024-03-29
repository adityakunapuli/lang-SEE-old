// This file was generated by lezer-generator. You probably shouldn't edit it.
import {LRParser} from "@lezer/lr"
import {jsonHighlighting} from "./highlight"
const spec_string = {__proto__:null,IF:40}
export const parser = LRParser.deserialize({
  version: 14,
  states: "$zOYQPOOOOQO'#Cc'#CcO!QQPO'#CfO!YQPO'#CkOOQO'#Cn'#CnOOQO'#Cw'#CwOOQO'#Cq'#CqQYQPOOOOQO'#Co'#CoOOQO'#Ch'#ChO!aQPO'#CgO!fQPO'#CyOOQO,59Q,59QO!nQPO,59QO!sQPO'#C|OOQO,59V,59VO!{QPO,59VOOQO-E6o-E6oOYQPO,59RO!TQPO'#CrO#QQPO,59eOOQO1G.l1G.lOYQPO'#CsO#YQPO,59hOOQO1G.q1G.qOOQO1G.m1G.mOOQO,59^,59^OOQO-E6p-E6pOOQO,59_,59_OOQO-E6q-E6q",
  stateData: "#b~OjOSPOS~ORTOSTOTTOUTOXQO^RO`TOaTOdWOlPOqSOrSO~OW[OlXO~O]_O~PYOnbO~OocOWmX~OWeO~OofO]pX~O]hO~OocOWma~OofO]pa~O",
  goto: "!zqPPPPPPPrPPry!PPPrPPrrP!T!Z!aPPP!gP!tPP!wZTORVbfQZQRjcTYQcQVORaVQdZRkdQg^RmgSUOVQ^RQibRlfR]QR`R",
  nodeNames: "⚠ Comment Form True False Null Number String } { Object Property PropertyName ] [ Array Keyword Bool IfSet IfStatement IF",
  maxTerm: 34,
  nodeProps: [
    ["group", -11,3,4,5,6,7,10,15,16,17,18,19,"Statement"],
    ["openedBy", 8,"{",13,"["],
    ["closedBy", 9,"}",14,"]"]
  ],
  propSources: [jsonHighlighting],
  skippedNodes: [0,1],
  repeatNodeCount: 3,
  tokenData: "4P~RoXY#SYZ#S]^#Spq#Srs#Xst%q|}&]}!O&b!Q!R'V!R![(e![!](v!^!_({!c!d)p!e!f*R!f!g*q!g!h+g!h!i0]!i!j-c!k!l0l!q!r0w!u!v0}!x!y-{!}#O1Z#P#Q1`#X#Y1e#Y#Z2W#]#^0P#b#c2u#h#i3^#o#p3u#q#r3z~#XOj~~#[Wpq#Xqr#Xrs#ts#O#X#O#P#y#P;'S#X;'S;=`%k<%lO#X~#yOl~~#|Xrs#X!P!Q#X#O#P#X#U#V#X#Y#Z#X#b#c#X#f#g#X#h#i#X#i#j$i~$lR!Q![$u!c!i$u#T#Z$u~$xR!Q![%R!c!i%R#T#Z%R~%UR!Q![%_!c!i%_#T#Z%_~%bR!Q![#X!c!i#X#T#Z#X~%nP;=`<%l#X~%vTP~OY%qZ]%q^;'S%q;'S;=`&V<%lO%q~&YP;=`<%l%q~&bOo~~&eRpq&n!Q!R'V!R![(e~&qP!u!v&t~&wP#X#Y&z~&}P#h#i'Q~'VOr~~'[RU~!O!P'e!g!h'y#X#Y'y~'hP!Q!['k~'pRU~!Q!['k!g!h'y#X#Y'y~'|R{|(V}!O(V!Q![(]~(YP!Q![(]~(bPU~!Q![(]~(jSU~!O!P'e!Q![(e!g!h'y#X#Y'y~({On~~)OP#[#])R~)UP#h#i)X~)[P#a#b)_~)bP#`#a)e~)hP!`!a)k~)pO`~~)sP!p!q)v~)yP!f!g)|~*ROa~~*UP!t!u*X~*[P!g!h*_~*bP!c!d*e~*hP!v!w*k~*nP!g!h)k~*tP!k!l*w~*zP!u!v*}~+QP!r!s+T~+WP!n!o+Z~+^P!c!d+a~+dP!{!|)k~+jS!n!o+v!p!q,h#`#a.}#b#c0V~+yP!u!v+|~,PP!g!h,S~,XP`~pq,[~,_P!k!l,b~,eP!h!i)k~,kP!f!g,n~,sS`~!e!f*R!h!i-P!i!j-c!x!y-{~-SP!q!r-V~-YP!t!u-]~-`P!o!p)k~-fP!k!l-i~-lP!x!y-o~-rP!g!h-u~-xP!p!q)k~.OP!c!d.R~.UP!n!o.X~.[P!k!l._~.bP!f!g.e~.hP!c!d.k~.nP!v!w.q~.tP!k!l.w~.zP!q!r-u~/QP#g#h/T~/WP#X#Y/Z~/^PYZ/a~/dPpq/g~/jPpq/m~/pPpq/s~/vPpq/y~/|P!k!l0P~0SP#Y#Z)k~0YP#W#X)k~0`P!q!r0c~0fQ!q!r)k!t!u-]~0oP!h!i0r~0wOq~~0zP!t!u)|~1QP!g!h1T~1WP!v!w)k~1`O^~~1eO]~~1hQ#`#a1n#b#c0V~1qP#g#h1t~1wP#X#Y1z~1}Ppq2Q~2TP#]#^0P~2ZP#T#U2^~2aP#`#a2d~2gP#g#h2j~2mP#X#Y2p~2uOS~~2xP#i#j2{~3OP#`#a3R~3UP#`#a3X~3^OT~~3aP#f#g3d~3gP#i#j3j~3mP#X#Y3p~3uOR~~3zOX~~4POW~",
  tokenizers: [0],
  topRules: {"Form":[0,2]},
  specialized: [{term: 28, get: value => spec_string[value] || -1}],
  tokenPrec: 0
})
