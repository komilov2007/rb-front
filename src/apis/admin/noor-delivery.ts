import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'

export const getNoorDeliveryToken = async () => {
  const user = getUser()
  return await request(`v2/robomarket/noor/delivery/${user.shop}`)
}

export const installNoorDelivery = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/noor/delivery/${user.shop}`, data)
}
