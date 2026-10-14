import { Select } from '../select'
import { useQuery } from '@tanstack/react-query'
import { type SchemaTypeIiko } from '@/utils/schema'
import { getIikoTerminals } from '@/apis/admin/iiko'
import { useFormContext, useWatch } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

interface SelectTerminalsProps {
  id: string
  index: number
}

export const SelectTerminals = (props: SelectTerminalsProps) => {
  const form = useFormContext<SchemaTypeIiko>()
  const api_login = useWatch({ name: 'api_login', control: form.control })
  const { data = { data: [] }, isLoading } = useQuery({
    queryFn: async () => await getIikoTerminals({ api_login, organization_id: props.id }),
    queryKey: [REACT_QUERY_KEYS.IIKO_TERMINALS, props.id, api_login],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <Select
      label='terminal'
      options={data.data}
      loading={isLoading}
      control={form.control}
      placeholder='select_terminal'
      name={`branches.${props.index}.terminal_id`}
    />
  )
}
