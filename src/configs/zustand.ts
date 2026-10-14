import { create as _create, type StoreApi, type UseBoundStore, type StateCreator } from 'zustand'

const resetters: Array<() => void> = []

export const create = <TState>(
  createState: StateCreator<TState> | StoreApi<TState>,
): UseBoundStore<StoreApi<TState>> => {
  const slice: UseBoundStore<StoreApi<TState>> = _create(createState as never)
  const initialState = slice.getState()
  resetters.push(() => {
    slice.setState(initialState, true)
  })

  return slice
}

export const resetAllSlices = () => {
  for (const resetter of resetters) {
    resetter()
  }
}
