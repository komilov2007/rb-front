import { useMemo } from 'react'
import { useDebounce } from './useDebounce'
import { useSearchParams } from 'react-router-dom'
import { getPaginationOffset } from '@/utils/pagination'
import { useSearchParamsState } from './useSearchParamsState'

export const usePagination = () => {
  const [searchValue] = useSearchParamsState('search', '')
  const search = useDebounce(searchValue)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 10

  const handleSearch = (e: string) => {
    setSearchParams(searchParams => {
      searchParams.set('page', '1')
      searchParams.set('limit', '10')
      searchParams.set('search', e)
      return searchParams
    })
  }

  const handlePage = (page: number) => {
    setSearchParams(searchParams => {
      searchParams.set('page', String(page))
      return searchParams
    })
  }

  const handleLimit = (perPage: number) => {
    setSearchParams(searchParams => {
      searchParams.set('page', String(1))
      searchParams.set('limit', String(perPage))
      return searchParams
    })
  }

  const params = useMemo(
    () => ({
      limit,
      search,
      offset: getPaginationOffset({ page, limit }),
    }),
    [limit, page, search],
  )

  return { page, limit, search, params, searchValue, handlePage, handleLimit, handleSearch }
}
