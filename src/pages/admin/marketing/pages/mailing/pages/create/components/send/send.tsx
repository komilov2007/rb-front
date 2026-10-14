import { useSend } from './useSend'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconMailing } from '@/assets/icons/mailing.svg'

const Send = () => {
  const { t } = useTranslation()
  const { send, form, data, value, onSubmit, setFalse, isLoading, handleBack } = useSend()

  return (
    <Stack p='24px'>
      <Stack
        height='100%'
        flexGrow={1}
        component='form'
        className='scrollPageLayout'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Stack flexGrow={1} gap='7px'>
          <Stack gap='8px' maxWidth='521px'>
            <Stack
              sx={theme => ({
                borderRadius: '0 0 8px 8px',
                background: theme.palette.allColors.GRAY520,
              })}
            >
              <img
                height='225px'
                style={{ borderRadius: '8px' }}
                src={URL.createObjectURL(data.file as File)}
              />
              <Stack p='20px'>{data.text}</Stack>
            </Stack>
            <Stack gap='8px'>
              {data.buttons?.map((button, i: number) => (
                <Button
                  key={i}
                  target='_blank'
                  component={Link}
                  to={button.url ?? ''}
                  variant='contained-light'
                >
                  {button.name}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Stack mt='105px' alignItems='flex-end'>
          <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
            <Button fullWidth variant='outlined-transparent' onClick={handleBack}>
              {t('back')}
            </Button>
            <LoadingButton
              fullWidth
              type='submit'
              variant='contained'
              loading={send.isLoading || isLoading}
            >
              {t('send')}
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
      <Dialog fullWidth scroll='body' open={value} onClose={setFalse}>
        <Stack p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack
          mt='30px'
          alignItems='center'
          sx={{
            svg: {
              width: '50%',
              height: '50%',
            },
          }}
        >
          <IconMailing />
        </Stack>
        <Stack m='60px 0 60px' alignItems='center'>
          <Typography mb='36px' align='center' variant='title30' fontWeight='700'>
            {t('newsletter_sent')}
          </Typography>
          <Button onClick={setFalse}>{t('close')}</Button>
        </Stack>
      </Dialog>
    </Stack>
  )
}

export default Send
