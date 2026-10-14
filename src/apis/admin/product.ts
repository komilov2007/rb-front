import { getUser } from '@/utils/user'
import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import type { PositionProductProps } from '@/types/position'
import {
  type ProfitProductProps,
  type ProductListOnlineShopProps,
  type ProfitProductDetailProps,
} from '@/types/product-online-shop'
import type {
  ProductListProps,
  ProductListDiscountProps,
  ProductListDiscountOnlineShopProps,
} from '@/types/products'

export const getProducts = async <T>(params: T, categoryId?: string | null | number) => {
  const user = getUser()
  if (categoryId) {
    return await request<List<ProductListProps>>(`v2/product/list/${user.shop}/${categoryId}`, {
      params,
    })
  }
  return await request<List<ProductListProps>>(`v2/product/list/${user.shop}`, { params })
}

export const getProductsByDiscount = async <T>(params: T) => {
  const user = getUser()
  return await request<ProductListDiscountProps[]>(`v2/discount/product/list/${user.shop}`, {
    params,
  })
}

export const getOnlineShopProductsByDiscount = async <T>(params: T) => {
  return await request<ProductListDiscountOnlineShopProps[]>(
    'v3/admin/product-discounts/products/select',
    {
      params,
    },
  )
}

export const positionProductOnlineShop = async (data: PositionProductProps) => {
  await request.put(`v3/admin/products/${data.id}/position`, {
    above_product_id: data.above_product,
  })
}

export const updateProduct = async <T>(data: T, id: string) => {
  return await request.put<ProductListProps>(`v2/product/${id}/update`, data)
}

export const updateProductStatus = async (id: number | string) =>
  await request.post(`v2/product/${id}/update/status`)

export const deleteProduct = async (id: number) => await request.delete(`v2/product/${id}/delete`)

export const createProduct = async <T>(data: T) => {
  return await request.post<ProductListProps>('v2/product/create', data)
}

export const createOrUpdateProduct = async <T>(data: T) =>
  await request.post('v2/product/create-or-update', data)

export const getDetailProduct = async (id: number) => await request(`v2/product/${id}/detail`)

export const positionProduct = async (data: PositionProductProps) =>
  await request.post(`v2/product/${data.id}/change/position`, { above_product: data.above_product })

export const getProductSignUp = async () => {
  const user = getUser()
  return await request(`v2/product/detail/${user.shop}`)
}

export const getProductsOnlineShop = async <T>(params: T) => {
  return await request<List<ProductListOnlineShopProps>>('v3/admin/products', {
    params,
  })
}

export const createProductsOnlineShop = async <T>(data: T) => {
  return await request.post('v3/admin/products', data)
}

export const updateProductsOnlineShop = async <T>(data: T, id: string) => {
  return await request.put(`v3/admin/products/${id}`, data)
}

export const deleteProductOnlineShop = async (id: string) =>
  await request.delete(`v3/admin/products/${id}`)

export const profitProduct = async <T>(data: T) => {
  return await request.post<ProfitProductProps>('v3/products/profit-metrics', data)
}

export const updateProductOnlineShopStatus = async (id: number | string) =>
  await request.patch(`v3/admin/products/${id}/status`)

export const getDetailProductOnlineShop = async (id?: string) => {
  return await request<ProfitProductDetailProps>(`v3/products/detail/${id}`)
}

export const getProductOnlineShopSingle = async () => {
  return await request<ProfitProductDetailProps>('v3/admin/single-product')
}

export const generateProductDescription = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/product/generate/description/${user.shop}`, data)
}

export const productsExcel = async <T>(data: T) => {
  return await request.post('v3/products/import/excel', data)
}
