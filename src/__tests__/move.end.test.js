import { start, move } from '..'
import { pipe } from 'eslambda'

test('it should end the game with a checkmate', () => {
  const {
    state: { FENString, isCheckMate, isGameOver },
  } = pipe(
    start,
    move('Qxf7#')
  )({
    FENString: 'rnbqkbnr/1ppp1pp1/p6p/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 4',
  })
  expect(FENString).toEqual('rnbqkbnr/1ppp1Qp1/p6p/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4')
  expect(isCheckMate).toBeTruthy()
  expect(isGameOver).toBeTruthy()
})

test('it should not end the game with a checkmate if there a piece that can protect the King', () => {
  const {
    state: { FENString, isCheckMate, isGameOver },
  } = pipe(
    start,
    move('Qxe5+')
  )({
    FENString: 'rnbqkbnr/1ppp1pp1/7p/p3pQ2/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 5',
  })
  expect(FENString).toEqual('rnbqkbnr/1ppp1pp1/7p/p3Q3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 5')
  expect(isCheckMate).toBeFalsy()
  expect(isGameOver).toBeFalsy()
})

test('it should end the game with a draw if there is a stalemate', () => {
  const {
    state: { FENString, isStaleMate, isDraw, isGameOver },
  } = pipe(
    start,
    move('Be3')
  )({
    FENString: 'k7/8/8/6B1/8/1R6/8/8 w - - 0 4',
  })

  expect(FENString).toEqual('k7/8/8/8/8/1R2B3/8/8 b - - 1 4')
  expect(isStaleMate).toBeTruthy()
  expect(isDraw).toBeTruthy()
  expect(isGameOver).toBeTruthy()
})

test('it should end the game with a draw if the 50 moves rule is broken', () => {
  const { state } = pipe(
    start,
    move('Na6'), // 98
    move('Qb3'), // 99
    move('Bg6') // 100
  )({
    FENString: 'rn1qkbnr/p3pppp/1pp4B/3p3b/Q1PP4/N3P3/PP3PPP/R3KBNR b KQkq - 97 50',
  })

  expect(state.isGameOver).toBeTruthy()
  expect(state.isFiftyMovesRuleBroken).toBeTruthy()
  expect(state.isDraw).toBeTruthy()
})

test('it should not declare checkmate if the menacing piece can be captured', () => {
  const { state } = pipe(
    start,
    move('Nc7x')
  )({
    FENString: 'rnbqkbnr/2ppppp1/pp2N2p/8/8/8/PPPPPPPP/RNBQKB1R w KQkq - 0 4',
  })

  expect(state.isCheckMate).toBeFalsy()
})

test('it should tell when a move has been repeated 3 times in a row', () => {
  const moves = pipe(
    start,
    move('Nf3'),
    move('Nf6'),
    move('Ng1'),
    move('Ng8'),
    move('Nf3'),
    move('Nf6')
  )({ FENString: 'rnbqkbnr/ppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0' })
  expect(moves.isDraw).toBeFalsy()

  const { state } = pipe(move('Ng1'), move('Ng8'))(moves)
  expect(state.isThreefoldRepetition).toBeTruthy()
  expect(state.isDraw).toBeTruthy()
})

test('it should end the game with a draw if there is insufficient material (K vs. K, K vs. KB, or K vs. KN)', () => {
  const moves = pipe(start)({ FENString: '4k3/8/8/8/8/8/8/4K3 w - - 0 0' })
  expect(moves.isInsufficientMaterial).toBeTruthy()
  expect(moves.isDraw).toBeTruthy()
})
