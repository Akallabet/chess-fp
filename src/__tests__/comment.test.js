import { start } from '..'
import { pipe } from 'eslambda'
import { move, comment } from '..'

test('it should add comments to each move', () => {
  const { state } = pipe(
    start,
    move('b3'),
    comment('Good move'),
    move('c6'),
    comment('Could do better'),
    move('a3'),
    move('d5'),
    comment('That is it')
  )({
    FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1',
  })

  expect(state.pgn.moves).toEqual([
    [
      ['b3', 'Good move'],
      ['c6', 'Could do better'],
    ],
    [
      ['a3', ''],
      ['d5', 'That is it'],
    ],
  ])

  expect(state.pgn.toString()).toEqual(
    '[Event "?"]/n[Site "?"]/n[Date "?"]/n[Round "?"]/n[Result "?"]/n[White "?"]/n[Black "?"]/n/n1. b3 {Good move} c6 {Could do better} 2. a3 d5 {That is it}'
  )
})
