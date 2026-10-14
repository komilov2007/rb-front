import { Select } from '../select/select'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { getCouriers } from '@/apis/admin/courier'
import type { OrderDetailProps } from '@/types/order'
import { type SchemaTypeOrderDetail } from '@/utils/schema'
import { ORDER_SERVICE_OPTIONS } from '@/constants/order'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectCourier = (props: OrderDetailProps) => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeOrderDetail>()
  const { data = { data: [] }, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.COURIER_ID_LIST],
    queryFn: getCouriers,
    select: res => {
      const data = res.data.map(c => ({ label: c.firstname, value: c.id, phone: c.phone }))
      return { ...res, data }
    },
  })

  if (props.order_details.status !== 'NEW') {
    if (props.order_details.courier) {
      return (
        <>
          <Typography component='h4' variant='text110'>
            {t('courier')}
          </Typography>
          <Typography
            component='p'
            align='right'
            maxWidth='300px'
            variant='text110'
            color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
          >
            {data.data.find(c => String(c.value) === String(props.order_details.courier))?.label}
          </Typography>
        </>
      )
    }
    return null
  }

  if (form.watch('delivery_service') !== ORDER_SERVICE_OPTIONS.YOUR_DELIVERY.value) {
    return null
  }

  return (
    <Select
      name='courier'
      label='courier'
      loading={isLoading}
      options={data.data}
      control={form.control}
      placeholder='select_courier'
    />
  )
}
