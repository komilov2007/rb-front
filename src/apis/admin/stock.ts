import { getUser } from '@/utils/user'
import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import type {
  StockProps,
  StockStatusProps,
  StockOnlineShopProps,
  StockOnlineShopMetrics,
  StockOnlineShopHistory,
} from '@/types/stock'

export const getStocks = async <T>(params: T) => {
  const user = getUser()
  return await request<List<StockProps>>(`v2/stock/list/${user.shop}`, { params })
}

export const updateProductStock = async <T>(data: T, id: number) =>
  await request.put(`v2/stock/product/${id}/update`, data)

export const updateParameter = async <T>(data: T, id: number) =>
  await request.put(`v2/stock/parameter/${id}/update`, data)

export const updateAdditionalParameter = async <T>(data: T, id: number) =>
  await request.put<StockStatusProps>(`v2/stock/a-p/${id}/update`, data)

export const getStocksOnlineShop = async <T>(params: T) => {
  return await request<List<StockOnlineShopProps>>('v3/products/stock/list', { params })
}

export const getStockOnlineShopMetrics = async (id: string) => {
  return await request<StockOnlineShopMetrics>(`v3/orders/product/${id}/metrics`)
}

export const getStockOnlineShopHistory = async <T>(id: string, params: T) => {
  return await request<StockOnlineShopHistory[]>(`v3/orders/product/${id}/history`, {
    params,
  })
}

export const updateProductStockOnlineShop = async <T>(data: T, id: string) =>
  await request.put(`v3/products/stock/${id}`, data)
