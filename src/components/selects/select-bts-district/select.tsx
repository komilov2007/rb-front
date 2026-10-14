import { Select } from '../select'
import { getDistricts } from '@/apis/admin/bts'
import { useQuery } from '@tanstack/react-query'
import { type SchemaTypeBts } from '@/utils/schema'
import { useFormContext, useWatch } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectBtsDistrict = () => {
  const form = useFormContext<SchemaTypeBts>()
  const region_id = useWatch({
    control: form.control,
    name: 'sender_region_id',
  })
  const { data = { data: [] }, isLoading } = useQuery({
    queryFn: async () =>
      await getDistricts({
        region_id,
      }),
    enabled: !!region_id,
    queryKey: [REACT_QUERY_KEYS.BTS_DISTRCTS_LIST, region_id],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <Select
      label='city'
      options={data.data}
      name='sender_city_id'
      disabled={!region_id}
      control={form.control}
      placeholder='select_city'
      loading={isLoading && !!region_id}
    />
  )
}
