import { ifElse, isNumber, pipe, reduce, split } from 'eslambda'

export const cleanBoard = (board) => board.map((row) => row.map(() => ({})))
export const cloneBoard = (board) => board.map((row) => row.map((square) => ({ ...square })))

export const addPieceToBoard =
  ({ name, color, y, x }) =>
  (board) =>
    [
      ...board.slice(0, y),
      [...board[y].slice(0, x), { name, color }, ...board[y].slice(x + 1)],
      ...board.slice(y + 1),
    ]

export const removePieceFromBoard =
  ({ y, x }) =>
  (board) =>
    [
      ...board.slice(0, y),
      [...board[y].slice(0, x), {}, ...board[y].slice(x + 1)],
      ...board.slice(y + 1),
    ]

export const movePiece = (piece = { name: '', color: '', y: 0, x: 0 }, origin, destination) =>
  pipe(removePieceFromBoard(origin), addPieceToBoard({ ...piece, ...destination }))

const isValidSquare = (_, square) => isNumber(parseInt(square))
const addEmptyCells = (row, square) => [...row, ...[...Array(Number(square))].map(() => ({}))]

const addCellBoardInfo =
  ({ pieces, COLORS }) =>
  (row, square) =>
    [
      ...row,
      {
        color: pieces[square] ? COLORS.w : COLORS.b,
        name: pieces[square.toUpperCase()],
      },
    ]
const buildCell = (context) => ifElse(isValidSquare, addEmptyCells, addCellBoardInfo(context))

const buildRow = (context) => pipe(split(''), reduce(buildCell(context), []))

const splitPiecePlacement = ({ FEN: { piecePlacement } }) => split('/')(piecePlacement)

export const buildBoardFromFEN = ({ constants, ...state }) =>
  splitPiecePlacement(state).map(buildRow(constants))
