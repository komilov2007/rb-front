import { Select } from '../select/select'
import { type FieldValues } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { type ControlProps } from '@/types/components'
import { getUzpostCities } from '@/apis/admin/uzpost'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectUzpostCities = <T extends FieldValues>({ name, control }: ControlProps<T>) => {
  const { data = { data: [] }, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.UZPOST_CITY_LIST],
    queryFn: getUzpostCities,
    select: res => {
      const data = res.data.regions.map(v => ({
        value: v.id,
        label: v.name,
      }))

      return { ...res, data }
    },
  })

  return (
    <Select
      name={name}
      label='city'
      control={control}
      options={data.data}
      loading={isLoading}
      placeholder='select_city'
    />
  )
}
