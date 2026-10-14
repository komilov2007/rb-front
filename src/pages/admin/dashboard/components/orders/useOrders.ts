import { useQuery } from '@tanstack/react-query'
import { useProfileStore } from '@/store/profile'
import { getOrderStatus } from '@/apis/admin/dashboard'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const useOrders = (params: { from: string; to: string }) => {
  const { is_free, is_basic, is_expired } = useProfileStore(state => ({
    is_free: state.me?.subscription.is_free,
    is_basic: state.me?.subscription.is_basic,
    is_expired: state.me?.subscription.is_expired,
  }))

  const hasAccess = (is_basic || is_expired) && !is_free

  const { data = { series: [], data: [] }, isLoading } = useQuery({
    enabled: !hasAccess,
    keepPreviousData: true,
    queryFn: async () => await getOrderStatus(params),
    queryKey: [REACT_QUERY_KEYS.DASHBOARD_ORDER_STATUS, params, params.from, params.to],
    select: res => {
      const series = Object.values(res.data).reduce(
        (prev, next) => {
          const values = prev.map(v => {
            if (v.name === 'new') {
              return { ...v, data: [...v.data, next?.new ?? 0] }
            }
            if (v.name === 'cancelled') {
              return { ...v, data: [...v.data, next?.cancel ?? 0] }
            }
            if (v.name === 'completed') {
              return { ...v, data: [...v.data, next?.completed ?? 0] }
            }
            return v
          })
          return values
        },
        [
          {
            name: 'new',
            data: [] as number[],
          },
          {
            name: 'cancelled',
            data: [] as number[],
          },
          {
            name: 'completed',
            data: [] as number[],
          },
        ],
      )
      return { ...res, series }
    },
  })

  return { data, isLoading, hasAccess }
}
