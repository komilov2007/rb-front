import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import { type MeasureProps } from '@/types/measure'

export const getMeasures = async () => {
  const user = getUser()
  return await request<MeasureProps[]>(`v3/products/measure/${user.shop}`)
}
