import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { IikoResBranchProps, OrganizationsProps } from '@/types/iiko'

export const uploadIiko = async () => {
  const user = getUser()
  return await request.post(`v2/robomarket/iiko/${user.shop}`)
}

export const sendToken = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/iiko/save-integration/${user.shop}`, data)
}

export const getIikoToken = async () => {
  const user = getUser()
  return await request<IikoResBranchProps>(`v2/robomarket/iiko/${user.shop}`)
}

export const getIikoOrganizations = async <T>(data: T) => {
  return await request.post<OrganizationsProps[]>('v2/robomarket/iiko/organizations', data)
}

export const getIikoTerminals = async <T>(data: T) => {
  return await request.post<OrganizationsProps[]>('v2/robomarket/iiko/terminals', data)
}

export const deleteIiko = async () => {
  const user = getUser()
  return await request.delete(`v2/robomarket/integration/delete/${user.shop}/iiko`)
}
