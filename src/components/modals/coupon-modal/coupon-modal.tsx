import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Copy } from '@/components/copy'
import Dialog from '@mui/material/Dialog'
import { ROUTER } from '@/constants/router'
import { useNavigate } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import PartyPopper from '@/assets/icons/coupon.svg'
import { useMutation } from '@tanstack/react-query'
import { type InferType, object, string } from 'yup'
import { Trans, useTranslation } from 'react-i18next'
import { getCurrentDomainMeta } from '@/constants/domain-themes'
import { subcriptionPromocode } from '@/apis/admin/pricing-plan'
import { ReactComponent as IconClose } from '@/assets/icons/close.svg'
import { markShownToday, shouldShowOncePerDay } from '@/utils/once-per-day'

const ONCE_KEY = 'coupon-modal'

const schema = object().shape({ code: string().required('code_is_a_required_field').default('') })

type SchemaType = InferType<typeof schema>

export const CouponModal = () => {
  const title = getCurrentDomainMeta().appName
  const couponModal = useBoolean()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const theme = useTheme()
  const { showPopup, promoCode } = useProfileStore(state => ({
    showPopup: state.show_popup,
    promoCode: state.promo_code,
  }))

  // Auto-open once per calendar day
  useEffect(() => {
    if (showPopup && shouldShowOncePerDay(ONCE_KEY)) {
      couponModal.setTrue()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopup])

  const handleClose = () => {
    markShownToday(ONCE_KEY)
    couponModal.setFalse()
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const code = data.code.toLocaleUpperCase()
      return await subcriptionPromocode({ code })
    },
    onSuccess: res => {
      couponModal.setFalse()
      navigate(`${ROUTER.PRICING_PLAN}?promoCode=${promoCode}`)
    },
  })

  const handleNavigate = () => {
    mutate({ code: promoCode })
  }

  return (
    <Dialog scroll='body' open={couponModal.value} onClose={handleClose}>
      <Stack height='100%' p='30px'>
        <Box sx={{ display: 'flex', position: 'relative' }}>
          <Typography sx={{ flexGrow: 1, textAlign: 'center' }}>
            <img src={PartyPopper} alt='Party Popper icon' width={200} />
          </Typography>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: -12, top: -12 }}>
            <IconClose fill={theme.palette.allColors.GRAY760} width={20} height={20} />
          </IconButton>
        </Box>
        <Stack alignItems='center' justifyContent='center'>
          <Typography align='center' m='30px 0 10px' variant='title70' fontSize='20px'>
            {t('coupon_modal_title')}
          </Typography>
          <Typography align='center' variant='text30' fontSize={18} maxWidth='600px'>
            {t('coupon_modal_text1', { value: title })}
          </Typography>
          <Typography
            align='center'
            variant='text30'
            fontSize={18}
            maxWidth='600px'
            mb={{ xs: '15px', md: '35px' }}
          >
            <Trans
              i18nKey='coupon_modal_text2'
              components={{
                linkTag: <Typography component='span' fontWeight={600} variant='inherit' />,
              }}
            />
          </Typography>
          <Stack gap='10px' direction='row' alignItems='center' mb='20px'>
            <Typography noWrap variant='text' fontSize={22} fontWeight={600} color='primary'>
              {promoCode}
            </Typography>
            <Copy text={promoCode} />
          </Stack>
          <LoadingButton
            loading={isLoading}
            size='mediumSmall'
            sx={{ minWidth: '147px' }}
            onClick={handleNavigate}
          >
            {t('tariffs')}
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  )
}
