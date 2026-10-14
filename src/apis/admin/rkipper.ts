import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { RkipperProps } from '@/types/rkipper'

export const getRkipper = async () => {
  const user = getUser()
  return await request<RkipperProps>(`v2/robomarket/rkipper/${user.shop}`)
}

export const installRkipper = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/rkipper/${user.shop}`, data)
}
