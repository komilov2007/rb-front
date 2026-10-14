import { Select } from '../select/select'
import { getPostTypes } from '@/apis/admin/bts'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { type SchemaTypeBts } from '@/utils/schema'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectBtsPostType = () => {
  const form = useFormContext<SchemaTypeBts>()
  const { data = { data: [] }, isLoading } = useQuery({
    queryFn: getPostTypes,
    queryKey: [REACT_QUERY_KEYS.BTS_POST_TYPES_LIST],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <Select
      label='post_type'
      name='post_type_id'
      loading={isLoading}
      options={data.data}
      control={form.control}
      placeholder='select_post_type'
    />
  )
}
