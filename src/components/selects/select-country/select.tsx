import { Select } from '../select'
import { getCountryList } from '@/apis/common'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type SchemaTypeCountryAndCities } from '@/utils/schema'

export const SelectCountry = () => {
  const form = useFormContext<SchemaTypeCountryAndCities>()
  const { data = { data: [] }, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.COUNTRY_LIST],
    queryFn: getCountryList,
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <Select
      name='country'
      label='country'
      options={data.data}
      loading={isLoading}
      control={form.control}
      placeholder='select_country'
    />
  )
}
