import { getUser } from '@/utils/user'
import type { List } from '@/types/list'
import { request } from '@/configs/requests'
import type {
  CourierProps,
  RoleListProps,
  MenuRoleProps,
  RoleDetailProps,
  EmployeeListProps,
  EmployeeDetailProps,
} from '@/types/role'

export const getRoles = async <T>(params: T) => {
  const user = getUser()
  return await request<List<RoleListProps>>(`v2/role/list/${user.shop}`, { params })
}

export const getMenuList = async () => await request<MenuRoleProps>('v2/role/menu/list')

export const createRole = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/role/create', { ...data, shop: user.shop })
}

export const updateRole = async <T>(data: T, id: string) => {
  return await request.put(`v2/role/${id}/update`, data)
}

export const updateRoleStatus = async (id: number) =>
  await request.post(`v2/role/${id}/update/status`)

export const deleteRole = async (id: number) => await request.delete(`v2/role/${id}/delete`)

export const getDetailRole = async (id: number) =>
  await request<RoleDetailProps>(`v2/role/${id}/detail`)

export const getEmployees = async <T>(params: T) => {
  const user = getUser()
  return await request<List<EmployeeListProps>>(`v2/role/employee/list/${user.shop}`, { params })
}

export const updateEmployeeStatus = async (id: number) =>
  await request.post(`v2/role/employee/${id}/update/status`)

export const deleteEmployee = async (id: number) =>
  await request.delete(`v2/role/employee/${id}/delete`)

export const createEmployee = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/role/employee/create', { ...data, shop: user.shop })
}

export const updateEmployee = async <T>(data: T, id: string) => {
  return await request.put(`v2/role/employee/${id}/update`, data)
}

export const getDetailEmployee = async (id: number) =>
  await request<EmployeeDetailProps>(`v2/role/employee/${id}/detail`)

export const getCourier = async <T>(params: T) => {
  const user = getUser()
  return await request<List<CourierProps>>(`v2/courier/${user.shop}`, { params })
}

export const createCourier = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/courier/${user.shop}`, data)
}

export const updateCourier = async <T>(data: T, id: number) => {
  return await request.put(`v2/courier/${id}/detail`, data)
}

export const deleteCourier = async (id: number) => await request.delete(`v2/courier/${id}/detail`)

export const getEmployeeReport = async (id: number) =>
  await request<Blob>(`v2/role/employee/${id}/report`, { responseType: 'blob' })
