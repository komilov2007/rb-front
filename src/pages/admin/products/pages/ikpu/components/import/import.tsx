import Box from '@mui/material/Box'
import { ExportIkpu } from '../export'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { useImport, type ImportIkpuProps } from './useImport'
import { UploadExcel } from '@/components/uploads/upload-excel'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconFileDownload } from '@/assets/icons/file-download.svg'
import { useTranslation } from 'react-i18next'

export const ImportIkpu = (props: ImportIkpuProps) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit, isLoading } = useImport(props)

  return (
    <>
      <Button variant='outlined' onClick={setTrue} startIcon={<IconFileDownload />}>
        {t('import')}
      </Button>
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
          <Box
            display='flex'
            p='7px 7px 0 32px'
            component='header'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='title30'>{t('import')}</Typography>
            <IconButton onClick={setFalse}>
              <IconRemove />
            </IconButton>
          </Box>
          <Box className='content'>
            <UploadExcel name='file' control={form.control} />
            <Stack mt='28px'>
              <ExportIkpu variant='example' />
            </Stack>
          </Box>
          <Box className='footer'>
            <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
              <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                {t('cancel')}
              </Button>
              <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                {t('import')}
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
