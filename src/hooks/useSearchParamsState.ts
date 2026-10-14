import { useSearchParams } from 'react-router-dom'

export const useSearchParamsState = (
  searchParamName: string,
  defaultValue: unknown,
): readonly [searchParamsState: string, setSearchParamsState: (newState: unknown) => void] => {
  const [searchParams, setSearchParams] = useSearchParams()

  const acquiredSearchParam = searchParams.get(searchParamName)
  const searchParamsState = acquiredSearchParam ?? String(defaultValue)

  const setSearchParamsState = (newState: unknown) => {
    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce((o, [key, value]) => ({ ...o, [key]: value }), {}),
      { [searchParamName]: String(newState) },
    )
    setSearchParams(next)
  }
  return [searchParamsState, setSearchParamsState]
}
