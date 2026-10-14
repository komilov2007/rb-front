import { Select } from '../select'
import { useQuery } from '@tanstack/react-query'
import { getMeasures } from '@/apis/admin/measure'
import { type FieldValues } from 'react-hook-form'
import { type ControlProps } from '@/types/components'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMeasuresStore } from '@/store/measures'

export const SelectMeasures = <T extends FieldValues>({ name, control }: ControlProps<T>) => {
  const setMeasures = useMeasuresStore(state => state.setMeasures)
  const { data = { data: [] }, isLoading } = useQuery({
    queryFn: getMeasures,
    queryKey: [REACT_QUERY_KEYS.MEASURES],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { res, data }
    },
    onSuccess: res => {
      setMeasures(res.data)
    },
  })

  return (
    <Select
      name={name}
      control={control}
      loading={isLoading}
      options={data.data}
      label='measurement_unit'
      placeholder='for_example_piece'
    />
  )
}
