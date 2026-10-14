import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { YandexProps, YandexVerificationProps } from '@/types/yandex'

export const getYandex = async () => {
  const user = getUser()
  return await request<YandexProps>(`v2/robomarket/yandex/${user.shop}`)
}

export const yandexCourier = async <T>(data: T) => {
  return await request.post<YandexVerificationProps>('v2/robomarket/yandex/validate-courier', data)
}
