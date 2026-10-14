import { getUser } from '@/utils/user'
import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import { type CustomerOrdersProps, type DetailCustomerProps } from '@/types/customer'

export const getCustomers = async <T>(params: T) => {
  const user = getUser()
  return await request(`v2/customer/list/${user.shop}`, { params })
}

export const getDetailCustomer = async (id: string) =>
  await request<DetailCustomerProps>(`v2/customer/${id}/detail`)

export const getCustomerOrders = async <T>(id: unknown, params: T) =>
  await request<List<CustomerOrdersProps>>(`v2/customer/${id}/orders`, { params })
