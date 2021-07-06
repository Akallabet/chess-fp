import { pipe } from 'eslambda'

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
