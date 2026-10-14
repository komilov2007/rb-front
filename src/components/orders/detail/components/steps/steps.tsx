import dayjs from 'dayjs'
import { Stepper } from '@/components/stepper'
import type { OrderDetailProps } from '@/types/order'
import { ORDER_DETAIL_PICKUP_STEPS, ORDER_DETAIL_DELIVERED_STEPS } from '@/constants/order'

export const Steps = (props: OrderDetailProps) => {
  const CurrentStep = props?.status_datetime
    ? Object.entries(props.status_datetime).find(
        ([_, value]) => !value.is_completed && value.is_active,
      )
    : []

  return (
    <>
      {props?.order_details?.status !== 'CANCEL' &&
        props?.order_details?.status !== 'CANCELED_BY_CUSTOMER' && (
          <Stepper
            steps={
              props?.order_details.service_type === 'DELIVERY'
                ? ORDER_DETAIL_DELIVERED_STEPS.map(s => ({
                    ...s,
                    text: props?.status_datetime?.[s.status]?.datetime
                      ? dayjs(props?.status_datetime[s.status].datetime).format('HH:mm; DD.MM.YYYY')
                      : '',
                  }))
                : ORDER_DETAIL_PICKUP_STEPS.map(s => ({
                    ...s,
                    text: props?.status_datetime?.[s.status]?.datetime
                      ? dayjs(props?.status_datetime[s.status].datetime).format('HH:mm; DD.MM.YYYY')
                      : '',
                  }))
            }
            activeStep={
              props?.order_details.service_type === 'DELIVERY'
                ? (ORDER_DETAIL_DELIVERED_STEPS.find(o => o.status === CurrentStep?.[0])?.step ?? 1)
                : (ORDER_DETAIL_PICKUP_STEPS.find(o => o.status === CurrentStep?.[0])?.step ?? 1)
            }
          />
        )}
    </>
  )
}
