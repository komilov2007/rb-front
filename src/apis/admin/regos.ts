import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import { type RegosCredsProps } from '@/types/regos'
import { type YesPosBranchesProps } from '@/types/yes-pos'

export const getRegosCreds = async () => {
  const user = getUser()
  return await request<RegosCredsProps>(`v2/robomarket/regos/creds/${user.shop}`)
}

export const postRegos = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/regos/creds/${user.shop}`, data)
}

export const importRegos = async () => {
  const user = getUser()
  return await request.post(`v3/products/regos/${user.shop}/import-catalog`)
}

export const getPriceTypesRegos = async <T>(data: T) => {
  return await request.post<YesPosBranchesProps[]>('v2/robomarket/regos/price-types', data)
}

export const getWarehouseRegos = async <T>(data: T) => {
  return await request.post<YesPosBranchesProps[]>('v2/robomarket/regos/warehouses', data)
}
