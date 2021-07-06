import { returnValue } from './helpers'
import { fromSAN } from './helpers/san'
import { addConstants } from './helpers/constants'
import { cleanBoard } from './helpers/board'
import { pipe } from 'eslambda'

const emptyObject = () => ({})
const emptyBoard = ({ files, ranks }) =>
  [...Array(files.length)].map(() => [...Array(ranks.length)].map(() => ({})))

const highligthMovesToMetaBoard =
  ({ legalMoves }) =>
  ({ x, y }) => {
    const metaBoard = cleanBoard(legalMoves)
    for (const rows of legalMoves) {
      for (const origins of rows) {
        for (const { destination, origin } of origins) {
          if (origin && y === origin.y && x === origin.x)
            metaBoard[destination.y][destination.x] = {
              move: true,
            }
        }
      }
    }

    return metaBoard
  }

const getMoves = (constants) => (state) =>
  pipe(fromSAN(constants), highligthMovesToMetaBoard(state))

const getEmptyMoves = pipe(emptyObject, addConstants, emptyBoard)

export default returnValue(getMoves, getEmptyMoves)
