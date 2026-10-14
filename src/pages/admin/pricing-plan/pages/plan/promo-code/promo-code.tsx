import { memo } from 'react'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { WrapIconRemove, Wrapper, WrapPromoCode } from './style'
import { usePromoCode, type PromoCodeProps } from './usePromoCode'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconPromoCode } from '@/assets/icons/promo-code.svg'
import { ReactComponent as IconDirectionRight } from '@/assets/icons/direction-down.svg'

export const PromoCode = memo((props: PromoCodeProps) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit, isLoading, handeRemove } = usePromoCode(props)

  return (
    <>
      <Stack
        justifyContent='center'
        sx={theme => ({
          borderBottom: `1px solid ${theme.palette.allColors.GRAY570}`,
        })}
      >
        {props.promoCode ? (
          <Stack p='10px 0' direction='row' alignItems='center' justifyContent='space-between'>
            <Stack gap='17px' direction='row' alignItems='center'>
              <Stack position='relative' justifyContent='center'>
                <IconPromoCode />
                <WrapPromoCode>
                  <Typography variant='text220'>-{props.promoCode.percent}%</Typography>
                </WrapPromoCode>
              </Stack>
              <Typography variant='text230'>{props.promoCode.code}</Typography>
            </Stack>
            <Stack justifyContent='center'>
              <IconButton onClick={handeRemove}>
                <IconRemove />
              </IconButton>
            </Stack>
          </Stack>
        ) : (
          <Wrapper onClick={setTrue}>
            <Typography variant='text210' color={theme => theme.palette.allColors.GRAY560}>
              {t('have_a_promocode')}
            </Typography>
            <Stack sx={{ transform: 'rotate(-90deg)' }}>
              <IconDirectionRight />
            </Stack>
          </Wrapper>
        )}
      </Stack>
      <Dialog
        fullWidth
        open={value}
        scroll='body'
        maxWidth='xs'
        component='form'
        onClose={setFalse}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <WrapIconRemove>
          <IconButton onClick={setFalse}>
            <IconRemove />
          </IconButton>
        </WrapIconRemove>
        <Stack p={{ xs: '55px 14px 34px', md: '55px 34px 34px' }}>
          <Input
            fullWidth
            name='code'
            control={form.control}
            placeholder='your_code'
            sx={{
              input: {
                textTransform: 'uppercase',
              },
            }}
          />
          <Stack mt={{ xs: '100px', md: '200px' }} component='footer' alignItems='flex-end'>
            <Stack gap='14px' width='100%' direction='row' maxWidth={{ xs: 'unset', md: '316px' }}>
              <Button fullWidth variant='text-gray' onClick={setFalse} size='extraLarge'>
                {t('cancel')}
              </Button>
              <LoadingButton
                fullWidth
                type='submit'
                size='extraLarge'
                variant='contained'
                loading={isLoading}
              >
                {t('save')}
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      </Dialog>
    </>
  )
})
