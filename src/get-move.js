import {
  isDisambiguous,
  filterByName,
  filterByFile,
  filterByRank,
  findByCastling,
  findByEnPassant,
  returnValue,
} from './helpers'
import { emptyString, identity, pipe, pipeCond } from 'eslambda'

const getMove =
  ({ files, ranks, COLORS, NAMES }) =>
  ({ FEN, legalMoves }) =>
  ({ origin, destination }) => {
    const { file, rank } = destination
    const piece = { ...origin, x: files.indexOf(origin.file), y: ranks.indexOf(origin.rank) }
    const buildOrigin = (origin, check) => `${origin}${file}${rank}${check ? '+' : ''}`
    const buildOriginName = ([{ name, capture, check }]) =>
      buildOrigin(`${name}${capture ? 'x' : ''}`, check)
    const buildOriginNameAndFile = ([{ name, origin, capture, check }]) =>
      buildOrigin(`${name}${files[origin.x]}${capture ? 'x' : ''}`, check)
    const buildOriginNameFileAndRank = ([{ name, origin, capture, check }]) =>
      buildOrigin(`${name}${files[origin.x]}${ranks[origin.y]}${capture ? 'x' : ''}`, check)
    const buildCastlingSAN = ({ castling: { isKingside, isQueenside } }) =>
      (isKingside && '0-0') || (isQueenside && '0-0-0')
    const buildEnPassantSAN = ({ origin, check }) => buildOrigin(`${files[origin.x]}x`, check)
    const buildPromotion = ({ promotion, check }) => `${file}${rank}${check ? '+' : ''}${promotion}`

    return pipeCond(
      [
        () =>
          ranks.indexOf(destination.rank) ===
            (FEN.activeColor === COLORS.w ? 0 : ranks.length - 1) && origin.name === NAMES.P,
        (moves) =>
          moves
            .filter(({ name }) => name === NAMES.P)
            .map((info) => ({ ...info, SAN: buildPromotion(info) })),
        identity,
      ],
      [findByEnPassant(piece), pipe(findByEnPassant(piece), buildEnPassantSAN), identity],
      [findByCastling(piece), pipe(findByCastling(piece), buildCastlingSAN), identity],
      [isDisambiguous, buildOriginName, filterByName(piece.name)],
      [isDisambiguous, buildOriginName, filterByFile(piece.x)],
      [isDisambiguous, buildOriginNameAndFile, filterByRank(piece.y)],
      [isDisambiguous, buildOriginNameFileAndRank]
    )(legalMoves[ranks.indexOf(rank)][files.indexOf(file)])
  }

export default returnValue(getMove, emptyString)
