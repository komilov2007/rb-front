import { Service } from './service'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { type OrderDetailProps } from '@/types/order'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { DELIVERIES } from '@/constants/delivery'
import { type SchemaTypeOrderDetail } from '@/utils/schema'
import { ORDER_SERVICE_OPTIONS } from '@/constants/order'
import { Controller, useFormContext } from 'react-hook-form'

export const DeliveryServices = (props: OrderDetailProps) => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeOrderDetail>()

  if (props.order_details.status !== 'NEW') {
    return null
  }

  return (
    <Stack gap='10px' width='100%'>
      <Typography component='h4' variant='text110'>
        {t('delivery_service')}
      </Typography>
      <Controller
        control={form.control}
        name='delivery_service'
        render={({ field }) => {
          return (
            <RadioGroup row {...field}>
              <Stack gap='18px' direction='row' display='grid' gridTemplateColumns='1fr 1fr 1fr'>
                {Object.values(ORDER_SERVICE_OPTIONS).map(service => (
                  <Service key={service.value} {...service} />
                ))}
              </Stack>
            </RadioGroup>
          )
        }}
      />
      {props.order_details.deliver_type &&
      form.watch('delivery_service') === ORDER_SERVICE_OPTIONS.YOUR_DELIVERY.value ? (
        <Typography>
          {props.order_details.deliver_type?.delivery_type === DELIVERIES.CUSTOM.value
            ? props.order_details.deliver_type?.text
            : t(DELIVERIES[props.order_details.deliver_type.delivery_type].label)}
        </Typography>
      ) : null}
    </Stack>
  )
}
