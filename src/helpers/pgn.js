import { enrichObject, extractKeys, map, pipe } from 'eslambda'

export const byHeader =
  (HEADERS) =>
  ([headerA], [headerB]) => {
    const indexA = HEADERS.indexOf(headerA)
    const indexB = HEADERS.indexOf(headerB)

    if (indexA === -1 && indexB === -1) return headerB - headerA
    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return headerB - headerA
  }

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
  enrichObject(buildHeaders, 'headers'),
  enrichObject(toString, 'toString'),
  extractKeys(['headers', 'toString'])
)
