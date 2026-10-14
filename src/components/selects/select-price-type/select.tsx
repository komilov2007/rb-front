import { Select } from '../select'
import { useQuery } from '@tanstack/react-query'
import { useWatch, useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getBitoPriceTypes } from '@/apis/admin/bito'
import { type SchemaTypeBito } from '@/components/forms/bito/form.schema'

export const SelectPriceType = () => {
  const form = useFormContext<SchemaTypeBito>()
  const token = useWatch({ name: 'token', control: form.control })
  const enabled = !!token && token?.length > 0
  const { data = { data: [] }, isLoading } = useQuery({
    enabled,
    queryFn: async () => await getBitoPriceTypes({ token }),
    queryKey: [REACT_QUERY_KEYS.BITO_PRICE_TYPE, token],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <Select
      disabled={!enabled}
      options={data.data}
      label='price_type'
      control={form.control}
      name='price_type'
      loading={enabled && isLoading}
      placeholder='select_price_type'
    />
  )
}
