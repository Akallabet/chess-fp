const isWithinBoard = (board, { y, x }) => board[y] && board[y][x]
const isValidStep =
  (board) =>
  ({ y, x, ...args }) =>
    !board[y][x].name && { y, x, ...args }
const isValidCapture =
  (board, color) =>
  ({ y, x, ...args }) =>
    board[y][x].name && board[y][x].color !== color && { y, x, capture: true, ...args }
const isValidCheck =
  ({ board, activeColor, constants: { NAMES } }) =>
  ({ y, x, ...args }) =>
    isWithinBoard(board, { y, x }) &&
    board[y][x].name === NAMES.K &&
    board[y][x].color !== activeColor && { y, x, check: true, ...args }
const isValidMove =
  (board, color) =>
  ({ y, x }) =>
    isValidStep(board)({ y, x }) || isValidCapture(board, color)({ y, x })

const validate = ({ board, position, isValid, moves }) => {
  const ret = []
  for (const [increment, limit = () => true] of moves) {
    let steps = 1
    let nextPosition = increment(position)
    while (isWithinBoard(board, nextPosition) && limit(steps)) {
      const piece = isValid(nextPosition)
      if (piece) ret.push(isValid(nextPosition))
      if (isValidStep(board)(nextPosition)) {
        nextPosition = increment(nextPosition)
        steps += 1
      } else {
        break
      }
    }
  }
  return ret
}

const buildValidateCheck =
  ({ board, isValid }) =>
  (moves) =>
  (position) => {
    const hasCheck = validate({ board, position, isValid, moves }).find(({ check }) => check)
    return hasCheck ? { ...position, check: true } : position
  }

export const generatePieceMoves = (context) => {
  const {
    constants: { rules },
    position,
    board,
    activeColor,
  } = context

  const validateCheck = buildValidateCheck({ board, isValid: isValidCheck(context) })

  const {
    moves = [],
    steps = [],
    captures = [],
  } = rules[board[position.y][position.x].name](context)

  return [
    ...validate({ board, position, isValid: isValidMove(board, activeColor), moves }).map(
      validateCheck(moves)
    ),
    ...validate({ board, position, isValid: isValidStep(board), moves: steps }).map(
      validateCheck(steps)
    ),
    ...validate({
      board,
      position,
      isValid: isValidCapture(board, activeColor),
      moves: captures,
    }).map(validateCheck(captures)),
  ]
}
