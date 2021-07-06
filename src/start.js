import { enrichObject, pipe } from 'eslambda'
import { addConstants } from './helpers/constants'
import { buildState } from './helpers/state'

export default pipe(enrichObject(addConstants, 'constants'), enrichObject(buildState, 'state'))
