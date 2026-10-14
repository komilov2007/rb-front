import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { YandexDeliveryProps } from '@/types/yandex-delivery'

export const getYandexDelivery = async () => {
  const user = getUser()
  return await request<YandexDeliveryProps>(`v2/robomarket/yandex/delivery/${user.shop}`)
}

export const installYandexDelivery = async <T>(data: T) => {
  const user = getUser()
  return await request.post<YandexDeliveryProps[]>(
    `v2/robomarket/yandex/delivery/${user.shop}`,
    data,
  )
}
