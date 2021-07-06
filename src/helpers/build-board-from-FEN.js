import { ifElse, isNumber, pipe, reduce, split } from 'eslambda'

const isValidSquare = (_, square) => isNumber(square)
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
