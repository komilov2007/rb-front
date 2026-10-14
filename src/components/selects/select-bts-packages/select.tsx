import { Select } from '../select/select'
import { getPackages } from '@/apis/admin/bts'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { type SchemaTypeBts } from '@/utils/schema'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectBtsPackages = () => {
  const form = useFormContext<SchemaTypeBts>()
  const { data = { data: [] }, isLoading } = useQuery({
    queryFn: getPackages,
    queryKey: [REACT_QUERY_KEYS.BTS_PACKAGES_LIST],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <Select
      name='package_id'
      label='package'
      loading={isLoading}
      options={data.data}
      control={form.control}
      placeholder='select_package'
    />
  )
}
