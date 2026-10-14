import { type YandexMapProps } from '@/types/map'
import { request, requestYandex } from '@/configs/requests'

export const getAddresses = async <T>(params: T) =>
  await request<YandexMapProps>('v2/yandex/search', { params })

export const getYandexMapCheckKey = async <T>(params: T) => await requestYandex({ params })
