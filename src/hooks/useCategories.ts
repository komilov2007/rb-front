import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/apis/admin/category'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const useCategories = <T>(params?: T) => {
  const {
    data = { data: { count: 0, results: [] }, options: [] },
    isLoading,
    ...rest
  } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.CATEGORY, params],
    queryFn: async () => await getCategories(params),
    select: res => {
      const options = res.data.results.map(c => ({
        value: c.id,
        label: c.name,
      }))
      return { ...res, options }
    },
  })
  const hasCategory = data.data.count > 0

  return { data, isLoading, hasCategory, ...rest }
}
