import { Select } from '../select/select'
import { useQuery } from '@tanstack/react-query'
import { type FieldValues } from 'react-hook-form'
import type { ControlProps } from '@/types/components'
import { getUzpostDistricts } from '@/apis/admin/uzpost'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export type SelectUzpostDistrictProps<T extends FieldValues> = {
  city: number
} & ControlProps<T>

export const SelectUzpostDistrict = <T extends FieldValues>({
  city,
  name,
  control,
}: SelectUzpostDistrictProps<T>) => {
  const { data = { data: [] }, isLoading } = useQuery({
    enabled: !!city,
    queryKey: [REACT_QUERY_KEYS.UZPOST_DISTRICTS_LIST, city],
    queryFn: async () => await getUzpostDistricts(city),
    select: res => {
      const data = res.data.map(v => ({
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
      disabled={!city}
      control={control}
      options={data.data}
      placeholder='select_district'
      loading={!!city && isLoading}
    />
  )
}
