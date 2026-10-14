import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useFormZoomrad } from './useFormZoomrad'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { type RoboMarketAppDetaiProps } from '@/types/robo-market'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

export const FormZoomrad = (props: RoboMarketAppDetaiProps) => {
  const { t, form, modal, token, hasToken, onSubmit, handleDelete, saveMutation, deleteMutation } =
    useFormZoomrad()

  return (
    <>
      {token.isLoading ? (
        <Skeleton height='42px' width='100%' variant='rounded' />
      ) : (
        <LoadingButton onClick={modal.setTrue} variant='outlined-purple'>
          {t(hasToken ? 'installed' : 'install')}
        </LoadingButton>
      )}
      <SwipeableDrawer
        anchor='right'
        open={modal.value}
        onOpen={modal.setTrue}
        onClose={modal.setFalse}
      >
        <Box
          display='flex'
          p='7px 7px 0 32px'
          component='header'
          alignItems='center'
          justifyContent='flex-end'
        >
          <IconButton onClick={modal.setFalse}>
            <IconRemove />
          </IconButton>
        </Box>
        <Box p='5px 32px 50px'>
          <Wrapper>
            <Stack component='form' onSubmit={form.handleSubmit(onSubmit)}>
              <Stack gap='10px' direction='row'>
                <Stack
                  sx={{
                    img: {
                      width: '36px',
                      height: '36px',
                    },
                  }}
                >
                  <img src={props.icon} alt={props.name} />
                </Stack>
                <Stack justifyContent='center'>
                  <Typography variant='title50'>{props.name}</Typography>
                  <Typography variant='text270' maxWidth='300px'>
                    {t('zoomrad_description')}
                  </Typography>
                </Stack>
              </Stack>
              <Stack gap='15px' mt='20px'>
                <Input
                  fullWidth
                  label='Client id'
                  name='client_id'
                  control={form.control}
                  placeholder='enter_client_id'
                />
                <Input
                  fullWidth
                  label='Client secret'
                  name='client_secret'
                  control={form.control}
                  placeholder='enter_client_secret'
                />
                <Input
                  fullWidth
                  label='Key client'
                  name='key_client'
                  control={form.control}
                  placeholder='enter_key_client'
                />
                <Input
                  fullWidth
                  label='Key server'
                  name='key_server'
                  control={form.control}
                  placeholder='enter_key_server'
                />
                <Input
                  fullWidth
                  label='Redirect URI'
                  name='redirect_uri'
                  control={form.control}
                  placeholder='enter_redirect_uri'
                />
                <Input
                  fullWidth
                  label='Service type code'
                  name='service_type_code'
                  control={form.control}
                  placeholder='enter_service_type_code'
                />
                <Stack gap='14px' justifyContent='flex-end' direction='row'>
                  {hasToken && (
                    <LoadingButton
                      size='small'
                      variant='filled-red'
                      onClick={handleDelete}
                      sx={{ minWidth: '130px' }}
                      loading={deleteMutation.isLoading}
                    >
                      {t('delete')}
                    </LoadingButton>
                  )}
                  <LoadingButton
                    size='small'
                    type='submit'
                    variant='contained'
                    sx={{ minWidth: '130px' }}
                    loading={saveMutation.isLoading}
                  >
                    {t('save')}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Stack>
          </Wrapper>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
