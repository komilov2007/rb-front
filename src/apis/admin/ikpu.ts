import { getUser } from '@/utils/user'
import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import type {
  IkpuProps,
  IkpuTaxProps,
  PackageProps,
  ExportIkpuProps,
  IkpuOnlineShopProps,
} from '@/types/ikpu'

export const getIkpus = async <T>(params: T) => {
  const user = getUser()
  return await request<List<IkpuProps>>(`v2/product/ikpu/list/${user.shop}`, { params })
}

export const getIkpusOnlineShop = async <T>(params: T) => {
  return await request<List<IkpuOnlineShopProps>>('v3/admin/products/ikpu', { params })
}

export const generateIkpu = async () => {
  const user = getUser()
  return await request.get(`v2/ikpu/generate/${user.shop}`)
}

export const updateIkpu = async <T>(data: T, id: number) =>
  await request.put(`v2/product/${id}/ikpu/update`, data)

export const updateIkpuOnlineShop = async <T>(data: T, id: number) =>
  await request.put(`v3/admin/products/${id}/ikpu-update`, data)

export const getIkpuSeetings = async () => {
  const user = getUser()
  return await request(`v2/product/ikpu/settings/${user.shop}`)
}

export const updateSeetings = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/product/ikpu/settings', {
    ...data,
    shop: user.shop,
  })
}

export const exportIkpu = async () => {
  const user = getUser()
  return await request.post<ExportIkpuProps>(`v2/ikpu/export/${user.shop}`)
}

export const importIkpu = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/ikpu/import/${user.shop}`, data)
}

export const getIkpuTax = async <T>(params: T) => {
  return await request<IkpuTaxProps[]>('v2/ikpu/search', { params })
}

export const getPackage = async (id: string | null) => {
  return await request<PackageProps[]>(`v2/ikpu/package/${id}`)
}
