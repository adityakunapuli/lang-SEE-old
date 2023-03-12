import { LanguageSupport, LRLanguage } from "@codemirror/language";
import { CompletionContext, CompletionResult } from "@codemirror/autocomplete";
/// Type used to specify tags to complete.
interface TagSpec {
    /// Define tag-specific attributes. Property names are attribute
    /// names, and property values can be null to indicate free-form
    /// attributes, or a list of strings for suggested attribute values.
    attrs?: Record<string, null | readonly string[]>;
    /// When set to false, don't complete global attributes on this tag.
    globalAttrs?: boolean;
    /// Can be used to specify a list of child tags that are valid
    /// inside this tag. The default is to allow any tag.
    children?: readonly string[];
}
/// HTML tag completion. Opens and closes tags and attributes in a
/// context-aware way.
declare function htmlCompletionSource(context: CompletionContext): CompletionResult | null;
/// Create a completion source for HTML extended with additional tags
/// or attributes.
declare function htmlCompletionSourceWith(config: {
    /// Define extra tag names to complete.
    extraTags?: Record<string, TagSpec>;
    /// Add global attributes that are available on all tags.
    extraGlobalAttributes?: Record<string, null | readonly string[]>;
}): (context: CompletionContext) => CompletionResult | null;
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
declare function SEE(config?: {
    matchClosingTags?: boolean;
    selfClosingTags?: boolean;
    autoCloseTags?: boolean;
    extraTags?: Record<string, TagSpec>;
    extraGlobalAttributes?: Record<string, null | readonly string[]>;
}): LanguageSupport;
declare const autoCloseTags: import("@codemirror/state").Extension;
export { htmlCompletionSource, TagSpec, htmlCompletionSourceWith, parserWithMetadata, SEELanguage, completions, SEECompletion, SEE, autoCloseTags };
