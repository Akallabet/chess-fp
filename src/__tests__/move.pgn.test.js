import { start } from '..'
import { pipe } from 'eslambda'
import { move } from '..'

test('it should return all the moves in pgn format', () => {
  const { state } = pipe(
    start,
    move('b3'),
    move('c6'),
    move('a3'),
    move('d5')
  )({
    FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1',
  })

  expect(state.pgn.moves).toEqual([
    [
      ['b3', ''],
      ['c6', ''],
    ],
    [
      ['a3', ''],
      ['d5', ''],
    ],
  ])

  expect(state.pgn.toString()).toEqual(
    '[Event "?"]/n[Site "?"]/n[Date "?"]/n[Round "?"]/n[Result "?"]/n[White "?"]/n[Black "?"]/n/n1. b3 c6 2. a3 d5'
  )
})
