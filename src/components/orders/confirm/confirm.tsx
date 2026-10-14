import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { useOrderStore } from '@/store/order'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import RadioGroup from '@mui/material/RadioGroup'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { numberFormat } from '@/utils/number-format'
import type { OrderActionProps } from '@/types/order'
import { DELIVERY_TYPES } from '@/constants/delivery'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

export interface ConfirmProps extends OrderActionProps {
  loading: boolean
  handleUpdate: () => void
}

export const Confirm = (props: ConfirmProps) => {
  const modal = useBoolean()
  const debtModal = useBoolean()
  const [debtValue, setDebtValue] = useState<'yes' | 'no' | ''>('')
  const { t } = useTranslation()
  const currency = useProfileStore(state => state.me?.currency?.code)

  const { setIsDebt, bito_is_debt } = useOrderStore(state => ({
    setIsDebt: state.setIsDebt,
    bito_is_debt: state.bito_is_debt,
  }))

  const handleConfirm = () => {
    if (bito_is_debt && props.variant === 'modal') {
      debtModal.setTrue()
      return
    }

    if (props.variant === 'modal') {
      if (
        props.service_type === 'FARGO_PICKUP' ||
        props.service_type === 'FARGO_DELIVERY' ||
        props.service_type === 'TEZBOR_EXPRESS' ||
        props.service_type === 'TEZBOR_STANDARD'
      ) {
        modal.setTrue()
      } else {
        props.handleUpdate()
      }
    }
  }

  const handleDebtConfirm = () => {
    if (debtValue === '') return

    const isDebt = debtValue === 'yes'
    setIsDebt(isDebt)
    debtModal.setFalse()
    setDebtValue('')

    if (
      props.service_type === 'FARGO_PICKUP' ||
      props.service_type === 'FARGO_DELIVERY' ||
      props.service_type === 'TEZBOR_EXPRESS' ||
      props.service_type === 'TEZBOR_STANDARD'
    ) {
      modal.setTrue()
    } else {
      props.handleUpdate()
    }
  }

  const handleUpdate = () => {
    props.handleUpdate()
  }

  const isContact =
    !props.is_paid &&
    (props.payment_type === 'PAYME_API' ||
      props.payment_type === 'ROBO_CLICK' ||
      props.payment_type === 'ROBO_UZUM' ||
      props.payment_type === 'ROBO_PAYME' ||
      props.payment_type === 'CLICK_API' ||
      props.payment_type === 'CLICK_SUPERAPP' ||
      props.payment_type === 'ZOOMRAD_MINIAPP')

  return (
    <>
      <LoadingButton
        size='extraSmall'
        loading={props.loading}
        onClick={handleConfirm}
        variant={isContact ? 'contained-blue' : 'contained-green'}
      >
        {t(isContact ? 'contact' : 'confirm')}
      </LoadingButton>
      <Dialog scroll='body' open={debtModal.value} onClose={debtModal.setFalse}>
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={debtModal.setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack mb='57px' p='0 78px' maxWidth='551px' alignItems='center'>
          <Typography variant='title20' component='h3' fontWeight='700' mb='25px' align='center'>
            {t('do_you_sell_on_credit')}
          </Typography>
          <RadioGroup
            row
            value={debtValue}
            onChange={e => {
              setDebtValue(e.target.value as 'yes' | 'no')
            }}
            sx={{ mb: '30px', gap: '30px' }}
          >
            <FormControlLabel value='yes' control={<Radio />} label={t('yes')} />
            <FormControlLabel value='no' control={<Radio />} label={t('no')} />
          </RadioGroup>
          <Box
            gap='14px'
            width='100%'
            display='flex'
            maxWidth='316px'
            alignItems='center'
            justifyContent='center'
          >
            <Button fullWidth size='small' variant='outlined-red' onClick={debtModal.setFalse}>
              {t('cancel')}
            </Button>
            <LoadingButton
              fullWidth
              size='small'
              variant='contained'
              loading={props.loading}
              disabled={debtValue === ''}
              onClick={handleDebtConfirm}
            >
              {t('confirm')}
            </LoadingButton>
          </Box>
        </Stack>
      </Dialog>
      <Dialog scroll='body' open={modal.value} onClose={modal.setFalse}>
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={modal.setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack mb='57px' p='0 78px' maxWidth='551px' alignItems='center'>
          <Typography variant='title20' component='h3' fontWeight='700' mb='50px' align='center'>
            {t('service_cost_message', {
              currency,
              service: t(DELIVERY_TYPES[props.service_type]?.title),
              delivery_price: numberFormat(props.data?.items.delivery_price ?? 0),
            })}
          </Typography>
          <Box
            gap='14px'
            width='100%'
            display='flex'
            maxWidth='316px'
            alignItems='center'
            justifyContent='center'
          >
            <Button fullWidth size='small' variant='outlined-red' onClick={modal.setFalse}>
              {t('cancel')}
            </Button>
            <LoadingButton
              fullWidth
              size='small'
              variant='contained'
              onClick={handleUpdate}
              loading={props.loading}
            >
              {t('confirm')}
            </LoadingButton>
          </Box>
        </Stack>
      </Dialog>
    </>
  )
}
