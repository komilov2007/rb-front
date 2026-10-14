import dayjs from 'dayjs'
import { useRef } from 'react'
import { Switch } from '../switch'
import { Container } from './style'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { type PaymentProps } from '@/types/payment'
import { PAYMENT_TYPES } from '@/constants/payment'

export const Card = (props: PaymentProps) => {
  const { t } = useTranslation()
  const Icon = PAYMENT_TYPES[props.state].Icon
  const ref = useRef<{ value: boolean; setFalse: () => void; setTrue: () => void }>(null)
  const can_edit = useProfileStore(state => state.getPermission('payment', 'can_edit'))
  // const blockedSlugs = ['unversal', 'click_api', 'payme_api', 'robo_pay', 'click_superapp']
  // const isBlockedSlug = blockedSlugs.includes(props.slug)

  // const { subscription, setSubscriptionModal } = useProfileStore(state => ({
  //   subscription: state.me?.subscription,
  //   setSubscriptionModal: state.setSubscriptionModal,
  // }))

  // const canOpen = true

  const handleClick = () => {
    if (props.slug !== 'no-token' && can_edit) {
      if (!ref.current?.value) {
        ref.current?.setTrue()
      }
    }
  }

  return (
    <>
      <Container
        onClick={handleClick}
        sx={{ cursor: props.slug !== 'no-token' ? 'pointer' : undefined }}
      >
        <Stack width='100%' justifyContent='space-between' direction='row' alignItems='center'>
          <Stack gap='13px' direction='row' alignItems='center'>
            <Stack justifyContent='center' sx={{ svg: { width: '30px', height: '30px' } }}>
              <Icon />
            </Stack>
            <Stack justifyContent='center'>
              <Stack gap='5px' direction='row' alignItems='center'>
                <Typography variant='title50' lineHeight='normal' whiteSpace='nowrap'>
                  {t(PAYMENT_TYPES[props.state].label)}
                </Typography>
                <Typography
                  variant='status'
                  component='div'
                  sx={theme => ({
                    color: props?.data?.is_active
                      ? undefined
                      : props.data
                        ? theme.palette.allColors.RED
                        : theme.palette.colors['L-BLACK30-D-GRAY20'],
                    backgroundColor: props.data?.is_active
                      ? undefined
                      : props.data
                        ? theme.palette.allColors.RED20
                        : theme.palette.colors['L-GRAY300-D-WHITE60'],
                  })}
                >
                  {t(props.data?.is_active ? 'active' : props.data ? 'in_active' : 'not_added')}
                </Typography>
              </Stack>
              <Typography variant='text' fontSize='12px' whiteSpace='nowrap'>
                {t('last_update')}{' '}
                <Typography
                  variant='inherit'
                  component='span'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {props.data ? dayjs(props.data.updated_at).format('HH:mm; MMMD, YYYY') : '-'}
                </Typography>
              </Typography>
            </Stack>
          </Stack>
          {can_edit && (
            <Stack mt='12px'>
              <Switch ref={ref} {...props} />
            </Stack>
          )}
        </Stack>
        {(props.state === PAYMENT_TYPES.CASH.type || props.state === PAYMENT_TYPES.CARD.type) && (
          <Typography
            mt='10px'
            variant='text'
            component='h4'
            fontSize='12px'
            sx={{ lineHeight: '14px !important' }}
          >
            {t(PAYMENT_TYPES[props.state].desc ?? '')}
          </Typography>
        )}
      </Container>
    </>
  )
}
