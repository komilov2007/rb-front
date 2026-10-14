import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { RoboPochtaProps } from '@/types/robo-pochta'

export const getRoboPochta = async () => {
  const user = getUser()
  return await request<RoboPochtaProps>(`v2/tezbor/merchant/${user.shop}`)
}

export const installRoboPochta = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/tezbor/merchant', { shop: user.shop, ...data })
}

export const deleteIntegrationRoboPochta = async () => {
  const user = getUser()
  return await request.delete(`v2/tezbor/merchant/${user.shop}`)
}
