import { updateState } from './helpers/state'
import { deplete, enrichObject, extractKey, identity, ifElse, isGreaterThan, pipe } from 'eslambda'

const decreaseByOne = (n) => n - 1
const isGreaterThanZero = isGreaterThan(0)

const undoCurrent = pipe(
  enrichObject(
    pipe(extractKey('current'), ifElse(isGreaterThanZero, decreaseByOne, identity)),
    'current'
  ),
  deplete('legalMoves')
)

export const undo = () => (state) => () => undoCurrent(state)

export default updateState(undo)
