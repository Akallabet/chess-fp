import { pipe, enrich, enrichObject, extractKeys, ifElse, identity } from 'eslambda'

import { buildBoardFromFEN, generateLegalMoves, isValid } from '.'
import { buildFENObject } from './fen'
import { generatePGN } from './pgn'

const initializeState = ({ state }) => state || {}
const initializeHistory = ({ state: { history }, ...context }) =>
  history || createNewHistory(context)
const initializeCurrent = ({ state: { current = 0 } }) => current
const expandCurrentHistory = ({ history, current = 0 }) => ({ ...history[current] })

const buildLegalMoves = (context) => context.state?.legalMoves || generateLegalMoves(context)

const buildPGN = ({ pgn, ...context }) => pgn || generatePGN(context)

const createNewHistory = ({
  FENString,
  isCheckMate = false,
  isStaleMate = false,
  isDraw = false,
  isInCheck = false,
  isGameOver = false,
}) => [{ FENString, isCheckMate, isStaleMate, isInCheck, isDraw, isGameOver }]

export const buildState = pipe(
  enrichObject(initializeState, 'state'),
  enrichObject(initializeHistory, 'history'),
  enrichObject(initializeCurrent, 'current'),
  enrich(expandCurrentHistory),
  enrichObject(buildFENObject, 'FEN'),
  enrichObject(buildBoardFromFEN, 'board'),
  enrichObject(buildLegalMoves, 'legalMoves'),
  enrichObject(buildPGN, 'pgn'),
  extractKeys([
    'history',
    'current',
    'FENString',
    'FEN',
    'board',
    'legalMoves',
    'isStaleMate',
    'isCheckMate',
    'isDraw',
    'isInCheck',
    'isGameOver',
    'pgn',
  ])
)

export const updateState = (fn) => (input) =>
  ifElse(
    isValid,
    enrichObject(
      ({ constants, state }) => buildState({ constants, state: fn(constants)(state)(input) }),
      'state'
    ),
    identity
  )
