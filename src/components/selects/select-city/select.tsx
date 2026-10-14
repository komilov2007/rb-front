import { Select } from '../select'
import { getCityList } from '@/apis/common'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type SchemaTypeCountryAndCities } from '@/utils/schema'

export const SelectCity = () => {
  const form = useFormContext<SchemaTypeCountryAndCities>()
  const { data = { data: [] }, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.CITY_LIST, form.watch('country')],
    queryFn: async () => await getCityList(form.watch('country')),
    enabled: !!form.watch('country'),
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  if (!form.watch('country')) {
    return null
  }

  return (
    <Select
      multiple
      name='cities'
      label='cities'
      options={data.data}
      loading={isLoading}
      control={form.control}
      placeholder='select_cities'
    />
  )
}
