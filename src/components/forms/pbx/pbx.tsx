import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Copy } from '@/components/copy'
import Button from '@mui/material/Button'
import { Spinner } from '@/components/spinner'
import { usePbx, type PbxProps } from './usePbx'
import { Input } from '@/components/inputs/input'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import LoadingButton from '@mui/lab/LoadingButton'

export const Pbx = ({ onClose }: PbxProps) => {
  const { t, pbx, data, form, onSubmit, isLoading } = usePbx({ onClose })

  return (
    <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
      <Box className='content'>
        {isLoading ? (
          <Spinner center />
        ) : (
          <Stack gap='15px'>
            <Input
              fullWidth
              name='auth_key'
              label='auth_key'
              control={form.control}
              placeholder='enter_auth_key'
            />
            <Input
              fullWidth
              name='pbx_domain'
              label='pbx_domain'
              control={form.control}
              placeholder='enter_pbx_domain'
            />
            {data?.data.webhook_url && (
              <Stack>
                <InputLabel sx={{ mb: '5px', transform: 'none' }}>Webhook url</InputLabel>
                <Stack ml='-8px' gap='10px' direction='row' alignItems='center'>
                  <Copy text={data?.data.webhook_url} />
                  <Typography noWrap>{data?.data.webhook_url}</Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        )}
      </Box>
      <Box className='footer'>
        <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
          <Button fullWidth variant='outlined-transparent' onClick={onClose}>
            {t('cancel')}
          </Button>
          <LoadingButton type='submit' fullWidth variant='contained' loading={pbx.isLoading}>
            {t('install')}
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  )
}
