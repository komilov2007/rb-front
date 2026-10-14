import { type AxiosResponse } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { type AtmosphereProps } from '@/types/atmosphere'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const reorder = <T extends { id: number }>(list: T[], from: number, to: number) => {
  const newList = Array.from(list)
  const [moved] = newList.splice(from, 1)
  newList.splice(to, 0, moved)

  // The API places the moved item right above `above`; null sends it to the bottom.
  return { newList, moved, above: newList[to + 1]?.id ?? null }
}

export const useAtmosphereCache = () => {
  const queryClient = useQueryClient()

  const update = (fn: (data: AtmosphereProps) => AtmosphereProps) => {
    queryClient.setQueryData<AxiosResponse<AtmosphereProps>>([REACT_QUERY_KEYS.ATMOSPHERE], res =>
      res ? { ...res, data: fn(res.data) } : res,
    )
  }

  const invalidate = async () => {
    await queryClient.invalidateQueries([REACT_QUERY_KEYS.ATMOSPHERE])
  }

  return { update, invalidate }
}
