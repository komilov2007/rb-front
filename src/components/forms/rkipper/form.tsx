import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Spinner } from '@/components/spinner'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { useFormRkipper, type FormRkipperProps } from './useFormRkipper'

export const FormRkipper = (props: FormRkipperProps) => {
  const { t, data, form, smartUp, onSubmit, isLoading } = useFormRkipper(props)

  return (
    <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
      {isLoading ? (
        <Spinner center />
      ) : (
        <>
          <Box className='content'>
            <Stack gap='15px'>
              <Input
                fullWidth
                name='username'
                label='username'
                control={form.control}
                placeholder='enter_username'
              />
              <Input
                fullWidth
                name='password'
                label='password'
                control={form.control}
                placeholder='enter_password'
              />
              <Input
                fullWidth
                label='Host'
                name='host'
                control={form.control}
                placeholder='Enter host'
              />
              <Input
                fullWidth
                name='port'
                label='Port'
                control={form.control}
                placeholder='Enter port'
              />
              <Input
                fullWidth
                label='table'
                name='table'
                control={form.control}
                placeholder='enter_table'
              />
              <Input
                fullWidth
                name='station'
                label='station'
                control={form.control}
                placeholder='enter_station'
              />
            </Stack>
          </Box>
          <Box className='footer'>
            <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
              <Button fullWidth variant='outlined-transparent' onClick={props.onClose}>
                {t('cancel')}
              </Button>
              <LoadingButton
                type='submit'
                fullWidth
                variant='contained'
                loading={smartUp.isLoading}
              >
                {t(data?.data.username && data?.data.username.length > 0 ? 'reload' : 'install')}
              </LoadingButton>
            </Stack>
          </Box>
        </>
      )}
    </Box>
  )
}
