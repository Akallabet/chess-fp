import { start, getMoves } from '..'
import { pipe } from 'eslambda'

const empty = {}
const emptyRow = [...Array(8)].map(() => empty)

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

const highlightRookMoves = () => [
  [empty, empty, empty, { move: true }, empty, empty, empty, empty],
  [empty, empty, empty, { move: true }, empty, empty, empty, empty],
  [empty, empty, empty, { move: true }, empty, empty, empty, empty],
  [empty, empty, empty, { move: true }, empty, empty, empty, empty],
  [...[...Array(3)].map(() => ({ move: true })), {}, ...[...Array(4)].map(() => ({ move: true }))],
  [empty, empty, empty, { move: true }, empty, empty, empty, empty],
  [empty, empty, empty, { move: true }, empty, empty, empty, empty],
  [empty, empty, empty, { move: true }, empty, empty, empty, empty],
]

const highlightKnightMoves = () => [
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, { move: true }, empty, { move: true }, empty, empty, empty],
  [empty, { move: true }, empty, empty, empty, { move: true }, empty, empty],
  [empty, empty, empty, {}, empty, empty, empty, empty],
  [empty, { move: true }, empty, empty, empty, { move: true }, empty, empty],
  [empty, empty, { move: true }, empty, { move: true }, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
]

const highlightBishopMoves = () => [
  [empty, empty, empty, empty, empty, empty, empty, { move: true }],
  [{ move: true }, empty, empty, empty, empty, empty, { move: true }, empty],
  [empty, { move: true }, empty, empty, empty, { move: true }, empty, empty],
  [empty, empty, { move: true }, empty, { move: true }, empty, empty, empty],
  [empty, empty, empty, {}, empty, empty, empty, empty],
  [empty, empty, { move: true }, empty, { move: true }, empty, empty, empty],
  [empty, { move: true }, empty, empty, empty, { move: true }, empty, empty],
  [{ move: true }, empty, empty, empty, empty, empty, { move: true }, empty],
]

const highlightKingMoves = () => [
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, { move: true }, { move: true }, { move: true }, empty, empty, empty],
  [empty, empty, { move: true }, {}, { move: true }, empty, empty, empty],
  [empty, empty, { move: true }, { move: true }, { move: true }, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
]

const highlightQueenMoves = () => [
  [empty, empty, empty, { move: true }, empty, empty, empty, { move: true }],
  [{ move: true }, empty, empty, { move: true }, empty, empty, { move: true }, empty],
  [empty, { move: true }, empty, { move: true }, empty, { move: true }, empty, empty],
  [empty, empty, { move: true }, { move: true }, { move: true }, empty, empty, empty],
  [
    { move: true },
    { move: true },
    { move: true },
    {},
    { move: true },
    { move: true },
    { move: true },
    { move: true },
  ],
  [empty, empty, { move: true }, { move: true }, { move: true }, empty, empty, empty],
  [empty, { move: true }, empty, { move: true }, empty, { move: true }, empty, empty],
  [{ move: true }, empty, empty, { move: true }, empty, empty, { move: true }, empty],
]

test.each`
  name   | FENString | color  | colorName  | pieceName   | expectedBoard
  ${'R'} | ${'R'}    | ${'w'} | ${'white'} | ${'Rook'}   | ${highlightRookMoves}
  ${'R'} | ${'r'}    | ${'b'} | ${'black'} | ${'Rook'}   | ${highlightRookMoves}
  ${'N'} | ${'N'}    | ${'w'} | ${'white'} | ${'Knight'} | ${highlightKnightMoves}
  ${'N'} | ${'n'}    | ${'b'} | ${'black'} | ${'Knight'} | ${highlightKnightMoves}
  ${'B'} | ${'B'}    | ${'w'} | ${'white'} | ${'Bishop'} | ${highlightBishopMoves}
  ${'B'} | ${'b'}    | ${'b'} | ${'black'} | ${'Bishop'} | ${highlightBishopMoves}
  ${'K'} | ${'K'}    | ${'w'} | ${'white'} | ${'King'}   | ${highlightKingMoves}
  ${'K'} | ${'k'}    | ${'b'} | ${'black'} | ${'King'}   | ${highlightKingMoves}
  ${'Q'} | ${'Q'}    | ${'w'} | ${'white'} | ${'Queen'}  | ${highlightQueenMoves}
  ${'Q'} | ${'q'}    | ${'b'} | ${'black'} | ${'Queen'}  | ${highlightQueenMoves}
`(
  'it should highlight all the moves of a $colorName $pieceName',
  ({ name, FENString, color, expectedBoard }) => {
    const metaBoard = pipe(
      start,
      getMoves(`${name}d4`)
    )({ FENString: `8/8/8/8/3${FENString}4/8/8/8 ${color} - - 0 1` })

    expect(metaBoard).toEqual(expectedBoard({ name, color }))
  }
)

test('it should highlight the legal moves of a black pawn for its first move', () => {
  const initialFENString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1'
  const res = start({ FENString: initialFENString })
  const metaBoard = getMoves('a7')(res)

  expect(res.state.board).toEqual([
    [...completeBoard[0]],
    [{ name: 'P', color: 'b' }, ...completeBoard[1].slice(1)],
    [...emptyRow],
    [...emptyRow],
    [...emptyRow],
    [...emptyRow],
    ...completeBoard.slice(6),
  ])

  expect(metaBoard).toEqual([
    [...emptyRow],
    [...emptyRow],
    [{ move: true }, ...emptyRow.slice(1)],
    [{ move: true }, ...emptyRow.slice(1)],
    [...emptyRow],
    [...emptyRow],
    [...emptyRow],
    [...emptyRow],
  ])
})
