import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { YesPosBranchesProps, YesPosProps } from '@/types/yes-pos'

export const getYesPos = async () => {
  const user = getUser()
  return await request<YesPosProps>(`v2/robomarket/yes-pos/creds/${user.shop}`)
}

export const postYesPos = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/yes-pos/creds/${user.shop}`, data)
}

export const getYesPosBranches = async <T>(data: T) => {
  return await request.post<YesPosBranchesProps[]>('v2/robomarket/yes-pos/branches', data)
}

export const importYesPos = async () => {
  const user = getUser()
  return await request.post(`v3/products/yespos/${user.shop}/import-catalog`)
}
