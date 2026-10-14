import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { Select } from '@/components/selects/select'
import { type SchemaTypeProductsIdsOnlineShop } from '@/utils/schema'
import { getOnlineShopProductsByDiscount } from '@/apis/admin/product'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

interface SelectProductsProps {
  discount_id?: number | undefined
}

export const SelectProducts = ({ discount_id }: SelectProductsProps) => {
  const form = useFormContext<SchemaTypeProductsIdsOnlineShop>()
  const { data = { data: { results: [] } }, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.PRODUCT_LIST_DISCOUNT_ONLINE_SHOP, discount_id],
    queryFn: async () => await getOnlineShopProductsByDiscount(discount_id ? { discount_id } : ''),
    select: res => {
      const results = res.data.map(p => ({ label: p.title, value: p.id }))
      return { ...res, data: { ...res.data, results } }
    },
  })

  return (
    <Select
      multiple
      name='product_ids'
      label='products'
      loading={isLoading}
      control={form.control}
      options={data.data.results}
      placeholder='select_products'
    />
  )
}
