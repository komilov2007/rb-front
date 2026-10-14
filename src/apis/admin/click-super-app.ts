import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { ClickSuperAppProps } from '@/types/click-super-app'

export const getClickSuperApp = async () => {
  const user = getUser()
  return await request<ClickSuperAppProps>(`v2/robomarket/click/superapp/${user.shop}`)
}

export const installClickSuperApp = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/click/superapp/${user.shop}`, data)
}
