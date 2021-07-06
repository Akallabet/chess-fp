import { rules } from '../../rules'

export default {
  FENString: 'r2qkbnr/p1pp4/bpn5/4pppp/4PPPP/N6N/PPPP2B1/R1BQK2R w KQkq - 0 8',
  constants: {
    pieces: {
      P: 'P',
      N: 'N',
      B: 'B',
      R: 'R',
      Q: 'Q',
      K: 'K',
    },
    COLORS: {
      w: 'w',
      b: 'b',
    },
    files: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    ranks: ['8', '7', '6', '5', '4', '3', '2', '1'],
    NAMES: {
      P: 'P',
      N: 'N',
      B: 'B',
      R: 'R',
      Q: 'Q',
      K: 'K',
    },
    rules,
  },
  state: {
    current: 0,
    history: [
      {
        FENString: 'r2qkbnr/p1pp4/bpn5/4pppp/4PPPP/N6N/PPPP2B1/R1BQK2R w KQkq - 0 8',
        isCheckMate: false,
        isStaleMate: false,
        isInCheck: false,
      },
    ],
  },
  history: [
    {
      FENString: 'r2qkbnr/p1pp4/bpn5/4pppp/4PPPP/N6N/PPPP2B1/R1BQK2R w KQkq - 0 8',
      isCheckMate: false,
      isStaleMate: false,
      isInCheck: false,
    },
  ],
  current: 0,
  isCheckMate: false,
  isStaleMate: false,
  isInCheck: false,
  FEN: {
    piecePlacement: 'r2qkbnr/p1pp4/bpn5/4pppp/4PPPP/N6N/PPPP2B1/R1BQK2R',
    activeColor: 'w',
    halfmoveClock: '0',
    castling: {
      w: {
        isKingside: true,
        isQueenside: true,
      },
      b: {
        isKingside: true,
        isQueenside: true,
      },
    },
    enPassant: false,
    fullmoveNumber: 8,
  },
  board: [
    [
      {
        color: 'b',
        name: 'R',
      },
      {},
      {},
      {
        color: 'b',
        name: 'Q',
      },
      {
        color: 'b',
        name: 'K',
      },
      {
        color: 'b',
        name: 'B',
      },
      {
        color: 'b',
        name: 'N',
      },
      {
        color: 'b',
        name: 'R',
      },
    ],
    [
      {
        color: 'b',
        name: 'P',
      },
      {},
      {
        color: 'b',
        name: 'P',
      },
      {
        color: 'b',
        name: 'P',
      },
      {},
      {},
      {},
      {},
    ],
    [
      {
        color: 'b',
        name: 'B',
      },
      {
        color: 'b',
        name: 'P',
      },
      {
        color: 'b',
        name: 'N',
      },
      {},
      {},
      {},
      {},
      {},
    ],
    [
      {},
      {},
      {},
      {},
      {
        color: 'b',
        name: 'P',
      },
      {
        color: 'b',
        name: 'P',
      },
      {
        color: 'b',
        name: 'P',
      },
      {
        color: 'b',
        name: 'P',
      },
    ],
    [
      {},
      {},
      {},
      {},
      {
        color: 'w',
        name: 'P',
      },
      {
        color: 'w',
        name: 'P',
      },
      {
        color: 'w',
        name: 'P',
      },
      {
        color: 'w',
        name: 'P',
      },
    ],
    [
      {
        color: 'w',
        name: 'N',
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {
        color: 'w',
        name: 'N',
      },
    ],
    [
      {
        color: 'w',
        name: 'P',
      },
      {
        color: 'w',
        name: 'P',
      },
      {
        color: 'w',
        name: 'P',
      },
      {
        color: 'w',
        name: 'P',
      },
      {},
      {},
      {
        color: 'w',
        name: 'B',
      },
      {},
    ],
    [
      {
        color: 'w',
        name: 'R',
      },
      {},
      {
        color: 'w',
        name: 'B',
      },
      {
        color: 'w',
        name: 'Q',
      },
      {
        color: 'w',
        name: 'K',
      },
      {},
      {},
      {
        color: 'w',
        name: 'R',
      },
    ],
  ],
}
