import { start, move } from '..'
import { pipe } from 'eslambda'

const empty = {}
const emptyRow = [...Array(8)].map(() => empty)
const emptyBoard = [...Array(8)].map(() => emptyRow)

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

const boardWithBlackPawn = [
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, { name: 'P', color: 'b' }, empty, empty, empty, empty, empty],
  ...emptyBoard.slice(2, 8),
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

test('it should move white pawn c2 to c4', () => {
  const {
    state: { board, FENString },
  } = pipe(
    start,
    move('c4')
  )({ FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' })

  expect(board).toEqual([
    ...completeBoard.slice(0, 4),
    [empty, empty, { name: 'P', color: 'w' }, empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty, empty, empty, empty],
    [
      { name: 'P', color: 'w' },
      { name: 'P', color: 'w' },
      empty,
      { name: 'P', color: 'w' },
      { name: 'P', color: 'w' },
      { name: 'P', color: 'w' },
      { name: 'P', color: 'w' },
      { name: 'P', color: 'w' },
    ],
    [...completeBoard[7]],
  ])
  expect(FENString).toEqual('rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3 0 1')
})

test('it should not execute an ambiguous move', () => {
  const {
    state: { FENString },
  } = pipe(
    start,
    move('Nc3')
  )({
    FENString: 'r1bqkb1r/ppp1pppp/2n2n2/3p4/4P3/2N5/PPPPNPPP/R1BQKB1R w KQkq - 0 4',
  })

  expect(FENString).toEqual('r1bqkb1r/ppp1pppp/2n2n2/3p4/4P3/2N5/PPPPNPPP/R1BQKB1R w KQkq - 0 4')
})

test('it should move a piece give its name', () => {
  const {
    state: { FENString },
  } = pipe(
    start,
    move('Pc3')
  )({
    FENString: 'r1bqkb1r/ppp1pppp/2n2n2/3p4/4P3/8/PPPPNPPP/RNBQKB1R w KQkq - 0 4',
  })

  expect(FENString).toEqual('r1bqkb1r/ppp1pppp/2n2n2/3p4/4P3/2P5/PP1PNPPP/RNBQKB1R b KQkq - 0 4')
})

test('it should move a piece given its name and file', () => {
  const {
    state: { FENString },
  } = pipe(
    start,
    move('Nbc3')
  )({
    FENString: 'r1bqkb1r/ppp1pppp/2n2n2/3p4/4P3/8/PPPPNPPP/RNBQKB1R w KQkq - 0 4',
  })

  expect(FENString).toEqual('r1bqkb1r/ppp1pppp/2n2n2/3p4/4P3/2N5/PPPPNPPP/R1BQKB1R b KQkq - 1 4')
})

test('it should move a piece given its name, file and rank', () => {
  const {
    state: { FENString },
  } = pipe(
    start,
    move('Nb5c3')
  )({
    FENString: 'r1bqkb1r/ppp1pp1p/2n3p1/1N5n/2PpP3/8/PP1P1PPP/RNBQKB1R w KQkq - 0 4',
  })

  expect(FENString).toEqual('r1bqkb1r/ppp1pp1p/2n3p1/7n/2PpP3/2N5/PP1P1PPP/RNBQKB1R b KQkq - 1 4')
})

test("it should increment the number of moves after Black's move", () => {
  const firstFullMove = pipe(
    start,
    move('c3'),
    move('c5')
  )({
    FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  })

  expect(firstFullMove.state.FEN.fullmoveNumber).toEqual(2)
  const secondHalfMove = pipe(move('c3'), move('b3'))(firstFullMove)
  expect(secondHalfMove.state.FEN.fullmoveNumber).toEqual(2)
  const secondFullMove = pipe(move('b5'))(secondHalfMove)
  expect(secondFullMove.state.FEN.fullmoveNumber).toEqual(3)
})

test('it should flag a pawn as en-passant if it moves of 2 squares at once', () => {
  const firstMove = pipe(
    start,
    move('c4')
  )({ FENString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' })

  expect(firstMove.state.FENString).toEqual(
    'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3 0 1'
  )

  const secondMove = move('c6')(firstMove)

  expect(secondMove.state.FENString).toEqual(
    'rnbqkbnr/pp1ppppp/2p5/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2'
  )
})

test('it should check the black king', () => {
  const {
    state: { FENString, isInCheck },
  } = pipe(
    start,
    move('Qa4+')
  )({
    FENString: 'rnbqkbnr/ppp1p1pp/5p2/3p4/3P4/2P5/PP2PPPP/RNBQKBNR w KQkq - 0 3',
  })
  expect(FENString).toEqual('rnbqkbnr/ppp1p1pp/5p2/3p4/Q2P4/2P5/PP2PPPP/RNB1KBNR b KQkq - 1 3')
  expect(isInCheck).toBeTruthy()
})

test('it should only move pieces that remove check', () => {
  const firstMove = pipe(
    start,
    move('Be6')
  )({
    FENString: 'rnbqkbnr/ppp1p1pp/5p2/3p4/Q2P4/2P5/PP2PPPP/RNB1KBNR b KQkq - 0 3',
  })
  expect(firstMove.state.FENString).toEqual(
    'rnbqkbnr/ppp1p1pp/5p2/3p4/Q2P4/2P5/PP2PPPP/RNB1KBNR b KQkq - 0 3'
  )
  expect(move('Ke7')(firstMove).state.FENString).toEqual(
    'rnbqkbnr/ppp1p1pp/5p2/3p4/Q2P4/2P5/PP2PPPP/RNB1KBNR b KQkq - 0 3'
  )
  expect(move('Nc6')(move('Ke7')(firstMove)).state.FENString).toEqual(
    'r1bqkbnr/ppp1p1pp/2n2p2/3p4/Q2P4/2P5/PP2PPPP/RNB1KBNR w KQkq - 1 4'
  )
})

test('it should promote the pawn to queen', () => {
  const { state } = pipe(
    start,
    move('c8Q')
  )({
    FENString: '8/2P5/8/8/8/8/8/8 w KQkq - 0 1',
  })
  expect(state.FENString).toEqual('2Q5/8/8/8/8/8/8/8 b KQkq - 0 1')
})
