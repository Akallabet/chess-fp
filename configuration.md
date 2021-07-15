```
// Configuration object after one move
{
  "state":{
    "history":[
      {
        "FENString":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        "isCheckMate":false,
        "isStaleMate":false,
        "isInCheck":false,
        "isDraw":false,
        "isGameOver":false
      },
      {
        "FENString":"rnbqkbnr/pppppppp/8/8/8/5P2/PPPPP1PP/RNBQKBNR b KQkq - 0 1",
        "isStaleMate":false,
        "isDraw":false,
        "isInCheck":false,
        "isCheckMate":false,
        "isGameOver":false
      }
    ],
    "current":1,
    "FENString":"rnbqkbnr/pppppppp/8/8/8/5P2/PPPPP1PP/RNBQKBNR b KQkq - 0 1",
    "FEN":{
      "piecePlacement":"rnbqkbnr/pppppppp/8/8/8/5P2/PPPPP1PP/RNBQKBNR",
      "activeColor":"b",
      "castling":{"w":{"isKingside":true,"isQueenside":true},"b":{"isKingside":true,"isQueenside":true}},
      "enPassant":false,
      "halfmoveClock":0,
      "fullmoveNumber":1
    },
    "board":[
      [{"color":"b","name":"R"},{"color":"b","name":"N"},{"color":"b","name":"B"},{"color":"b","name":"Q"},{"color":"b","name":"K"},{"color":"b","name":"B"},{"color":"b","name":"N"},{"color":"b","name":"R"}],
      [{"color":"b","name":"P"},{"color":"b","name":"P"},{"color":"b","name":"P"},{"color":"b","name":"P"},{"color":"b","name":"P"},{"color":"b","name":"P"},{"color":"b","name":"P"},{"color":"b","name":"P"}],
      [{},{},{},{},{},{},{},{}],
      [{},{},{},{},{},{},{},{}],
      [{},{},{},{},{},{},{},{}],
      [{},{},{},{},{},{"color":"w","name":"P"},{},{}],
      [{"color":"w","name":"P"},{"color":"w","name":"P"},{"color":"w","name":"P"},{"color":"w","name":"P"},{"color":"w","name":"P"},{},{"color":"w","name":"P"},{"color":"w","name":"P"}],
      [{"color":"w","name":"R"},{"color":"w","name":"N"},{"color":"w","name":"B"},{"color":"w","name":"Q"},{"color":"w","name":"K"},{"color":"w","name":"B"},{"color":"w","name":"N"},{"color":"w","name":"R"}]
    ],
    "legalMoves":[
      [[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[]],
      [
        [{"name":"N","origin":{"y":0,"x":1},"destination":{"y":2,"x":0}},{"name":"P","origin":{"y":1,"x":0},"destination":{"y":2,"x":0}}],
        [{"name":"P","origin":{"y":1,"x":1},"destination":{"y":2,"x":1}}],
        [{"name":"N","origin":{"y":0,"x":1},"destination":{"y":2,"x":2}},{"name":"P","origin":{"y":1,"x":2},"destination":{"y":2,"x":2}}],
        [{"name":"P","origin":{"y":1,"x":3},"destination":{"y":2,"x":3}}],
        [{"name":"P","origin":{"y":1,"x":4},"destination":{"y":2,"x":4}}],
        [{"name":"N","origin":{"y":0,"x":6},"destination":{"y":2,"x":5}},{"name":"P","origin":{"y":1,"x":5},"destination":{"y":2,"x":5}}],
        [{"name":"P","origin":{"y":1,"x":6},"destination":{"y":2,"x":6}}],
        [{"name":"N","origin":{"y":0,"x":6},"destination":{"y":2,"x":7}},{"name":"P","origin":{"y":1,"x":7},"destination":{"y":2,"x":7}}]
      ],
      [
        [{"name":"P","origin":{"y":1,"x":0},"destination":{"y":3,"x":0}}],
        [{"name":"P","origin":{"y":1,"x":1},"destination":{"y":3,"x":1}}],
        [{"name":"P","origin":{"y":1,"x":2},"destination":{"y":3,"x":2}}],
        [{"name":"P","origin":{"y":1,"x":3},"destination":{"y":3,"x":3}}],
        [{"name":"P","origin":{"y":1,"x":4},"destination":{"y":3,"x":4}}],
        [{"name":"P","origin":{"y":1,"x":5},"destination":{"y":3,"x":5}}],
        [{"name":"P","origin":{"y":1,"x":6},"destination":{"y":3,"x":6}}],
        [{"name":"P","origin":{"y":1,"x":7},"destination":{"y":3,"x":7}}]
      ],
      [[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[]]
    ],
    "isStaleMate":false,
    "isCheckMate":false,
    "isDraw":false,
    "isInCheck":false,
    "isGameOver":false,
    "pgn":{
      "headers":[
        ["Event",""],
        ["Site",""],
        ["Date",""],
        ["Round",""],
        ["Result",""],
        ["White",""],
        ["Black",""]
      ]
    }
  },
  "constants": {
    "COLORS": {b: "b"},
    "NAMES": {
      P: "P",
      N: "N",
      B: "B",
      R: "R",
      Q: "Q",
      K: "K",
    },
    "pieces": {
      P: "P",
      N: "N",
      B: "B",
      R: "R",
      Q: "Q",
      K: "K",
    }
    "files":["a", "b", "c", "d", "e", "f", "g", "h"],
    "ranks":["8", "7", "6", "5", "4", "3", "2", "1"],
    "HEADERS": ["Event", "Site", "Date", "Round", "Result", "White", "Black"]
  }
}
```
