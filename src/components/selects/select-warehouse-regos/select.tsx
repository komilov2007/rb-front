import { useQuery } from '@tanstack/react-query'
import { Select } from '@/components/selects/select'
import { type SchemaTypeRegos } from '@/utils/schema'
import { getWarehouseRegos } from '@/apis/admin/regos'
import { useWatch, useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectWarehouseRegos = () => {
  const form = useFormContext<SchemaTypeRegos>()
  const integration_id = useWatch({ name: 'integration_id', control: form.control })
  const { data = { data: [] }, isLoading } = useQuery({
    enabled: !!integration_id,
    queryFn: async () => await getWarehouseRegos({ integration_id }),
    queryKey: [REACT_QUERY_KEYS.WAREHOUSES_REGOS, integration_id],
    select: res => {
      const newData = res.data.map(b => ({ label: b.name, value: b.id }))
      return { ...res, data: newData }
    },
  })

  return (
    <Select
      label='warehouse'
      name='warehouse_id'
      options={data.data}
      control={form.control}
      disabled={!integration_id}
      placeholder='select_warehouse'
      loading={isLoading && !!integration_id}
    />
  )
}
