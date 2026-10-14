import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { InstructionVideo } from '@/components/instructions/video'
import { InstructionTelegram } from '@/components/instructions/telegram'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import { useFormTelegramBot, type FormTelegramBotProps } from './useFormTelegramBot'

const FormTelegramBot = (props: FormTelegramBotProps) => {
  const { t } = useTranslation()
  const { form, detail, onSubmit, isLoading, isVariantAdmin } = useFormTelegramBot(props)

  return (
    <Stack
      component='form'
      className='scrollPageLayout'
      onSubmit={form.handleSubmit(onSubmit)}
      sx={{
        padding: isVariantAdmin ? '24px' : 0,
        alignItems: isVariantAdmin ? 'flex-start' : 'center',
      }}
    >
      {(detail.isLoading || detail.isFetching) && !isVariantAdmin ? (
        <Spinner center />
      ) : (
        <>
          <Box width='100%' maxWidth='598px'>
            {isVariantAdmin && (
              <Typography mb='18px' variant='title30' component='h3'>
                {t('create_bot')}
              </Typography>
            )}
            <Input
              fullWidth
              name='token'
              label='token'
              control={form.control}
              placeholder='enter_token'
            />
            <Box mt='21px'>
              <InstructionTelegram />
            </Box>
            <Stack m='22px 6px'>
              <InstructionVideo />
            </Stack>
            {!isVariantAdmin && (
              <Box
                gap='20px'
                width='100%'
                display='flex'
                alignItems='center'
                justifyContent='flex-end'
                mt={{ xs: '20px', md: '50px' }}
              >
                <Button
                  size='large'
                  component={Link}
                  variant='text-gray'
                  startIcon={<IconArrowLeft />}
                  to={`${ROUTER.SIGN_UP}${ROUTER.BUSINESS_DETAILS}`}
                >
                  {t('back')}
                </Button>
                <LoadingButton
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  loading={isLoading}
                  sx={{ maxWidth: '190px' }}
                >
                  {t('next')}
                </LoadingButton>
              </Box>
            )}
          </Box>
          {isVariantAdmin && (
            <Stack width='100%' maxWidth='1110px' alignItems='flex-end'>
              <Stack gap='14px' width='100%' mt='122px' direction='row' maxWidth='316px'>
                <Button
                  fullWidth
                  variant='outlined-transparent'
                  component={Link}
                  to={`${ROUTER.ADMIN}/${ROUTER.PLATFORMS}/${ROUTER.TELEGRAM_BOTS}`}
                >
                  {t('cancel')}
                </Button>
                <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                  {t('submit')}
                </LoadingButton>
              </Stack>
            </Stack>
          )}
        </>
      )}
    </Stack>
  )
}

export default FormTelegramBot
