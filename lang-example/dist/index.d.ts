import { LanguageSupport, LRLanguage } from "@codemirror/language";
declare let parserWithMetadata: import("@lezer/lr").LRParser;
declare const SEELanguage: LRLanguage;
declare const completions: ({
    label: string;
    type: string;
    info?: undefined;
} | {
    label: string;
    type: string;
    info: string;
})[];
declare const SEECompletion: import("@codemirror/state").Extension;
declare function SEE(): LanguageSupport;
export { parserWithMetadata, SEELanguage, completions, SEECompletion, SEE };
