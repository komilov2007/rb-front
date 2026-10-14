import { getUser } from '@/utils/user'
import type { List } from '@/types/list'
import { request } from '@/configs/requests'
import type { OrderProductsProps, OrderProductByIdProps } from '@/types/products'
import type {
  OrderListProps,
  OrderDetailProps,
  OrderCategoryProps,
  OrderUserInfoProps,
  OrderDeliveryPrice,
  OrderFormDetailProps,
  OrderStatusCountProps,
  OrderAutoResponderProps,
} from '@/types/order'

export const getOrderStatusCount = async () => {
  const user = getUser()
  return await request<OrderStatusCountProps>(`v2/order/status/count/${user.shop}`)
}

export const getOrderByStatus = async <T>(params: T) => {
  const user = getUser()
  return await request<List<OrderListProps>>(`v2/order/list/${user.shop}`, { params })
}

export const getOrderHistory = async <T>(params: T) => {
  const user = getUser()
  return await request<List<OrderListProps>>(`v2/order/history/${user.shop}`, { params })
}

export const changeOrderStatus = async <T>(data: T, id: number) =>
  await request.put(`v2/order/${id}/update/status`, data)

export const getAutoResponder = async () => {
  const user = getUser()
  return await request<OrderAutoResponderProps>(`v2/order/settings/${user.shop}`)
}

export const updateLateTime = async <T>(data: T) => {
  const user = getUser()
  return await request.put(`v2/order/settings/${user.shop}`, data)
}

export const changeAutoResponder = async <T>(data: T) => {
  const user = getUser()
  return await request.put(`v2/order/settings/${user.shop}`, data)
}

export const exportOrder = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/order/export/${user.shop}`, data)
}

export const getOrderDetail = async <T>(id: T) =>
  await request<OrderDetailProps>(`v2/order/${id}/detail`)

export const getOrderCategories = async () => {
  const user = getUser()
  return await request<OrderCategoryProps[]>(`v2/order/category/list/${user.shop}`)
}

export const getOrderProducts = async <T>(category: string, params: T) => {
  const user = getUser()

  if (category === 'all') {
    return await request<List<OrderProductsProps>>(`v2/order/product/list/${user.shop}`, { params })
  }
  return await request<List<OrderProductsProps>>(`v2/order/product/list/${user.shop}/${category}`, {
    params,
  })
}

export const getOrderProductById = async (id: number) => {
  return await request<OrderProductByIdProps>(`v2/webapp/product/${id}/detail`)
}

export const getOrderFormDetail = async () => {
  const user = getUser()
  return await request<OrderFormDetailProps>(`v2/order/form/get/${user.shop}`)
}

export const checkUserForOrder = async <T>(params: T) => {
  const user = getUser()
  return await request<OrderUserInfoProps | ''>(`v2/customer/order/check/user/${user.shop}`, {
    params,
  })
}

export const getDeliveryPrice = async <T>(params: T) => {
  const user = getUser()
  return await request<OrderDeliveryPrice>(`v2/order/calculate/delivery/${user.shop}`, { params })
}

export const createOrder = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/order/create', { shop: user.shop, ...data })
}

export const exportOrderPdf = async (params: {
  export_type: 'by_orders' | 'by_products'
  file_type: 'pdf' | 'excel'
  status?: string
  product_id?: string
  from_date?: string
  to_date?: string
}) => {
  const user = getUser()
  return await request<Blob>(`v2/order/export-pdf/${user.shop}`, {
    params,
    responseType: 'blob',
  })
}
