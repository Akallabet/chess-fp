import { fromSAN } from './san'

const buildEnPassantValue = (context) => (enPassant) =>
  enPassant === '-' ? false : fromSAN(context)(enPassant)

const splitFENString = ({ FENString }) => {
  const [piecePlacement, activeColor, castling, enPassant, halfmoveClock, fullmoveNumber] =
    FENString.split(' ')
  return { piecePlacement, activeColor, castling, enPassant, halfmoveClock, fullmoveNumber }
}

export const buildFENObject = ({ FENString, constants }) => {
  const { castling, enPassant, fullmoveNumber, halfmoveClock, ...FEN } = splitFENString({
    FENString,
  })
  return {
    ...FEN,
    castling: castling.split('').reduce(
      (availability, symbol) => {
        if (symbol === 'K') return { ...availability, w: { ...availability.w, isKingside: true } }
        if (symbol === 'Q') return { ...availability, w: { ...availability.w, isQueenside: true } }
        if (symbol === 'k') return { ...availability, b: { ...availability.b, isKingside: true } }
        if (symbol === 'q') return { ...availability, b: { ...availability.b, isQueenside: true } }
        return availability
      },
      { w: { isKingside: false, isQueenside: false }, b: { isKingside: false, isQueenside: false } }
    ),
    enPassant: buildEnPassantValue(constants)(enPassant),
    halfmoveClock: Number(halfmoveClock),
    fullmoveNumber: Number(fullmoveNumber),
  }
}

const buildCastlingString = ({ w, b }) => {
  let castling = ''
  if (w.isKingside) castling += 'K'
  if (w.isQueenside) castling += 'Q'
  if (b.isKingside) castling += 'k'
  if (b.isQueenside) castling += 'q'
  return castling || '-'
}

export const buildFENString = ({
  FEN: { piecePlacement, activeColor, castling, enPassant, halfmoveClock, fullmoveNumber },
  files,
  ranks,
}) =>
  `${piecePlacement} ${activeColor} ${buildCastlingString(castling)} ${
    enPassant ? `${files[enPassant.x]}${ranks[enPassant.y]}` : '-'
  } ${halfmoveClock} ${fullmoveNumber}`

export const removeCastlingColor = ({ castling, activeColor }) => ({
  ...castling,
  [activeColor]: { isKingside: false, isQueenside: false },
})

export const removeKingsideCastlingColor = ({ castling, activeColor }) => ({
  ...castling,
  [activeColor]: { ...castling[activeColor], isKingside: false },
})

export const removeQueensideCastlingColor = ({ castling, activeColor }) => ({
  ...castling,
  [activeColor]: { ...castling[activeColor], isQueenside: false },
})
