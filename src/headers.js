import { updateState } from './helpers/state'
import { byHeader } from './helpers/pgn'
import { reduce } from 'eslambda'

const removeDuplicate = reduce(
  (headers, [header, value]) =>
    headers.find(([existingHeader]) => existingHeader === header)
      ? headers
      : [...headers, [header, value]],
  []
)

export const headers =
  ({ HEADERS }) =>
  (state) =>
  (customHeaders) => ({
    ...state,
    pgn: {
      headers: removeDuplicate([...customHeaders, ...state.pgn.headers]).sort(byHeader(HEADERS)),
    },
  })

export default updateState(headers)
