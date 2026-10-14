import type { ChangeEvent } from 'react'
import { useOrderStore } from '@/store/order'
import { useBoolean } from '@/hooks/useBoolean'
import type { OrderProductByIdProps, OrderProductsProps } from '@/types/products'

export type CounterProps =
  | ({
      index?: number
      variant: 'cart'
      count: number
      id?: number
      price?: string
      have_parameter?: boolean
      handleUpdateCount?: (count: number) => void
    } & OrderProductsProps)
  | ({
      index?: number
      variant: 'cart'
      count: number
      id?: number
      price?: string
      have_parameter?: boolean
      handleUpdateCount?: (count: number) => void
    } & OrderProductByIdProps)
  | ({
      index?: number
      count: number
      id?: number
      price?: string
      have_parameter?: boolean
      variant: 'card' | 'detail'
      handleUpdateCount?: (count: number) => void
    } & OrderProductsProps)

export const useCounter = ({ count: defaultCount, handleUpdateCount, ...props }: CounterProps) => {
  const empty = useBoolean()
  const isCardVariant = props.variant === 'card'
  const isDetailVariant = props.variant === 'detail'
  const { cartCount, cartsCard, cartsDetail, setCartsCard, setCartsDetail } = useOrderStore(
    state => ({
      cartsCard: state.cartsCard,
      cartsDetail: state.cartsDetail,
      setCartsCard: state.setCartsCard,
      setCartsDetail: state.setCartsDetail,
      cartCount:
        isDetailVariant || isCardVariant
          ? (state.cartsDetail.find(cart => cart.id === props.id)?.count ??
            state.cartsCard.find(cart => cart.id === props.id)?.count ??
            defaultCount)
          : defaultCount,
    }),
  )

  const count = isDetailVariant ? defaultCount : cartCount

  const handleCount = (type: '+' | '-') => () => {
    if (props.have_parameter && props.variant === 'card') {
      return
    }
    if (isDetailVariant && handleUpdateCount) {
      if (type === '-') {
        if (count > 1) {
          handleUpdateCount(count - 1)
        }
      } else {
        handleUpdateCount(count + 1)
      }
    } else {
      if (props?.have_parameter && props.variant === 'cart') {
        if (type === '+') {
          const newCartsDetail = cartsDetail.map((c, i: number) => {
            if (i === props.index && c.id === props.id) {
              const newCount = c.count + 1
              const totalPrice = c.total * newCount
              return { ...c, count: newCount, totalPrice }
            }
            return c
          })
          setCartsDetail(newCartsDetail)
        } else {
          const newCartsDetail =
            count === 1
              ? cartsDetail.filter((c, i: number) => i !== props.index && c.id !== props.id)
              : cartsDetail.map((c, i: number) => {
                  if (i === props.index && c.id === props.id) {
                    const newCount = c.count - 1
                    const totalPrice = c.total * newCount
                    return { ...c, count: newCount, totalPrice }
                  }
                  return c
                })

          setCartsDetail(newCartsDetail)
        }
      } else {
        if (type === '+') {
          const findProduct = cartsCard.find(p => p.id === props.id)
          const price = findProduct?.sale_type ? findProduct?.discount_price : findProduct?.price
          const product = (
            findProduct?.count && findProduct?.count > 0
              ? {
                  ...findProduct,
                  count: findProduct?.count + 1,
                  totalPrice: (findProduct?.count + 1) * Number(price),
                }
              : {
                  ...props,
                  count: 1,
                  // @ts-ignore
                  totalPrice: props.sale_type ? props.discount_price : props.price,
                }
          ) as OrderProductsProps
          const newCarts = findProduct
            ? cartsCard.map(c => (c.id === findProduct.id ? product : c))
            : [...cartsCard, product]

          setCartsCard(newCarts)
        } else {
          const newCarts =
            count > 1
              ? cartsCard.map(c => {
                  if (c.id === props.id) {
                    const count = c.count - 1
                    const price = c?.sale_type ? c?.discount_price : c?.price

                    const totalPrice = count * Number(price)
                    return { ...c, count, totalPrice }
                  }
                  return c
                })
              : cartsCard.filter(c => c.id !== props.id)

          setCartsCard(newCarts)
        }
      }
    }
  }

  const handleClick = () => {
    if (!props.have_parameter) {
      handleCount('+')()
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      empty.setTrue()
      return
    }

    empty.setFalse()

    const newCount = Number(e.target.value)

    if (isNaN(newCount)) return

    if (isDetailVariant && handleUpdateCount) {
      if (newCount > 0) {
        handleUpdateCount(newCount)
      }
    } else if (props?.have_parameter && props.variant === 'cart') {
      if (newCount === 0) {
        const newCartsDetail = cartsDetail.filter(
          (c, i: number) => i !== props.index && c.id !== props.id,
        )
        setCartsDetail(newCartsDetail)
      } else {
        const newCartsDetail = cartsDetail.map((c, i: number) => {
          if (i === props.index && c.id === props.id) {
            const totalPrice = c.total * newCount
            return { ...c, count: newCount, totalPrice }
          }
          return c
        })
        setCartsDetail(newCartsDetail)
      }
    } else {
      if (newCount === 0) {
        const newCarts = cartsCard.filter(c => c.id !== props.id)
        setCartsCard(newCarts)
      } else {
        const findProduct = cartsCard.find(p => p.id === props.id)
        if (findProduct) {
          const price = findProduct?.sale_type ? findProduct?.discount_price : findProduct?.price
          const newCarts = cartsCard.map(c => {
            if (c.id === props.id) {
              return { ...c, count: newCount, totalPrice: newCount * Number(price) }
            }
            return c
          })
          setCartsCard(newCarts)
        }
      }
    }
  }

  return { count, handleCount, handleClick, handleInputChange, isCardVariant }
}
