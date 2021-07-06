import { start, move } from '..'
import { pipe } from 'eslambda'

test('it should castle the white King on King side', () => {
  const { state } = pipe(start, move('0-0'))({ FENString: '8/8/8/8/8/8/8/R3K2R w KQkq - 0 1' })
  expect(state.FENString).toEqual('8/8/8/8/8/8/8/R4RK1 b kq - 0 1')
})

test('it should castle the white King on Queen side', () => {
  const { state } = pipe(start, move('0-0-0'))({ FENString: '8/8/8/8/8/8/8/R3K2R w KQkq - 0 1' })
  expect(state.FENString).toEqual('8/8/8/8/8/8/8/2KR3R b kq - 0 1')
})

test('it should castle the black King on King side', () => {
  const { state } = pipe(start, move('0-0'))({ FENString: 'r3k2r/8/8/8/8/8/8/8 b KQkq - 0 1' })
  expect(state.FENString).toEqual('r4rk1/8/8/8/8/8/8/8 w KQ - 0 2')
})

test('it should castle the black King on Queen side', () => {
  const { state } = pipe(start, move('0-0-0'))({ FENString: 'r3k2r/8/8/8/8/8/8/8 b KQkq - 0 1' })
  expect(state.FENString).toEqual('2kr3r/8/8/8/8/8/8/8 w KQ - 0 2')
})

test('it should disable castling availability after both colors have castled', () => {
  const {
    state: { FENString },
  } = pipe(start, move('0-0'), move('0-0-0'))({ FENString: 'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1' })
  expect(FENString).toEqual('2kr3r/8/8/8/8/8/8/R4RK1 w - - 0 2')
})

test.each`
  color  | side       | SAN        | availability
  ${'w'} | ${'king'}  | ${'0-0'}   | ${'kq'}
  ${'w'} | ${'king'}  | ${'0-0'}   | ${'Qkq'}
  ${'w'} | ${'king'}  | ${'0-0'}   | ${'Q'}
  ${'w'} | ${'king'}  | ${'0-0'}   | ${'k'}
  ${'w'} | ${'king'}  | ${'0-0'}   | ${'q'}
  ${'w'} | ${'king'}  | ${'0-0'}   | ${'-'}
  ${'w'} | ${'queen'} | ${'0-0-0'} | ${'kq'}
  ${'w'} | ${'queen'} | ${'0-0-0'} | ${'Kkq'}
  ${'w'} | ${'queen'} | ${'0-0-0'} | ${'K'}
  ${'w'} | ${'queen'} | ${'0-0-0'} | ${'k'}
  ${'w'} | ${'queen'} | ${'0-0-0'} | ${'q'}
  ${'w'} | ${'queen'} | ${'0-0-0'} | ${'-'}
  ${'b'} | ${'king'}  | ${'0-0'}   | ${'KQ'}
  ${'b'} | ${'king'}  | ${'0-0'}   | ${'KQq'}
  ${'b'} | ${'king'}  | ${'0-0'}   | ${'q'}
  ${'b'} | ${'king'}  | ${'0-0'}   | ${'K'}
  ${'b'} | ${'king'}  | ${'0-0'}   | ${'Q'}
  ${'b'} | ${'king'}  | ${'0-0'}   | ${'-'}
  ${'b'} | ${'queen'} | ${'0-0-0'} | ${'KQ'}
  ${'b'} | ${'queen'} | ${'0-0-0'} | ${'KQk'}
  ${'b'} | ${'queen'} | ${'0-0-0'} | ${'K'}
  ${'b'} | ${'queen'} | ${'0-0-0'} | ${'k'}
  ${'b'} | ${'queen'} | ${'0-0-0'} | ${'Q'}
  ${'b'} | ${'queen'} | ${'0-0-0'} | ${'-'}
`(
  'it should not castle $color King on $side side when castling availability is $availability',
  ({ color, SAN, availability }) => {
    const {
      state: { FENString },
    } = pipe(
      start,
      move(SAN)
    )({ FENString: `r3k2r/8/8/8/8/8/8/R3K2R ${color} ${availability} - 0 1` })

    expect(FENString).toEqual(`r3k2r/8/8/8/8/8/8/R3K2R ${color} ${availability} - 0 1`)
  }
)

test('it should not allow kingside castling if the king has to pass on a menaced square', () => {
  const {
    state: { FENString },
  } = pipe(
    start,
    move('0-0')
  )({
    FENString: 'r2qkbnr/p1pp4/bpn5/4pppp/4PPPP/N6N/PPPP2B1/R1BQK2R w KQkq - 0 8',
  })
  expect(FENString).toEqual('r2qkbnr/p1pp4/bpn5/4pppp/4PPPP/N6N/PPPP2B1/R1BQK2R w KQkq - 0 8')
})

test('it should not allow queenside castling if the king has to pass on a menaced square', () => {
  const {
    state: { FENString },
  } = pipe(
    start,
    move('0-0-0')
  )({
    FENString: 'rn1qkbnr/p3pppp/1pp4B/3p3b/Q1PP4/N3P3/PP3PPP/R3KBNR w KQkq - 0 7',
  })
  expect(FENString).toEqual('rn1qkbnr/p3pppp/1pp4B/3p3b/Q1PP4/N3P3/PP3PPP/R3KBNR w KQkq - 0 7')
})
