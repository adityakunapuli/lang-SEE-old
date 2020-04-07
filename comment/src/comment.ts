import {Text, Line} from "@codemirror/next/text"
import {EditorView, Command} from "@codemirror/next/view"
import { EditorState, Transaction, SelectionRange } from "@codemirror/next/state"

export const toggleCommentCmd: Command = view => {
  // console.log("view.state", state)
  // // console.log("view.state.facet(addLanguageData)", state.facet(addLanguageData))
  // console.log("view.state.tree", state.tree)
  // let node = state.tree.resolveAt(pos)
  // console.log("resolveAt(pos)", node.name)
  // let syntax = state.facet(EditorState.syntax)
  // console.log(syntax)
  return dispatchToggleComment(CommentOption.Toggle, view)
}

export const commentCmd: Command = view => {
    return dispatchToggleComment(CommentOption.OnlyComment, view)
}

export const uncommentCmd: Command = view => {
    return dispatchToggleComment(CommentOption.OnlyUncomment, view)
}

/// The action to be taken when toggling comments.
export enum CommentOption {
  Toggle,
  OnlyComment,
  OnlyUncomment,
}

const dispatchToggleComment = (option: CommentOption, view: EditorView): boolean => {
  let tr = toggleLineComment(option, "//")(view.state)
  if (!tr) return false
  view.dispatch(tr)
  return true
}

export const toggleBlockComment = (option: CommentOption, blockCommentTokens: {open: string, close: string}) => (state: EditorState): Transaction | null => {
  return null
}

/// TODO: Add docs
export const toggleLineComment = (option: CommentOption, lineCommentToken: string) => (state: EditorState): Transaction | null => {
  const k = (range: SelectionRange): string => range.anchor + "," + range.head
  const linesAcrossSelection: Line[] = []
  const linesAcrossRange : { [id: string] : Line[]; } = {};
  for (const range of state.selection.ranges) {
    const lines = getLinesInRange(state.doc, range)
    linesAcrossSelection.push(...lines)
    linesAcrossRange[k(range)] = lines
  }
  const column = isRangeLineCommented(lineCommentToken)(state, linesAcrossSelection)
  if (column.isRangeLineSkipped) {
    if (option != CommentOption.OnlyComment) {
      const tr = state.t()
      const mapRef = tr.mapRef()
      for (const range of state.selection.ranges) {
        const lines = linesAcrossRange[k(range)]
        for (const line of lines) {
          if (lines.length > 1 && column.isLineSkipped[line.number]) continue
          const pos = mapRef.mapPos(line.start + column.minCol)
          const margin = (line.content as string).startsWith(" ", column.minCol + lineCommentToken.length) ? 1 : 0
          removeLineComment(tr, pos, lineCommentToken, margin)
        }
      }
      return tr
    }
  } else {
    if (option != CommentOption.OnlyUncomment) {
      const tr = state.t()
      const mapRef = tr.mapRef()
      for (const range of state.selection.ranges) {
        const lines = linesAcrossRange[k(range)]
        for (const line of lines) {
          if (lines.length > 1 && column.isLineSkipped[line.number]) continue
          const pos = mapRef.mapPos(line.start + column.minCol)
          insertLineComment(tr, pos, lineCommentToken)
        }
      }
      return tr
    }
  }

  return null
}

/// TODO: Add docs
const isRangeLineCommented = (lineCommentToken: string) => (state: EditorState, lines: Line[]): {minCol:number} & {isRangeLineSkipped:boolean} & {isLineSkipped: { [id: number]: boolean } } => {
  let minCol = Infinity
  let isRangeLineDiscarded = true
  const isLineSkipped: { [id: number]: boolean } = []
  for (const line of lines) {
    const str = (line.content as string)
    const col = eatSpace(str)
    if ((lines.length == 1 || col < str.length) && col < minCol) {
      minCol = col
    }
    if (isRangeLineDiscarded && (lines.length == 1 || col < str.length) && !str.startsWith(lineCommentToken, col)) {
      isRangeLineDiscarded = false
    }
    isLineSkipped[line.number] = col == str.length
  }
  return {minCol: minCol, isRangeLineSkipped: isRangeLineDiscarded, isLineSkipped: isLineSkipped}
}

/// Inserts a line-comment.
/// The `pos` argument indicates the absolute position to 
/// insert the line comment within the `state`.
/// The line is commented by inserting a `lineCommentToken`.
/// Additionally, a `margin` is inserted between the
/// `lineCommentToken` and the position following `pos`.
/// It returns the `tr` transaction to allow you to chain calls on `tr`/
export const insertLineComment = (tr: Transaction, pos: number, lineCommentToken: string, margin: string = " "): Transaction => {
  return tr.replace(pos, pos, lineCommentToken + margin)
}

/// See `insertLineComment`.
export const removeLineComment = (tr: Transaction, pos: number, lineCommentToken: string, marginLen: number = 1): Transaction => {
  return tr.replace(pos, pos + lineCommentToken.length + marginLen, "")
}

/// This function is exported for testing purposes.
export const getLinesInRange = (doc: Text, range: SelectionRange): Line[] => {
  let line: Line = doc.lineAt(range.from)
  let lines = []
  while (line.start + line.length < range.to ||
        (line.start <= range.to && range.to <= line.end)) {
    lines.push(line)
    if (line.number + 1 <= doc.lines ) {
      line = doc.line(line.number + 1)
    } else {
      break
    }
  }
  return lines
} 

/// Consume whitespace starting from 0 in `str`.
/// Return the number of spaces found in `str` to the first
/// non-whitespace character.
/// Note that in case of all characters are whitespace,
/// it will return the length of `str`.
const eatSpace = (str: string): number => {
  let pos = 0
  while (/[\s\u00a0]/.test(str.charAt(pos))) ++pos
  return pos
}