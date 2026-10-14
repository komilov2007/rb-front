import { useState } from 'react'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import { getOrderProducts } from '@/apis/admin/order'
import { getPaginationOffset } from '@/utils/pagination'
import { type OrderProductsProps } from '@/types/products'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export interface ProductsProps {
  search: string
  category: string
}

const LIMIT = 10

export const useProducts = (props: ProductsProps) => {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const { value, setTrue, setFalse } = useBoolean(true)
  const [data, setData] = useState<OrderProductsProps[]>([])
  const products = useQuery({
    queryFn: async () => {
      return await getOrderProducts(props.category, {
        limit: LIMIT,
        search: props.search,
        offset: getPaginationOffset({ page, limit: LIMIT }),
      })
    },
    queryKey: [REACT_QUERY_KEYS.ORDER_PRODUCT_LIST, props.category, props.search, page],
    onSuccess: res => {
      const oldProducts = props.search === '' ? data : []
      const newData = [...oldProducts, ...res.data.results]
      let currentCategory: number | null = null
      let currentCategoryLength = 0
      const results = newData.map((product, index) => {
        const isNewCategory = currentCategory !== product.category?.id
        const isLastProduct =
          index === newData.length - 1 || newData[index + 1].category?.id !== product.category?.id

        if (isNewCategory || isLastProduct) {
          currentCategory = product.category?.id
        }
        if (isNewCategory) {
          currentCategoryLength = 1
        } else {
          currentCategoryLength++
        }

        return {
          ...product,
          isLast: isLastProduct,
          isFirst: isNewCategory,
          index: isLastProduct ? currentCategoryLength % 3 : 0,
        }
      })

      setData(results)
      setTotal(res.data.count)
      if (res.data.count === newData.length) {
        setFalse()
      }
    },
  })

  const handleNext = () => {
    if (!products.isFetching && !products.isLoading) {
      if (total > data.length) {
        setPage(page + 1)
      } else {
        setFalse()
      }
    }
  }

  const handleReset = () => {
    setData([])
    setTrue()
    setTotal(0)
    setPage(1)
  }

  return { data, value, handleNext, handleReset }
}
