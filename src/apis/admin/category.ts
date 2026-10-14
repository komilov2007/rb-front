import { getUser } from '@/utils/user'
import type { List } from '@/types/list'
import { request } from '@/configs/requests'
import type { PositionCategoryProps } from '@/types/position'
import type {
  CategoryProps,
  CategoryListProps,
  CategoryDetailProps,
  CategoryOnlineShopProps,
  CategoryMainOnlineShopProps,
  CategoryOnlineShopDetailProps,
  ResCreateCategoryOnlineShop,
  CategoryCatalogOnlineShopProps,
} from '@/types/category'

export const getCategories = async <T>(params: T) => {
  const user = getUser()
  return await request<List<CategoryProps>>(`v2/category/list/${user.shop}`, {
    params,
  })
}

export const getAllCategories = async <T>(params: T) => {
  const user = getUser()
  return await request<CategoryProps[]>(`v2/category/list/${user.shop}`, {
    params,
  })
}

export const updateCategory = async <T>(data: T, id: string) =>
  await request.put(`v2/category/${id}/update`, data)

export const deleteCategory = async (id: number, delete_products: boolean) =>
  await request.delete(`v2/category/${id}/delete?delete_products=${delete_products}`)

export const createCategory = async <T>(data: T) => await request.post('v2/category/create', data)

export const createOrUpdateCategory = async <T>(data: T) =>
  await request.post('v2/category/update-or-create', data)

export const positionCategory = async (data: PositionCategoryProps) =>
  await request.post(`v2/category/${data.id}/change/position`, {
    above_category: data.above_category,
  })

export const getCategoryDetail = async (id?: number) => {
  return await request<CategoryDetailProps>(`v2/category/${id}/detail`)
}

export const getStepCategoryDetail = async () => {
  const user = getUser()
  return await request<CategoryDetailProps>(`v2/category/detail/${user.shop}`)
}

export const getCategoriesList = async <T>(params?: T) => {
  const user = getUser()
  return await request<CategoryListProps[]>(`v2/category/list/select/${user.shop}`, { params })
}

export const getCategoriesCatalogList = async (shop: string) => {
  return await request<CategoryCatalogOnlineShopProps[]>(`v3/categories/catalog/${shop}`)
}

export const createCategoryOnlineShop = async <T>(data: T) =>
  await request.post<ResCreateCategoryOnlineShop>('v3/admin/categories', data)

export const getCategoriesMainOnlineShop = async () => {
  return await request<CategoryMainOnlineShopProps[]>('v3/admin/main/categories')
}

export const getCategoriesOnlineShop = async <T>(params: T) => {
  return await request<List<CategoryOnlineShopProps>>('v3/admin/category/list', { params })
}

export const deleteCategoryOnlineShop = async (id: number, delete_products: boolean) =>
  await request.delete(`v3/admin/categories/${id}?delete_products=${delete_products}`)

export const positionCategoryOnlineShop = async (data: PositionCategoryProps) =>
  await request.put(`v3/admin/categories/position/${data.id}`, {
    above_category_id: data.above_category,
  })

export const getCategoryOnlineShopDetail = async (id: string) => {
  return await request<CategoryOnlineShopDetailProps>(`v3/admin/categories/${id}`)
}

export const getCategoryOnlineShopSingle = async () => {
  return await request<CategoryOnlineShopDetailProps>('v3/admin/single-category')
}

export const updateCategoryOnlineShop = async <T>(data: T, id: string) =>
  await request.put<ResCreateCategoryOnlineShop | CategoryProps>(`v3/admin/categories/${id}`, data)
