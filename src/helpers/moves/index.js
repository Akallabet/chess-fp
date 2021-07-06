import { identity, ifElse, isNumber, isTruthy, pipe } from 'eslambda'
const byName = (name) => (origin) => name ? origin.name === name : true
const byFile =
  (x) =>
  ({ origin }) =>
    origin.x === x
const byRank =
  (y) =>
  ({ origin }) =>
    origin.y === y
const byCastling =
  ({ name, x, y }) =>
  ({ origin, castling, name: originName }) =>
    castling && name === originName && y === origin.y && x === origin.x
const byEnPassant =
  ({ name, x, y }) =>
  ({ origin, enPassant, name: originName }) =>
    enPassant && name === originName && y === origin.y && x === origin.x
const byPromotion = (promotion) => (origin) => origin.promotion && promotion === origin.promotion

export const filterByName = (name) => (origins) => origins.filter(byName(name))
export const filterByFile = (x) => (origins) => origins.filter(byFile(x))
export const filterByRank = (y) => (origins) => origins.filter(byRank(y))
export const findByCastling = (piece) => (origins) => origins.find(byCastling(piece))
export const findByEnPassant = (piece) => (origins) => origins.find(byEnPassant(piece))
export const filterByPromotion = (promotion) => (origins) => origins.filter(byPromotion(promotion))
export { generateLegalMoves } from './generate-legal-moves'

export const getOrigins =
  (legalMoves) =>
  ({ name, originY, originX, y, x, promotion }) =>
    pipe(
      filterByName(name),
      ifElse(() => isNumber(originX), filterByFile(originX), identity),
      ifElse(() => isNumber(originY), filterByRank(originY), identity),
      ifElse(() => isTruthy(promotion), filterByPromotion(promotion), identity)
    )(legalMoves[y][x])
