import { useQuery } from '@tanstack/react-query'
import { getCategoriesList } from '@/apis/admin/category'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const useCategoryList = <T>(params?: T) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await getCategoriesList(params),
    queryKey: [REACT_QUERY_KEYS.CATEGORY_LIST, params],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return { data, isLoading }
}
