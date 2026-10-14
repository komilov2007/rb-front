import { getCurrencyList } from '@/apis/common'
import { useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const useCurrency = () => {
  const { data = { data: [], options: [] }, ...rest } = useQuery({
    queryKey: [REACT_QUERY_KEYS.CURRENCY_LIST],
    queryFn: getCurrencyList,
    select: res => {
      const data = res.data
      const options = data.map(o => ({ label: o.code, value: o.id, description: o.name }))
      return { ...res, data: res.data, options }
    },
  })

  return { ...data, ...rest }
}
