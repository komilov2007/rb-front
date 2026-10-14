import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { YandexMarketProps } from '@/types/yandex-market'

export const getYandexMarket = async () => {
  const user = getUser()
  return await request<YandexMarketProps>(`v2/robomarket/yandex/market/${user.shop}`)
}

export const installYandexMarket = async <T>(data: T) => {
  const user = getUser()
  return await request.post<YandexMarketProps[]>(`v2/robomarket/yandex/market/${user.shop}`, data)
}
