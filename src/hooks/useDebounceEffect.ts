import { useEffect, type DependencyList } from 'react'

export function useDebounceEffect(fn: () => void, waitTime: number, deps?: DependencyList) {
  useEffect(() => {
    const t = setTimeout(() => {
      //  @ts-ignore
      // eslint-disable-next-line prefer-spread
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
