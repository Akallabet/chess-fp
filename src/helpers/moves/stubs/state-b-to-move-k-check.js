export default {
  FENString: 'rnbqkbnr/ppp1p1pp/5p2/3p4/Q2P4/2P5/PP2PPPP/RNB1KBNR b KQkq - 0 3',
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
  },
  state: {
    current: 0,
    history: [
      {
        FENString: 'rnbqkbnr/ppp1p1pp/5p2/3p4/Q2P4/2P5/PP2PPPP/RNB1KBNR b KQkq - 0 3',
        isCheckMate: false,
        isStaleMate: false,
        isInCheck: false,
      },
    ],
  },
  history: [
    {
      FENString: 'rnbqkbnr/ppp1p1pp/5p2/3p4/Q2P4/2P5/PP2PPPP/RNB1KBNR b KQkq - 0 3',
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
    piecePlacement: 'rnbqkbnr/ppp1p1pp/5p2/3p4/Q2P4/2P5/PP2PPPP/RNB1KBNR',
    activeColor: 'b',
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
    fullmoveNumber: 3,
  },
  board: [
    [
      {
        color: 'b',
        name: 'R',
      },
      {
        color: 'b',
        name: 'N',
      },
      {
        color: 'b',
        name: 'B',
      },
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
      {
        color: 'b',
        name: 'P',
      },
      {
        color: 'b',
        name: 'P',
      },
      {},
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
    ],
    [
      {},
      {},
      {},
      {},
      {},
      {
        color: 'b',
        name: 'P',
      },
      {},
      {},
    ],
    [
      {},
      {},
      {},
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
        color: 'w',
        name: 'Q',
      },
      {},
      {},
      {
        color: 'w',
        name: 'P',
      },
      {},
      {},
      {},
      {},
    ],
    [
      {},
      {},
      {
        color: 'w',
        name: 'P',
      },
      {},
      {},
      {},
      {},
      {},
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
        name: 'R',
      },
      {
        color: 'w',
        name: 'N',
      },
      {
        color: 'w',
        name: 'B',
      },
      {},
      {
        color: 'w',
        name: 'K',
      },
      {
        color: 'w',
        name: 'B',
      },
      {
        color: 'w',
        name: 'N',
      },
      {
        color: 'w',
        name: 'R',
      },
    ],
  ],
}
