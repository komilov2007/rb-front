import { create } from '@/configs/zustand'

interface FormStateProps {
  productStockBoolean: boolean
  setProductStockBoolean: (productStockBoolean: boolean) => () => void
}

export const useFormStore = create<FormStateProps>(set => ({
  productStockBoolean: false,
  setProductStockBoolean: productStockBoolean => () => {
    set({ productStockBoolean })
  },
}))
