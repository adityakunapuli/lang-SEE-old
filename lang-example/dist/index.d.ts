import { LanguageSupport, LRLanguage } from "@codemirror/language";
declare let parserWithMetadata: import("@lezer/lr").LRParser;
declare const SEELanguage: LRLanguage;
declare const SEECompletion: import("@codemirror/state").Extension;
declare function SEE(): LanguageSupport;
export { parserWithMetadata, SEELanguage, SEECompletion, SEE };
