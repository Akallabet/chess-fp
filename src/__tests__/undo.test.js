import { start, move, undo } from '..'
import { pipe } from 'eslambda'

test('it should undo one move', () => {
  const { state } = pipe(
    start,
    move('b3'),
    undo()
  )({
    FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1',
  })
  expect(state.FENString).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1')
})

test('it should undo two moves', () => {
  const { state } = pipe(
    start,
    move('b3'),
    move('c6'),
    undo(),
    undo()
  )({
    FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1',
  })
  expect(state.FENString).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1')
})

test('it should undo one move and override the last one with a new move', () => {
  const { state } = pipe(
    start,
    move('b3'),
    move('c6'),
    undo(),
    move('c5')
  )({
    FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1',
  })
  expect(state.history).toEqual([
    {
      FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1',
      isCheckMate: false,
      isStaleMate: false,
      isThreefoldRepetition: false,
      isFiftyMovesRuleBroken: false,
      isInsufficientMaterial: false,
      isDraw: false,
      isInCheck: false,
      isGameOver: false,
    },
    {
      FENString: 'rnbqkbnr/pppppppp/8/8/8/1P6/P1PPPPPP/RNB1K1NR b KQkq - 0 1',
      isCheckMate: false,
      isStaleMate: false,
      isThreefoldRepetition: false,
      isFiftyMovesRuleBroken: false,
      isInsufficientMaterial: false,
      isDraw: false,
      isInCheck: false,
      isGameOver: false,
      move: 'b3',
    },
    {
      FENString: 'rnbqkbnr/pp1ppppp/8/2p5/8/1P6/P1PPPPPP/RNB1K1NR w KQkq c6 0 2',
      isCheckMate: false,
      isStaleMate: false,
      isThreefoldRepetition: false,
      isFiftyMovesRuleBroken: false,
      isInsufficientMaterial: false,
      isDraw: false,
      isInCheck: false,
      isGameOver: false,
      move: 'c5',
    },
  ])
})

test('it should not undo if there are no moves', () => {
  const { state } = pipe(
    start,
    undo()
  )({
    FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1',
  })
  expect(state.FENString).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1')
})
