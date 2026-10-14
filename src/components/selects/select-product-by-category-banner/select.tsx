import { Select } from '../select/select'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { getProducts } from '@/apis/admin/product'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type SchemaTypeProductByCategoryBanner } from '@/utils/schema'

export const SelectProductByCategoryBanner = () => {
  const form = useFormContext<SchemaTypeProductByCategoryBanner>()
  const { data = { data: { count: 0, results: [] } }, isLoading } = useQuery({
    enabled: !!form.watch('category'),
    queryKey: [REACT_QUERY_KEYS.PRODUCT_LIST, form.watch('category')],
    queryFn: async () => await getProducts({}, form.watch('category')),
    select: res => {
      const results = res.data.results.map(p => ({ label: p.name, value: p.id }))
      return { ...res, data: { ...res.data, results } }
    },
  })

  if (form.watch('category'))
    return (
      <Select
        name='product'
        label='product'
        loading={isLoading}
        control={form.control}
        options={data.data.results}
        placeholder='select_product'
      />
    )
}
