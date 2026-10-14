import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'

export const getUzumMarketToken = async () => {
  const user = getUser()
  return await request(`v2/robomarket/uzum-market/${user.shop}`)
}

export const installUzumMarket = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/uzum-market/${user.shop}`, data)
}
