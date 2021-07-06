import { updateState } from './helpers/state'

export const redo =
  () =>
  ({ current, history, ...state }) =>
  () => ({
    ...state,
    history,
    current: current < history.length - 1 ? current + 1 : current,
  })

export default updateState(redo)
