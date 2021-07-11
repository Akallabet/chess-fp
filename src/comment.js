import { updateState } from './helpers/state'

export const comment =
  () =>
  ({ history = [], current, ...state }) =>
  (comment) => ({
    ...state,
    current,
    history: [
      ...history.slice(0, current),
      {
        ...history[current],
        comment,
      },
    ],
  })

export default updateState(comment)
