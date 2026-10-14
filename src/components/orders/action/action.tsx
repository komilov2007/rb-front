import { Reject } from '../reject'
import { Confirm } from '../confirm'
import Stack from '@mui/material/Stack'
import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton'
import type { OrderActionProps } from '@/types/order'
import { useOrderAction } from '@/hooks/useOrderAction'
import { ReactComponent as IconTick } from '@/assets/icons/tick.svg'
import { ReactComponent as IconTruck } from '@/assets/icons/truck.svg'
import { ReactComponent as IconTickDouble } from '@/assets/icons/tick-double.svg'

export const OrderAction = (props: OrderActionProps) => {
  const { t } = useTranslation()
  const { isLoading, handleUpdate, handleChaneStatus } = useOrderAction(props)

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <Stack gap='8px' direction='row' alignItems='center'>
      {(props.variant === 'modal' || props.status === 'NEW') && (
        <Stack onClick={handleClick}>
          <Reject handleUpdate={handleUpdate} {...props} />
        </Stack>
      )}
      {props.status === 'NEW' ? (
        <Confirm loading={isLoading} handleUpdate={handleChaneStatus('PROGRESS')} {...props} />
      ) : (
        <Stack onClick={handleClick}>
          {props.status === 'PROGRESS' ? (
            <LoadingButton
              size='extraSmall'
              variant='contained'
              loading={isLoading}
              startIcon={<IconTick />}
              onClick={handleChaneStatus('READY')}
            >
              {t('ready')}
            </LoadingButton>
          ) : props.status === 'READY' ? (
            props.service_type === 'DELIVERY' ? (
              <LoadingButton
                size='extraSmall'
                loading={isLoading}
                variant='contained-black'
                startIcon={<IconTruck />}
                onClick={handleChaneStatus('ON_THE_WAY')}
              >
                {t('on_the_way')}
              </LoadingButton>
            ) : (
              <LoadingButton
                size='extraSmall'
                loading={isLoading}
                variant='contained-blue'
                startIcon={<IconTickDouble />}
                onClick={handleChaneStatus('COMPLETED')}
              >
                {props.is_paid ? t('complete') : t('paid_and_completed')}
              </LoadingButton>
            )
          ) : props.status === 'ON_THE_WAY' ? (
            <LoadingButton
              size='extraSmall'
              loading={isLoading}
              variant='contained-blue'
              startIcon={<IconTickDouble />}
              onClick={handleChaneStatus('DELIVERED')}
            >
              {props.is_paid ? t('delivered') : t('paid_and_delivered')}
            </LoadingButton>
          ) : null}
        </Stack>
      )}
    </Stack>
  )
}
