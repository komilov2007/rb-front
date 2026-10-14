import { type FieldValues } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { type ControlProps } from '@/types/components'
import { getFargoCities } from '@/apis/admin/fargo'
import { Autocomplete } from '@/components/autocomplete'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectFargoCities = <T extends FieldValues>({ name, control }: ControlProps<T>) => {
  const { data = { data: [] }, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.FARGO_CITY_LIST],
    queryFn: getFargoCities,
    select: res => {
      const data = res.data.data.list.map(v => ({
        value: v.id,
        label: v.name,
      }))
      return { ...res, data }
    },
  })

  return (
    <Autocomplete
      name={name}
      label='city'
      control={control}
      options={data.data}
      loading={isLoading}
      placeholder='select_city'
    />
  )
}
