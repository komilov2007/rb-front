import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { Wrapper, Status } from './style'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { usePartnerApp } from './usePartnerApp'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { type RoboMarketAppDetaiProps } from '@/types/robo-market'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

export const FormPartnerApp = (props: RoboMarketAppDetaiProps) => {
  const {
    t,
    modal,
    confirm,
    connect,
    disconnect,
    isConnected,
    description,
    isShopMissing,
    handleConnect,
    handleOpen,
  } = usePartnerApp(props)

  return (
    <>
      <Button onClick={handleOpen} variant='outlined-purple'>
        {t(isConnected ? 'installed' : 'install')}
      </Button>
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
        <Stack p='5px 32px 50px'>
          <Wrapper>
            <Stack gap='24px'>
              <Stack gap='10px' direction='row' alignItems='center' justifyContent='space-between'>
                <Stack gap='10px' direction='row' alignItems='center'>
                  <Stack sx={{ img: { width: '36px', height: '36px', borderRadius: '4px' } }}>
                    <img src={props.icon} alt={props.name} />
                  </Stack>
                  <Typography variant='title50'>{props.name}</Typography>
                </Stack>
                <Status active={isConnected}>
                  {t(isConnected ? 'connected' : 'not_connected')}
                </Status>
              </Stack>
              <Typography variant='text70' sx={{ whiteSpace: 'pre-line' }}>
                {description}
              </Typography>
              <Stack gap='10px' alignItems='flex-end'>
                {isConnected ? (
                  <LoadingButton
                    size='small'
                    variant='outlined-red'
                    onClick={confirm.setTrue}
                    sx={{ minWidth: '130px' }}
                    loading={disconnect.isLoading}
                  >
                    {t('disconnect')}
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    size='small'
                    variant='contained'
                    onClick={handleConnect}
                    disabled={isShopMissing}
                    sx={{ minWidth: '130px' }}
                    loading={connect.isLoading}
                  >
                    {t('connect')}
                  </LoadingButton>
                )}
                {isShopMissing && (
                  <Typography align='right' component='p' variant='text270'>
                    {t('first_select_a_shop')}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Wrapper>
        </Stack>
      </SwipeableDrawer>
      <Dialog
        scroll='body'
        open={confirm.value}
        onClose={confirm.setFalse}
        PaperProps={{ sx: { width: '100%', maxWidth: { xs: 'calc(100% - 32px)', md: '440px' } } }}
      >
        <Stack p={{ xs: '24px 20px', md: '42px' }}>
          <Typography align='center' component='h3' variant='title70'>
            {props.name}
          </Typography>
          <Typography mt='10px' align='center' component='p' variant='text70'>
            {t('disconnect_partner_app_confirmation', { name: props.name })}
          </Typography>
          <Stack mt='24px' gap='14px' direction='row'>
            <Button fullWidth size='small' variant='contained' onClick={confirm.setFalse}>
              {t('cancel')}
            </Button>
            <LoadingButton
              fullWidth
              size='small'
              variant='outlined-red'
              loading={disconnect.isLoading}
              onClick={() => {
                disconnect.mutate()
              }}
            >
              {t('disconnect')}
            </LoadingButton>
          </Stack>
        </Stack>
      </Dialog>
    </>
  )
}
