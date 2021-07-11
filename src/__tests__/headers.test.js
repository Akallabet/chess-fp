import { start, headers } from '..'
import { pipe } from 'eslambda'

test('it should return all the default PGN headers', () => {
  const { state } = start({
    FENString: 'rn1qkbnr/p3pppp/1pp4B/3p3b/Q1PP4/N3P3/PP3PPP/R3KBNR w KQkq - 0 7',
  })

  expect(state.pgn).toHaveProperty('headers', [
    ['Event', ''],
    ['Site', ''],
    ['Date', ''],
    ['Round', ''],
    ['Result', ''],
    ['White', ''],
    ['Black', ''],
  ])
  expect(state.pgn.toString()).toEqual(
    '[Event "?"]/n[Site "?"]/n[Date "?"]/n[Round "?"]/n[Result "?"]/n[White "?"]/n[Black "?"]/n/n'
  )
})

test('it should return a custom set of PGN headers', () => {
  const { state } = pipe(
    start,
    headers([
      ['WhiteELO', ''],
      ['BlackELO', ''],
    ])
  )({
    FENString: 'rn1qkbnr/p3pppp/1pp4B/3p3b/Q1PP4/N3P3/PP3PPP/R3KBNR w KQkq - 0 7',
  })

  expect(state.pgn).toHaveProperty('headers', [
    ['Event', ''],
    ['Site', ''],
    ['Date', ''],
    ['Round', ''],
    ['Result', ''],
    ['White', ''],
    ['Black', ''],
    ['WhiteELO', ''],
    ['BlackELO', ''],
  ])
  expect(state.pgn.toString()).toEqual(
    '[Event "?"]/n[Site "?"]/n[Date "?"]/n[Round "?"]/n[Result "?"]/n[White "?"]/n[Black "?"]/n[WhiteELO "?"]/n[BlackELO "?"]/n/n'
  )
})

test('it should add data to one or more headers', () => {
  const { state } = pipe(
    start,
    headers([
      ['Event', 'Practice match'],
      ['Site', 'The internet'],
      ['Date', '10-10-2020'],
    ])
  )({
    FENString: 'rn1qkbnr/p3pppp/1pp4B/3p3b/Q1PP4/N3P3/PP3PPP/R3KBNR w KQkq - 0 7',
  })

  expect(state.pgn).toHaveProperty('headers', [
    ['Event', 'Practice match'],
    ['Site', 'The internet'],
    ['Date', '10-10-2020'],
    ['Round', ''],
    ['Result', ''],
    ['White', ''],
    ['Black', ''],
  ])
  expect(state.pgn.toString()).toEqual(
    '[Event "Practice match"]/n[Site "The internet"]/n[Date "10-10-2020"]/n[Round "?"]/n[Result "?"]/n[White "?"]/n[Black "?"]/n/n'
  )
})
