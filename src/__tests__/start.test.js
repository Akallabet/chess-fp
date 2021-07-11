import { start } from '..'
import { pipe } from 'eslambda'

const empty = {}
const emptyRow = [...Array(8)].map(() => empty)
const emptyBoard = [...Array(8)].map(() => emptyRow)
const boardWithBlackPawn = [
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, { name: 'P', color: 'b' }, empty, empty, empty, empty, empty],
  ...emptyBoard.slice(2, 8),
]
const completeBoard = [
  [
    { name: 'R', color: 'b' },
    { name: 'N', color: 'b' },
    { name: 'B', color: 'b' },
    { name: 'Q', color: 'b' },
    { name: 'K', color: 'b' },
    { name: 'B', color: 'b' },
    { name: 'N', color: 'b' },
    { name: 'R', color: 'b' },
  ],
  [...Array(8)].map(() => ({ name: 'P', color: 'b' })),
  [...emptyRow],
  [...emptyRow],
  [...emptyRow],
  [...emptyRow],
  [...Array(8)].map(() => ({ name: 'P', color: 'w' })),
  [
    { name: 'R', color: 'w' },
    { name: 'N', color: 'w' },
    { name: 'B', color: 'w' },
    { name: 'Q', color: 'w' },
    { name: 'K', color: 'w' },
    { name: 'B', color: 'w' },
    { name: 'N', color: 'w' },
    { name: 'R', color: 'w' },
  ],
]

test('it should return an empty board', () => {
  const {
    state: { board, FENString },
  } = start({ FENString: '8/8/8/8/8/8/8/8 w KQkq - 0 1' })
  expect(board).toEqual(emptyBoard)
  expect(FENString).toEqual('8/8/8/8/8/8/8/8 w KQkq - 0 1')
})

test('it should return a board with a black pawn in second row, third column', () => {
  const {
    state: { board, FENString },
  } = start({ FENString: '8/2p5/8/8/8/8/8/8 w KQkq - 0 1' })
  expect(board).toEqual(boardWithBlackPawn)
  expect(FENString).toEqual('8/2p5/8/8/8/8/8/8 w KQkq - 0 1')
})

test('it should return a board with two black pawn in second row', () => {
  const {
    state: { board, FENString },
  } = start({
    FENString: '8/2p1p3/8/8/8/8/8/8 w KQkq - 0 1',
  })
  expect(board).toEqual([
    [empty, empty, empty, empty, empty, empty, empty, empty],
    [
      empty,
      empty,
      { name: 'P', color: 'b' },
      empty,
      { name: 'P', color: 'b' },
      empty,
      empty,
      empty,
    ],
    ...emptyBoard.slice(2, 8),
  ])
  expect(FENString).toEqual('8/2p1p3/8/8/8/8/8/8 w KQkq - 0 1')
})

test('it should return a board with all the standard pieces', () => {
  const {
    state: { board, FENString },
  } = start({
    FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  })

  expect(board).toEqual(completeBoard)
  expect(FENString).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
})

test('it should start a game from an existing history', () => {
  const { state } = pipe(start)({
    state: {
      history: [
        {
          FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1K1NR w KQkq - 0 1',
          isCheckMate: false,
          isStaleMate: false,
          isThreefoldRepetition: false,
          isFiftyMovesRuleBroken: false,
          isInsufficientMaterial: false,
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
          isInCheck: false,
          isGameOver: false,
        },
        {
          FENString: 'rnbqkbnr/pp1ppppp/2p5/8/8/1P6/P1PPPPPP/RNB1K1NR w KQkq - 0 2',
          isCheckMate: false,
          isStaleMate: false,
          isThreefoldRepetition: false,
          isFiftyMovesRuleBroken: false,
          isInsufficientMaterial: false,
          isInCheck: false,
          isGameOver: false,
        },
      ],
      current: 2,
    },
  })
  expect(state.FENString).toEqual('rnbqkbnr/pp1ppppp/2p5/8/8/1P6/P1PPPPPP/RNB1K1NR w KQkq - 0 2')
})
