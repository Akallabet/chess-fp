import * as helpers from './helpers'
import { updateState } from './helpers/state'
import {
  buildFENString,
  removeCastlingColor,
  removeKingsideCastlingColor,
  removeQueensideCastlingColor,
} from './helpers/fen'
import * as SAN from './helpers/san'
import {
  ifElse,
  identity,
  isDefined,
  pipe,
  pipeCond,
  when,
  isTruthy,
  flatten,
  isEmpty,
  objectFrom,
  enrichObject,
  map,
  reduce,
  max,
  isGreaterOrEqualThan,
  extractValues,
  extractKey,
  deplete,
  extractKeys,
} from 'eslambda'

export const move =
  (constants) =>
  ({ isCheckMate, board, FEN, legalMoves, isInCheck, history, current }) =>
  (input) => {
    const { files, ranks, pieces, COLORS, NAMES } = constants

    const fromSAN = SAN.fromSAN({ pieces, files, ranks })
    const updateFEN = (parts) => (FEN = { ...FEN, ...parts })
    const updatePiecePlacement = (piecePlacement) => updateFEN({ piecePlacement })
    const changeTurn = () =>
      updateFEN({ activeColor: FEN.activeColor === COLORS.w ? COLORS.b : COLORS.w })
    const incrementFullmove = ({ fullmoveNumber }) =>
      updateFEN({ fullmoveNumber: fullmoveNumber + 1 })
    const incrementHalfmove = ({ halfmoveClock }) => updateFEN({ halfmoveClock: halfmoveClock + 1 })
    const resetHalfmove = () => updateFEN({ halfmoveClock: 0 })
    const updateEnPassant = (enPassant) => updateFEN({ enPassant })
    const updateCastling = (castling) => updateFEN({ castling })
    const updateBoard = (newBoard) => (board = newBoard)
    const removeCheck = () => (isInCheck = false)
    const addCheck = () => (isInCheck = true)

    const setCheckMate = () => (isCheckMate = true)

    const isCastlingLegalMove =
      (square) =>
      ({ isKingside }) => {
        const { activeColor } = FEN
        const kingLine = activeColor === COLORS.w ? 7 : 0
        return legalMoves[kingLine][square].find(({ castling = {} }) =>
          isKingside ? castling.isKingside : castling.isQueenside
        )
      }

    const isLegalMove = pipeCond(
      [helpers.isKingsideCastlingMove, isCastlingLegalMove(6), identity],
      [helpers.isQueensideCastlingMove, isCastlingLegalMove(2), identity],
      [isTruthy, ({ y, x }) => legalMoves[y][x].length, identity]
    )

    const isWhiteTurn = ({ activeColor }) => activeColor === COLORS.w
    const removeEnPassant = () => updateEnPassant(false)
    const removeCastling = () => updateCastling('-')
    const getOrigins = helpers.getOrigins(legalMoves)

    const disallowCastling = pipe(
      removeCastlingColor,
      ifElse(isDefined, updateCastling, removeCastling)
    )
    const isKingsideCastlingAvailable = () => FEN.castling[FEN.activeColor].isKingside
    const isQueensideCastlingAvailable = () => FEN.castling[FEN.activeColor].isQueenside
    const isCastlingAvailable = () =>
      isKingsideCastlingAvailable() || isQueensideCastlingAvailable()
    const disallowKingsideCastling = pipe(
      removeKingsideCastlingColor,
      ifElse(isDefined, updateCastling, removeCastling)
    )
    const disallowQueensideCastling = pipe(
      removeQueensideCastlingColor,
      ifElse(isDefined, updateCastling, removeCastling)
    )

    const hasPieceMoved =
      (name) =>
      ({ y, x }) =>
      () =>
        board[y][x].name === name
    const hasKingMoved = hasPieceMoved(NAMES.K)
    const hasRookMoved = hasPieceMoved(NAMES.R)
    const hasPawnMoved = hasPieceMoved(NAMES.P)
    const isKingsideRook =
      ({ x }) =>
      () =>
        x === files.length - 1
    const isQueensideRook =
      ({ x }) =>
      () =>
        x === 0
    const isEnPassant =
      ({ y, x }) =>
      () =>
        FEN.enPassant && FEN.enPassant.y === y && FEN.enPassant.x === x
    const isEnPassantMove =
      ({ y, destination }) =>
      () =>
        Math.abs(destination.y - y) === 2
    const getEnPassantSquare =
      ({ y, x }, colors) =>
      ({ activeColor }) => ({
        x,
        y: activeColor === colors.w ? y + 1 : y - 1,
      })

    const isThreefoldRepetition = pipe(
      map(({ FENString }) => FENString.split(' ')[0]),
      (placements) => [...placements, FEN.piecePlacement],
      reduce((placements, placement) => {
        if (!placements[placement]) placements[placement] = 0
        placements[placement] += 1
        return placements
      }, {}),
      extractValues,
      max,
      isGreaterOrEqualThan(3)
    )

    const setIsDraw = ({ isStaleMate }) =>
      FEN.halfmoveClock === 100 || isStaleMate || isThreefoldRepetition(history)

    const setIsGameOver = ({ isStaleMate, isDraw, isCheckMate }) =>
      isStaleMate || isCheckMate || isDraw

    const generateNextTurnLegalMoves = pipe(
      () => (FEN.activeColor === COLORS.w ? COLORS.b : COLORS.w),
      (activeColor) =>
        helpers.generateLegalMoves({ FEN: { ...FEN, activeColor }, constants, board })
    )
    const increaseCurrentHistory = () => (current += 1)
    const createNewFENString = (FEN) => buildFENString({ FEN, files, ranks })

    const castling = (args) => {
      const executeCastling = ({ king, rook, destination }) =>
        pipe(
          helpers.removePieceFromBoard(king),
          helpers.removePieceFromBoard(rook),
          helpers.addPieceToBoard({
            name: NAMES.K,
            color: FEN.activeColor,
            ...king,
            ...destination.king,
          }),
          helpers.addPieceToBoard({
            name: NAMES.R,
            color: FEN.activeColor,
            ...rook,
            ...destination.rook,
          }),
          updateBoard,
          helpers.buildFENPiecePlacementFromBoard({ pieces, COLORS }),
          updatePiecePlacement,
          disallowCastling,
          removeEnPassant
        )(board)

      const setCastlingSide = ({ isKingside, isQueenside }) => {
        const king = {
          y: FEN.activeColor === COLORS.w ? 7 : 0,
          x: 4,
        }
        const rook = { ...king, x: (isKingside && files.length - 1) || (isQueenside && 0) }
        const destination = {
          king: { ...king, x: (isKingside && files.length - 2) || (isQueenside && 2) },
          rook: { ...rook, x: (isKingside && files.length - 3) || (isQueenside && 3) },
        }
        return {
          king,
          rook,
          destination,
        }
      }

      pipe(setCastlingSide, executeCastling)(args)
    }

    const standardMove = ({ origin, destination, promotion, capture, ...move }) => {
      pipe(
        ifElse(
          isEnPassant(destination),
          helpers.removePieceFromBoard({ y: origin.y, x: destination.x })
        ),
        helpers.movePiece(board[origin.y][origin.x], origin, destination),
        ifElse(
          () => isTruthy(promotion),
          helpers.addPieceToBoard({ name: promotion, color: FEN.activeColor, ...destination }),
          identity
        ),
        updateBoard,
        helpers.buildFENPiecePlacementFromBoard({ pieces, COLORS }),
        updatePiecePlacement,
        removeEnPassant,
        ifElse(when(isCastlingAvailable, hasKingMoved(destination)), disallowCastling, identity),
        ifElse(
          when(isKingsideCastlingAvailable, hasRookMoved(destination), isKingsideRook(origin)),
          disallowKingsideCastling,
          identity
        ),
        ifElse(
          when(isQueensideCastlingAvailable, hasRookMoved(destination), isQueensideRook(origin)),
          disallowQueensideCastling,
          identity
        ),
        ifElse(
          when(hasPawnMoved(destination), isEnPassantMove({ y: origin.y, destination })),
          pipe(getEnPassantSquare(destination, COLORS), updateEnPassant),
          identity
        ),
        ifElse(
          () => hasPawnMoved(destination)() || isTruthy(promotion) || isTruthy(capture),
          resetHalfmove,
          incrementHalfmove
        ),
        ifElse(helpers.isCheck(move), addCheck, removeCheck),
        ifElse(helpers.isCheckMate(move), setCheckMate)
      )(board)
    }

    return pipe(
      fromSAN,
      ifElse(
        isLegalMove,
        pipe(
          pipeCond(
            [when(helpers.isKingsideCastlingMove, isKingsideCastlingAvailable), castling, identity],
            [
              when(helpers.isQueensideCastlingMove, isQueensideCastlingAvailable),
              castling,
              identity,
            ],
            [
              isTruthy,
              pipe(
                getOrigins,
                ifElse(helpers.isDisambiguous, pipe(helpers.extractOrigin, standardMove))
              ),
              identity,
            ]
          ),
          objectFrom(generateNextTurnLegalMoves, 'legalMoves'),
          enrichObject(
            pipe(
              extractKey('legalMoves'),
              flatten,
              when(() => !isInCheck, isEmpty)
            ),
            'isStaleMate'
          ),
          enrichObject(setIsDraw, 'isDraw'),
          enrichObject(() => isTruthy(isInCheck), 'isInCheck'),
          enrichObject(() => isTruthy(isCheckMate), 'isCheckMate'),
          enrichObject(setIsGameOver, 'isGameOver'),
          enrichObject(
            pipe(changeTurn, ifElse(isWhiteTurn, incrementFullmove), createNewFENString),
            'FENString'
          ),
          enrichObject(
            pipe(deplete('legalMoves'), (state) => [
              ...history.slice(0, current + 1),
              { ...state },
            ]),
            'history'
          ),
          enrichObject(increaseCurrentHistory, 'current'),
          extractKeys(['current', 'history', 'legalMoves'])
        ),
        () => ({ current, history })
      )
    )(input)
  }

export default updateState(move)
