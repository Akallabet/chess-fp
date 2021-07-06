import { rules as defaultRules } from './rules'

export const defaultColors = { w: 'w', b: 'b' }
export const defaultFiles = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const defaultRanks = ['8', '7', '6', '5', '4', '3', '2', '1']

export const defaultNames = {
  P: 'P',
  N: 'N',
  B: 'B',
  R: 'R',
  Q: 'Q',
  K: 'K',
}

export const defaultHeaders = ['Event', 'Site', 'Date', 'Round', 'Result', 'White', 'Black']

export const addConstants = ({
  pieces = defaultNames,
  COLORS = defaultColors,
  files = defaultFiles,
  ranks = defaultRanks,
  NAMES = defaultNames,
  rules = defaultRules,
  HEADERS = defaultHeaders,
}) => ({
  pieces,
  COLORS,
  files,
  ranks,
  NAMES,
  rules,
  HEADERS,
})
