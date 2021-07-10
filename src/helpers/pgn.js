import { enrichObject, extractKeys, map, pipe } from 'eslambda'

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

const headerToString = ([header, value]) => `[${header} "${value || '-'}"]`
const buildHeadersStringArray = map(headerToString)

// const buildMoves = (context) =>

const toString = pipe(
  ({ headers }) => ({
    headers: buildHeadersStringArray(headers),
  }),
  ({ headers }) =>
    (newLine = '/n') =>
      headers.join(newLine)
)

const buildPGNState = ({ state: { pgn } }) => pgn || {}

export const generatePGN = pipe(
  enrichObject(buildPGNState, 'pgn'),
  // log('state'),
  enrichObject(buildHeaders, 'headers'),
  enrichObject(toString, 'toString'),
  extractKeys(['headers', 'toString'])
)
