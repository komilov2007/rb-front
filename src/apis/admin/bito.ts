import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import { type OrganizationsProps, type PriceTypeProps } from '@/types/bito'

export const getBitoToken = async () => {
  const user = getUser()
  return await request(`v2/robomarket/bito/${user.shop}`)
}

export const getBitoPriceTypes = async <T>(data: T) => {
  return await request.post<PriceTypeProps[]>('v2/robomarket/bito/price-type', data)
}

export const getBitoOrganization = async <T>(data: T) => {
  const user = getUser()
  return await request.post<OrganizationsProps[]>(
    `v2/robomarket/bito/organization/${user.shop}`,
    data,
  )
}

export const getBitoEmployees = async <T>(data: T) => {
  return await request.post<Array<{ id: string; name: string }>>(
    'v2/robomarket/bito/employees',
    data,
  )
}

export const installBito = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/bito/${user.shop}`, data)
}

export const importBito = async () => {
  const user = getUser()
  return await request.post(`v2/robomarket/bito/import/${user.shop}`)
}
