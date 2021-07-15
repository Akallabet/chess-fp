# Chess FP (Functional Programming)

See it in action [https://akallabet.github.io/chessboard](https://akallabet.github.io/chessboard/)

## Description

Functional programming javascript library to play chess (no UI, just the logic)

- start - `start() || start({ FENString: '8/8/8/8/8/8/8/8 w KQkq - 0 1' })`
- move - `move('e4')(start())`
- undo - `undo()(move('e4')(start()))`
- redo - `redo()(undo()(move('e4')(start())))`
- headers - `headers([['Event', 'Practice match'])(start())`
- comment - `comment('Good move')(move('e4')(start()))`

Each one of those functions returns an [object](configuration.md) that represents the next configuration of the game

- getMoves - `getMoves()(start())`
- getMove - `getMoves()(start())`// ({origin: {y,x}, destination:{y,x}}) => SAN e.g. "e4"
