import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { Select } from '@/components/selects/select'
import { type SchemaTypeProductsIds } from '@/utils/schema'
import { getProductsByDiscount } from '@/apis/admin/product'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

interface SelectProductsProps {
  discount_id?: number
}

export const SelectProducts = ({ discount_id }: SelectProductsProps) => {
  const form = useFormContext<SchemaTypeProductsIds>()
  const { data = { data: { results: [] } }, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.PRODUCT_LIST_DISCOUNT, discount_id],
    queryFn: async () => await getProductsByDiscount({ discount_id }),
    select: res => {
      const results = res.data.map(p => ({ label: p.name, value: p.id }))
      return { ...res, data: { ...res.data, results } }
    },
  })

  return (
    <Select
      multiple
      name='products'
      label='products'
      loading={isLoading}
      control={form.control}
      options={data.data.results}
      placeholder='select_products'
    />
  )
}
