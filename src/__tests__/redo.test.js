import { start, move, undo, redo } from '..'
import { pipe } from 'eslambda'

test('it should undo two moves, then redo one', () => {
  const { state } = pipe(
    start,
    move('b3'),
    move('c6'),
    undo(),
    undo(),
    redo()
  )({
    FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1',
  })
  expect(state.FENString).toEqual('rnbqkbnr/pppppppp/8/8/8/1P6/P1PPPPPP/RNB1K1NR b KQkq - 0 1')
})

test('it should always return the last available move when redo the last move', () => {
  const { state } = pipe(
    start,
    move('b3'),
    move('c6'),
    undo(),
    redo(),
    redo(),
    redo()
  )({
    FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1',
  })
  expect(state.FENString).toEqual('rnbqkbnr/pp1ppppp/2p5/8/8/1P6/P1PPPPPP/RNB1K1NR w KQkq - 0 2')
})
