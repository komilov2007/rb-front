import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { BtsProps, BtsListProps } from '@/types/bts'

export const getBts = async () => {
  const user = getUser()
  return await request<BtsProps>(`v2/bts/merchant/${user.shop}`)
}

export const installBts = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/bts/merchant', { shop: user.shop, ...data })
}

export const deleteIntegrationBTS = async () => {
  const user = getUser()
  return await request.delete(`v2/bts/merchant/${user.shop}`)
}

export const createOrder = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/bts/create', { ...data, shop: user.shop })
}

export const getRegions = async () => await request<BtsListProps[]>('v2/bts/regions')

export const getPostTypes = async () => await request<BtsListProps[]>('v2/bts/post-types')

export const getPackages = async () => await request<BtsListProps[]>('v2/bts/packages')

export const getDistricts = async <T>(params: T) =>
  await request<BtsListProps[]>('v2/bts/districts', { params })
