import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { OnlinePbxProps } from '@/types/pbx'

export const getOnlinePbx = async () => {
  const user = getUser()
  return await request<OnlinePbxProps>(`v2/onlinepbx/${user.shop}`)
}

export const installPbx = async <T>(data: T) => {
  const user = getUser()
  return await request.put(`v2/onlinepbx/${user.shop}`, data)
}
