import { Select } from '../select/select'
import { useQuery } from '@tanstack/react-query'
import { type FieldValues } from 'react-hook-form'
import type { ControlProps } from '@/types/components'
import { getFargoDistricts } from '@/apis/admin/fargo'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export type SelectFargoDistrictsProps<T extends FieldValues> = {
  city: { value: number; label: string }
} & ControlProps<T>

export const SelectFargoDistricts = <T extends FieldValues>({
  city,
  name,
  control,
}: SelectFargoDistrictsProps<T>) => {
  const { data = { data: [] }, isLoading } = useQuery({
    enabled: !!city.value,
    queryKey: [REACT_QUERY_KEYS.FARGO_DISTRICTS_LIST, city],
    queryFn: async () => await getFargoDistricts(city.value),
    select: res => {
      const data = res.data.data.list.map(v => ({
        value: v.id,
        label: v.name,
      }))
      return { ...res, data }
    },
  })

  return (
    <Select
      name={name}
      label='district'
      control={control}
      options={data.data}
      disabled={!city.value}
      placeholder='select_district'
      loading={!!city.value && isLoading}
    />
  )
}
