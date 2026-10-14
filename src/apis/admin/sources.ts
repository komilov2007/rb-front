import { getUser } from '@/utils/user'
import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import { type SourcesProps } from '@/types/sources'

export const getSources = async <T>(params: T) => {
  const user = getUser()
  return await request<List<SourcesProps>>(`v2/source/list/${user.shop}`, { params })
}

export const createSource = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/source/create', { ...data, shop: user.shop })
}

export const deleteSource = async (id: number) => await request.delete(`v2/source/${id}/delete`)
