import { Select } from '../select'
import { getUnit } from '@/apis/common'
import { useQuery } from '@tanstack/react-query'
import { type FieldValues } from 'react-hook-form'
import { type ControlProps } from '@/types/components'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectUnit = <T extends FieldValues>({ name, control }: ControlProps<T>) => {
  const { data = { data: [] }, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.UNIT_LIST],
    queryFn: getUnit,
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <Select
      name={name}
      label='unit'
      control={control}
      loading={isLoading}
      options={data.data}
      placeholder='select_unit'
    />
  )
}
