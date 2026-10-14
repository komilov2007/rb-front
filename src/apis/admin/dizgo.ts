import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { DizgoProps } from '@/types/dizgo'

export const getDizgo = async () => {
  const user = getUser()
  return await request<DizgoProps>(`v2/robomarket/dizgo/creds/${user.shop}`)
}

export const installDizgo = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/dizgo/creds/${user.shop}`, data)
}

export const uploadDizgo = async () => {
  const user = getUser()
  return await request.post(`v3/products/dizgo/${user.shop}/import-catalog`)
}
