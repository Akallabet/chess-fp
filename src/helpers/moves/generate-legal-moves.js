import {
  filter,
  map,
  pipe,
  forEach,
  ifElse,
  identity,
  isTruthy,
  isEmpty,
  truthy,
  enrichObject,
  find,
  flatten,
  when,
} from 'eslambda'
import { movePiece } from '../board'
import { generatePieceMoves } from './generate-piece-moves'

const findPosition =
  ({ name, activeColor }) =>
  (board) => {
    let piece
    for (let y = 0; y < board.length; y++) {
      const row = board[y]
      for (let x = 0; x < row.length; x++) {
        const square = row[x]
        if (square.name === name && square.color === activeColor) return { y, x }
      }
    }
    return piece
  }

const initializeLegalMoves = (board) => board.map((row) => row.map(() => []))
const isActiveColorPiece =
  ({ activeColor }) =>
  ({ color, name }) =>
    isTruthy(name) && activeColor === color

const addPosition = (fn) =>
  forEach((row, y) => {
    forEach(({ name, color }, x) => fn({ name, color, position: { y, x } }))(row)
  })

const addLegalMove =
  ({ name, legalMoves, position }) =>
  ({ x, y, ...move }) =>
    legalMoves[y][x].push({
      name,
      origin: position,
      destination: { y, x },
      ...move,
    })

const generateInitialLegalMoves = ({ board, ...context }) => {
  const legalMoves = initializeLegalMoves(board)
  pipe(
    addPosition(({ name, color, position }) =>
      ifElse(
        isActiveColorPiece(context),
        pipe(
          generatePieceMoves({
            ...context,
            board,
            name,
            legalMoves,
            position,
          }),
          forEach(addLegalMove({ name, legalMoves, position }))
        )
      )({ name, color })
    )
  )(board)
  return legalMoves
}

const swapActiveColor =
  ({ constants: { COLORS }, activeColor }) =>
  () =>
    activeColor === COLORS.w ? COLORS.b : COLORS.w
const getLegalMovesFromBoard =
  (context) =>
  ({ board, activeColor }) =>
    generateInitialLegalMoves({ ...context, board, activeColor })
const movePieceFromBoard =
  ({ board }) =>
  ({ origin, destination }) =>
    movePiece({ ...board[origin.y][origin.x] }, origin, destination)(board)
const findKingPosition =
  ({ constants: { NAMES }, ...context }) =>
  ({ board }) =>
    findPosition({ name: NAMES.K, ...context })(board)
const doesKingExist = ({ king }) => isTruthy(king)
const hasKingMoves = ({ king, legalMoves }) => isEmpty(legalMoves[king.y][king.x])

const wontOwnKingBeCaptured = (context) =>
  pipe(
    enrichObject(movePieceFromBoard(context), 'board'),
    enrichObject(findKingPosition(context), 'king'),
    enrichObject(swapActiveColor(context), 'activeColor'),
    enrichObject(getLegalMovesFromBoard(context), 'legalMoves'),
    ifElse(doesKingExist, hasKingMoves, truthy)
  )

const hasKingsideCastlingMove = () => find(({ castling }) => castling && castling.isKingside)
const hasQueensideCastlingMove = () => find(({ castling }) => castling && castling.isQueenside)
const isCastlingPossible =
  (squares) =>
  ({ opponentLegalMoves, FEN: { activeColor }, constants: { COLORS } }) =>
  ({ castling }) => {
    const kingLine = activeColor === COLORS.w ? 7 : 0

    return castling
      ? opponentLegalMoves[kingLine][squares[0]].length === 0 &&
          opponentLegalMoves[kingLine][squares[1]].length === 0
      : true
  }

const isKingsideCastlingPossible = isCastlingPossible([5, 6])
const isQueensideCastlingPossible = isCastlingPossible([2, 3])

const isMoveCheck = ({ check }) => isTruthy(check)

const getBoardFromMove =
  ({ board }) =>
  ({ destination, origin }) =>
    movePiece({ ...board[origin.y][origin.x] }, origin, destination)(board)

const addCheckmate = (context) => ({ ...context, checkMate: true })

const filterLegalMoves = (context) =>
  map(
    map(
      pipe(
        filter(wontOwnKingBeCaptured(context)),
        ifElse(
          hasKingsideCastlingMove(context),
          filter(isKingsideCastlingPossible(context)),
          identity
        ),
        ifElse(
          hasQueensideCastlingMove(context),
          pipe(filter(isQueensideCastlingPossible(context))),
          identity
        )
      )
    )
  )

const getOpponentLegalMovesFromBoard = (context) => (board) =>
  pipe(
    flatten,
    filter(wontOwnKingBeCaptured({ ...context, board, activeColor: swapActiveColor(context)() }))
  )(generateInitialLegalMoves({ ...context, board, activeColor: swapActiveColor(context)() }))

const markCheckmateMoves = (context) =>
  map(
    map(
      map(
        pipe(
          ifElse(
            when(
              isMoveCheck,
              pipe(getBoardFromMove(context), getOpponentLegalMovesFromBoard(context), isEmpty)
            ),
            addCheckmate,
            identity
          )
        )
      )
    )
  )

export const generateLegalMoves = ({ FEN, ...context }) => {
  const expanded = { ...context, FEN, ...FEN }
  return pipe(
    () => generateInitialLegalMoves(expanded),
    filterLegalMoves({
      ...expanded,
      opponentLegalMoves: generateInitialLegalMoves({
        ...expanded,
        activeColor: swapActiveColor(expanded)(),
      }),
    }),
    markCheckmateMoves(expanded)
  )()
}
