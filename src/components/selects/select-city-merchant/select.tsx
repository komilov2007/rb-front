import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import Skeleton from '@mui/material/Skeleton'
import FormGroup from '@mui/material/FormGroup'
import { useQuery } from '@tanstack/react-query'
import { getDeliveryMerchantCities } from '@/apis/common'
import { useFormContext, useWatch } from 'react-hook-form'
import { type SchemaTypeCityMerchant } from '@/utils/schema'
import FormControlLabel from '@mui/material/FormControlLabel'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type DeliveryMerchantTypeProps } from '@/types/common'

interface SelectCityMerchantProps {
  service_type: DeliveryMerchantTypeProps
}

export const SelectCityMerchant = ({ service_type }: SelectCityMerchantProps) => {
  const form = useFormContext<SchemaTypeCityMerchant>()
  const cities = useWatch({ name: 'cities', control: form.control })
  const { data = { data: [] }, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.CITY_MERCHANT, service_type],
    queryFn: async () => await getDeliveryMerchantCities({ service_type }),
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <FormGroup>
      {isLoading ? (
        <Stack gap='10px' component='ul'>
          {Array.from({ length: 5 }, (_, index) => (
            <Stack gap='10px' key={index} direction='row' alignItems='center' component='li'>
              <Skeleton variant='rounded' width='24px' height='24px' />
              <Skeleton width='50%' height='14px' variant='rounded' />
            </Stack>
          ))}
        </Stack>
      ) : (
        data.data.map(city => {
          return (
            <FormControlLabel
              key={city.value}
              label={city.label}
              control={
                <Checkbox
                  color='primary'
                  title={city.label}
                  sx={{ ml: '-9px' }}
                  checked={cities.includes(city.value)}
                  onChange={e => {
                    const newCities = e.target.checked
                      ? [...cities, city.value]
                      : cities.filter(c => c !== city.value)
                    form.setValue('cities', newCities)
                  }}
                />
              }
            />
          )
        })
      )}
    </FormGroup>
  )
}
