import { enrichObject, extractKeys, join, map, pipe, reduce } from 'eslambda'

export const byHeader =
  (HEADERS) =>
  ([headerA], [headerB]) =>
    (HEADERS.indexOf(headerA) === -1 && HEADERS.indexOf(headerB) === -1 && headerB - headerA) ||
    (HEADERS.indexOf(headerA) === -1 && 1) ||
    (HEADERS.indexOf(headerB) === -1 && -1) ||
    headerB - headerA

const headerToArray = (header) => [header, '']
const buildHeadersArray = map(headerToArray)
const headerDoesNotExist = (headers) => (HEADER) =>
  headers.length === 0 || !headers.find(([headerString]) => headerString === HEADER)
const buildHeaders = ({ constants: { HEADERS }, pgn: { headers = [] } }) =>
  [...buildHeadersArray(HEADERS.filter(headerDoesNotExist(headers))), ...headers].sort(
    byHeader(HEADERS)
  )

const headerToString = ([header, value]) => `[${header} "${value || '?'}"]`
const buildHeadersStringArray = map(headerToString)

const buildMoves = pipe(
  ({ state: { history = [] } }) => history.slice(1),
  map(({ move }) => move),
  reduce(
    (fullMoves, move, index) =>
      index % 2 === 0
        ? [...fullMoves, [move]]
        : [...fullMoves.slice(0, fullMoves.length - 1), [fullMoves[fullMoves.length - 1][0], move]],
    []
  )
)

const buildMovesString = pipe(
  map(([first, second = ''], index) => `${index + 1}. ${first} ${second}`),
  join(' ')
)

const toString = pipe(
  ({ headers, moves }) => ({
    headers: buildHeadersStringArray(headers),
    moves: buildMovesString(moves),
  }),
  ({ headers, moves }) =>
    (newLine = '/n') =>
      `${headers.join(newLine)}${newLine}${newLine}${moves}`
)

const buildPGNState = ({ state: { pgn } }) => pgn || {}

export const generatePGN = pipe(
  enrichObject(buildPGNState, 'pgn'),
  enrichObject(buildMoves, 'moves'),
  enrichObject(buildHeaders, 'headers'),
  enrichObject(toString, 'toString'),
  extractKeys(['headers', 'moves', 'toString'])
)
