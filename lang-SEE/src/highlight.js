import {styleTags, tags as t} from "@lezer/highlight"

export const jsonHighlighting = styleTags({
        String: t.string,
        Number: t.number,
        "True False": t.bool,
        PropertyName: t.propertyName,
        Null: t.null,
        ",": t.separator,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        Keyword: t.keyword,
        Bool: t.bool,
        IfSet: t.logicOperator,
        IfStatement: t.logicOperator
    }
)
