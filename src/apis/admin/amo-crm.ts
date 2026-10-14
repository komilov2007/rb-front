import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { AmoCRMProps } from '@/types/amo-crm'

export const getAmoCRM = async () => {
  const user = getUser()
  return await request<AmoCRMProps>(`v2/robomarket/amocrm/${user.shop}`)
}

export const installAmoCRM = async <T>(data: T) => {
  const user = getUser()
  return await request.post<AmoCRMProps[]>(`v2/robomarket/amocrm/${user.shop}`, data)
}
