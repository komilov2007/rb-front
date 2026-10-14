import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import { useTranslation } from 'react-i18next'
import { useOtp, type OtpProps } from './useOtp'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { forwardRef, useImperativeHandle } from 'react'
import { InputOtp } from '@/components/inputs/input-otp'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconVerification } from '@/assets/icons/verification.svg'

export const Otp = forwardRef((props: OtpProps, ref) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, isLoading, onComplete, onSubmit } = useOtp(props)
  useImperativeHandle(ref, () => {
    return {
      setTrue,
    }
  }, [setTrue])

  return (
    <Dialog scroll='body' open={value} onClose={setFalse}>
      <Stack component='form' onSubmit={onSubmit} alignItems='center'>
        <Stack width='100%' mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Box mb='25px' display='flex' alignItems='center' justifyContent='center'>
          <IconVerification />
        </Box>
        <Typography
          align='center'
          variant='title20'
          lineHeight='26px'
          maxWidth='300px'
          color={theme => theme.palette.allColors.GRAY100}
        >
          {t('credit_card_authentication_code_sent_to_registered_phone_number')}
        </Typography>
        <Stack mt='15px' gap='20px' mb='57px' p='0 78px' maxWidth='551px' alignItems='center'>
          <InputOtp length={6} name='otp' control={form.control} onComplete={onComplete} />
          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            loading={isLoading}
          >
            {t('send')}
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  )
})
