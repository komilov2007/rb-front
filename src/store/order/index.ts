import { create } from '@/configs/zustand'
import type { OrderProductsProps, OrderProductByIdProps } from '@/types/products'

interface OrderStateProps {
  total: number
  totalCard: number
  totalDetail: number
  cartsCard: OrderProductsProps[]
  cartsDetail: OrderProductByIdProps[]
  is_debt: boolean | null
  bito_is_debt: boolean
  setCartsCard: (cartsCard: OrderProductsProps[]) => void
  setCartsDetail: (cartsDetail: OrderProductByIdProps[]) => void
  setIsDebt: (is_debt: boolean | null) => void
  setBitoIsDebt: (bito_is_debt: boolean) => void
}

export const useOrderStore = create<OrderStateProps>((set, get) => ({
  total: 0,
  totalCard: 0,
  cartsCard: [],
  totalDetail: 0,
  cartsDetail: [],
  is_debt: null,
  bito_is_debt: false,
  setCartsCard: cartsCard => {
    const totalCard = cartsCard.reduce((prev, next) => prev + Number(next.totalPrice), 0)
    const total = Number(totalCard) + Number(get().totalDetail)
    set({ total, cartsCard, totalCard })
  },
  setCartsDetail: cartsDetail => {
    const totalDetail = cartsDetail.reduce((prev, next) => prev + Number(next.totalPrice), 0)
    const total = Number(totalDetail) + Number(get().totalCard)
    set({ total, cartsDetail, totalDetail })
  },
  setIsDebt: is_debt => {
    set({ is_debt })
  },
  setBitoIsDebt: bito_is_debt => {
    set({ bito_is_debt })
  },
}))
