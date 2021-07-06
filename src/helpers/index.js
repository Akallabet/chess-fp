import { hasKey, ifElse, isTruthy, when } from 'eslambda'

export { movePiece, addPieceToBoard, removePieceFromBoard, cleanBoard } from './board'
export { buildBoardFromFEN } from './build-board-from-FEN'
export { buildFENPiecePlacementFromBoard } from './buils-FEN-piece-placement-from-board'
export {
  generateLegalMoves,
  getOrigins,
  filterByFile,
  filterByName,
  filterByRank,
  findByCastling,
  findByEnPassant,
} from './moves'

export const extractOrigin = (origins) => origins[0]
export const isDisambiguous = (origins) => origins.length === 1
export const isCastlingMove = ({ isCastling }) => isCastling
export const isKingsideCastlingMove = ({ isKingside }) => isTruthy(isKingside)
export const isQueensideCastlingMove = ({ isQueenside }) => isTruthy(isQueenside)
export const isCapture = ({ capture }) => isTruthy(capture)
export const isCheck =
  ({ check }) =>
  () =>
    isTruthy(check)
export const isCheckMate =
  ({ checkMate }) =>
  () =>
    isTruthy(checkMate)

export const isNotGameOver = ({ state: { isGameOver } }) => !isGameOver
export const isValid = when(hasKey('state'), hasKey('constants'), isNotGameOver)
export const returnValue = (fn, onGameOver) => (input) =>
  ifElse(isValid, ({ constants, state }) => fn(constants)(state)(input), onGameOver)
