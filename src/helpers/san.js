import {
  enrichObject,
  identity,
  ifElse,
  makeObject,
  pipe,
  deplete,
  isTruthy,
  falsy,
} from 'eslambda'

const extractPosition =
  (position) =>
  (key) =>
  ({ notation, ...keys }) => ({
    notation: `${notation.slice(0, position(notation))}${notation.slice(
      position(notation) + 1,
      notation.length
    )}`,
    ...keys,
    [key]: notation[position(notation)],
  })

const extractLast = extractPosition((notation) => notation.length - 1)
const extractChar = (char) => extractPosition((notation) => notation.indexOf(char))

const isCheck = ({ notation }) => notation[notation.length - 1] === '+'
const extractCheck = extractLast('check')
const isCheckMate = ({ notation }) => notation[notation.length - 1] === '#'
const extractCheckMate = extractLast('checkMate')
const isCapture = ({ notation }) => notation.includes('x')
const extractCapture = extractChar('x')('capture')
const isPromotion =
  ({ pieces }) =>
  ({ notation }) =>
    Object.values(pieces).indexOf(notation[notation.length - 1]) !== -1
const extractPromotion = extractLast('promotion')

const getExpressions =
  ({ pieces, files, ranks }) =>
  () =>
    [
      [
        `^[${files.join('')}]{1}[${ranks.join('')}]{1}$`,
        ([file, rank]) => ({
          name: pieces.P,
          y: ranks.indexOf(rank),
          x: files.indexOf(file),
        }),
      ],
      [
        `^[${Object.values(pieces)}]{1}[${files.join('')}]{1}[${ranks.join('')}]{1}$`,
        ([name, file, rank]) => ({
          name,
          y: ranks.indexOf(rank),
          x: files.indexOf(file),
        }),
      ],
      [
        `^[${Object.values(pieces).join('')}]{1}[${files.join('')}]{1}[${ranks.join(
          ''
        )}]{1}[${files.join('')}]{1}[${ranks.join('')}]{1}$`,
        ([name, originFile, originRank, file, rank]) => ({
          name,
          originX: files.indexOf(originFile),
          originY: ranks.indexOf(originRank),
          y: ranks.indexOf(rank),
          x: files.indexOf(file),
        }),
      ],
      [
        `^[${files.join('')}]{1}[${ranks.join('')}]{1}[${files.join('')}]{1}[${ranks.join(
          ''
        )}]{1}$`,
        ([originFile, originRank, file, rank]) => ({
          name: pieces.P,
          originX: files.indexOf(originFile),
          originY: ranks.indexOf(originRank),
          y: ranks.indexOf(rank),
          x: files.indexOf(file),
        }),
      ],
      [
        `^[${Object.values(pieces).join('')}]{1}[${files.join('')}]{1}[${files.join(
          ''
        )}]{1}[${ranks.join('')}]{1}$`,
        ([name, originFile, file, rank]) => ({
          name,
          originX: files.indexOf(originFile),
          y: ranks.indexOf(rank),
          x: files.indexOf(file),
        }),
      ],
      [
        `^[${files.join('')}]{1}[${files.join('')}]{1}[${ranks.join('')}]{1}$`,
        ([originX, file, rank]) => ({
          name: pieces.P,
          originX: files.indexOf(originX),
          y: ranks.indexOf(rank),
          x: files.indexOf(file),
        }),
      ],
      [
        `^0-0$`,
        () => ({
          name: pieces.K,
          isCastling: true,
          isKingside: true,
          isQueenside: false,
        }),
      ],
      [
        `^0-0-0$`,
        () => ({
          name: pieces.K,
          isCastling: true,
          isKingside: false,
          isQueenside: true,
        }),
      ],
    ]

const isMatchingNotation =
  ({ notation }) =>
  ([expression]) =>
    new RegExp(expression, 'g').test(notation)

const processNotation = ({ match: [, expression], notation, ...args }) => ({
  ...expression(notation),
  ...args,
})

const findMatchingNotation = ({ expressions, notation }) =>
  expressions.find(isMatchingNotation({ notation }))

export const fromSAN = (context) =>
  pipe(
    makeObject('notation'),
    enrichObject(getExpressions(context), 'expressions'),
    ifElse(isCheck, extractCheck, identity),
    ifElse(isCheckMate, extractCheckMate, identity),
    ifElse(isCapture, extractCapture, identity),
    ifElse(isPromotion(context), extractPromotion, identity),
    enrichObject(findMatchingNotation, 'match'),
    deplete('expressions'),
    ifElse(({ match }) => isTruthy(match), processNotation, falsy)
  )
