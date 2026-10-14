import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import { useExport } from './useExport'
import Button from '@mui/material/Button'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Calendar } from '@/components/calendar'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { OrderStatus } from '@/components/forms/order-status'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconFileDownloadOutline } from '@/assets/icons/file-download-outline.svg'

export const Export = () => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit, isLoading, tab, setTab } = useExport()

  return (
    <>
      <Button
        fullWidth
        startIcon={<IconFileDownloadOutline />}
        variant='outlined-white'
        onClick={setTrue}
      >
        {t('export')}
      </Button>
      <SwipeableDrawer
        open={value}
        anchor='right'
        onOpen={setTrue}
        onClose={setFalse}
        className='small'
      >
        <FormProvider {...form}>
          <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
            <Box
              display='flex'
              p='7px 7px 0 32px'
              component='header'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='title30'>{t('export_as_file')}</Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Typography mb='13px' variant='title10' fontWeight='400' component='h3'>
                {t('select_an_interval')}
              </Typography>
              <Tabs
                value={tab}
                onChange={(_, v) => {
                  setTab(v)
                }}
                sx={{ mb: '20px' }}
              >
                <Tab label={t('date_range')} />
                <Tab label={t('all_time')} />
              </Tabs>
              <Stack gap='28px'>
                {tab === 0 ? (
                  <Calendar name='date' control={form.control} />
                ) : (
                  <Stack
                    sx={{
                      '.MuiAlert-root': {
                        maxWidth: '280px !important',
                        minWidth: '280px !important',
                      },
                    }}
                  >
                    <Alert severity='success'>
                      <AlertTitle sx={{ fontSize: '14px' }}>{t('all_time_orders')}</AlertTitle>
                      <Typography fontSize='12px'>{t('all_time_orders_text')}</Typography>
                    </Alert>
                  </Stack>
                )}
                <OrderStatus />
              </Stack>
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                  {t('export')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
