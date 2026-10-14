import { useQuery } from '@tanstack/react-query'
import { Select } from '@/components/selects/select'
import { type SchemaTypeRegos } from '@/utils/schema'
import { getPriceTypesRegos } from '@/apis/admin/regos'
import { useWatch, useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectPriceTypeRegos = () => {
  const form = useFormContext<SchemaTypeRegos>()
  const integration_id = useWatch({ name: 'integration_id', control: form.control })
  const { data = { data: [] }, isLoading } = useQuery({
    enabled: !!integration_id,
    queryFn: async () => await getPriceTypesRegos({ integration_id }),
    queryKey: [REACT_QUERY_KEYS.PRICE_TYPE_REGOS, integration_id],
    select: res => {
      const newData = res.data.map(b => ({ label: b.name, value: b.id }))
      return { ...res, data: newData }
    },
  })

  return (
    <Select
      label='price_type'
      name='price_type_id'
      options={data.data}
      control={form.control}
      disabled={!integration_id}
      placeholder='select_price_type'
      loading={isLoading && !!integration_id}
    />
  )
}
