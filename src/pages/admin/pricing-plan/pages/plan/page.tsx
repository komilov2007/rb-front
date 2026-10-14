import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import { PromoCode } from './promo-code'
import { TAB_PLANS } from '@/constants/plan'
import { Balance } from '@/components/balance'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { numberFormat } from '@/utils/number-format'
import { WrapDiscount, FormControlLabel } from './style'

const Page = () => {
  const { t } = useTranslation()
  const account = useProfileStore(state => state.me?.account ?? 0)
  const {
    price,
    plan,
    onSubmit,
    isLoading,
    promoCode,
    totalPrice,
    refBalance,
    setPromoCode,
    promoCodePrice,
    handleChangeRadio,
  } = usePage()

  return (
    <>
      <Stack p='20px' width='100%' component='form' maxWidth='900px'>
        <Typography mb='15px' variant='title10'>
          {t('pricing_plan')}
        </Typography>
        <RadioGroup
          value={plan}
          onChange={handleChangeRadio}
          sx={theme => ({
            gap: '25px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            [theme.breakpoints.down('md')]: {
              gap: '10px',
              gridTemplateColumns: '1fr',
            },
          })}
        >
          {Object.values(TAB_PLANS).map(({ value, label, discount }) => {
            const newDiscount = promoCode ? promoCode.percent : discount
            const discountPrice = (price * (100 - newDiscount)) / 100

            return (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                active={value === plan}
                label={
                  <Stack>
                    <Stack gap='10px' direction='row' alignItems='center'>
                      <Typography
                        variant='title100'
                        color={theme => theme.palette.allColors.BLACK140}
                      >
                        {t(label)}
                      </Typography>
                      {newDiscount > 0 && <WrapDiscount>-{newDiscount} %</WrapDiscount>}
                    </Stack>
                    <Stack gap='5px' direction='row' alignItems='center'>
                      {value !== 'monthly' && (
                        <Typography
                          variant='text130'
                          lineHeight='25px'
                          sx={{ textDecorationLine: 'line-through' }}
                          color={theme => theme.palette.allColors.GRAY560}
                        >
                          {numberFormat(price).replaceAll(',', ' ') + ' '} UZS
                        </Typography>
                      )}
                      <Typography
                        variant='text130'
                        lineHeight='25px'
                        color={theme => theme.palette.allColors.GRAY560}
                      >
                        {numberFormat(discountPrice).replaceAll(',', ' ') + ' '}
                        UZS
                      </Typography>
                    </Stack>
                  </Stack>
                }
              />
            )
          })}
        </RadioGroup>
        <Stack width='100%' maxWidth='590px'>
          <Stack mt='13px'>
            <PromoCode promoCode={promoCode} setPromoCode={setPromoCode} />
          </Stack>
          <Stack mt='33px' mb='32px' gap='15px'>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='title20' color={theme => theme.palette.allColors.BLACK100}>
                {t('your_balance')}:
              </Typography>
              <Typography variant='title20'>
                {numberFormat(account).replaceAll(',', ' ')} UZS
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='title20' color={theme => theme.palette.allColors.BLACK100}>
                {t('discount')}:
              </Typography>
              <Typography variant='title20'>
                {numberFormat(promoCodePrice).replaceAll(',', ' ')} UZS
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='title20' color={theme => theme.palette.allColors.BLACK100}>
                {t('billed_now')}
              </Typography>
              <Typography variant='title20' fontWeight='700'>
                {numberFormat(totalPrice).replaceAll(',', ' ')} UZS
              </Typography>
            </Stack>
          </Stack>
          <Stack alignItems='flex-end'>
            <div>
              <LoadingButton fullWidth variant='contained' onClick={onSubmit} loading={isLoading}>
                {t('pay_now')}
              </LoadingButton>
            </div>
          </Stack>
        </Stack>
        <Balance
          ref={refBalance}
          onSubmit={onSubmit}
          variant='pricing-plan'
          amount={totalPrice - account}
        />
      </Stack>
    </>
  )
}

export default Page
