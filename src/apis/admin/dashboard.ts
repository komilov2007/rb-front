import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import {
  type MapProps,
  type ClientsProps,
  type PlatformProps,
  type OrderStatusProps,
  type TopProductsProps,
  type EarningGraphProps,
  type TrafficSourceProps,
} from '@/types/dashboard'

export const getClients = async <T>(params: T) => {
  const user = getUser()
  return await request<ClientsProps[]>(`v2/dashboard/top-clients/${user.shop}`, { params })
}

export const getTotals = async <T>(params: T, general: string) => {
  const user = getUser()
  return await request(`v2/dashboard/general/${general}/${user.shop}`, { params })
}

export const getPlatform = async <T>(params: T) => {
  const user = getUser()
  return await request<PlatformProps>(`v2/dashboard/platform/${user.shop}`, { params })
}

export const getTrafficSource = async <T>(params: T) => {
  const user = getUser()
  return await request<TrafficSourceProps>(`v2/dashboard/sources/${user.shop}`, { params })
}

export const getTopProducts = async <T>(params: T) => {
  const user = getUser()
  return await request<TopProductsProps>(`v2/dashboard/top-products/${user.shop}`, {
    params,
  })
}

export const getMap = async <T>(params: T) => {
  const user = getUser()
  return await request<MapProps>(`v2/dashboard/map/${user.shop}`, { params })
}

export const getEarningGraph = async <T>(params: T) => {
  const user = getUser()
  return await request<EarningGraphProps>(`v2/dashboard/earning-graph/${user.shop}`, { params })
}

export const getOrderStatus = async <T>(params: T) => {
  const user = getUser()
  return await request<OrderStatusProps>(`v2/dashboard/order-status/${user.shop}`, { params })
}
