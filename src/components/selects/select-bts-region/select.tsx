import { Select } from '../select/select'
import { getRegions } from '@/apis/admin/bts'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { type SchemaTypeBts } from '@/utils/schema'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectBtsRegion = () => {
  const form = useFormContext<SchemaTypeBts>()
  const { data = { data: [] }, isLoading } = useQuery({
    queryFn: getRegions,
    queryKey: [REACT_QUERY_KEYS.BTS_REGIONS_LIST],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <Select
      label='region'
      loading={isLoading}
      options={data.data}
      control={form.control}
      name='sender_region_id'
      placeholder='select_region'
    />
  )
}
