import { generateLegalMoves } from './generate-legal-moves'
import stateBToMoveKCheck from './stubs/state-b-to-move-k-check'
import movesBToMoveKCheck from './stubs/moves-b-to-move-k-check'
import stateWToMoveMenaceKingside from './stubs/state-w-to-move-menace-kingside'
import movesWToMoveMenaceKingside from './stubs/moves-w-to-move-menace-kingside'

test('it should only allows the moves that remove the check, when the king is menaced', () => {
  expect(generateLegalMoves(stateBToMoveKCheck)).toEqual(movesBToMoveKCheck)
})

test('it should filter out kingside castling moves if one square on kingside is menaced', () => {
  expect(generateLegalMoves(stateWToMoveMenaceKingside)).toEqual(movesWToMoveMenaceKingside)
})
