import Box from '@mui/material/Box'
import { usePickUp } from './usePickUp'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { Status, Content, Container } from './style'
import { DeliveryBranches } from '../delivery-branches'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconEditOutline } from '@/assets/icons/edit-outline.svg'
import { ReactComponent as IconLocationMap } from '@/assets/icons/location-map.svg'
import { InputSwitch } from '@/components/inputs/input-switch'

interface PickUpProps {
  status?: boolean
}

export const PickUp = ({ status }: PickUpProps) => {
  const { t } = useTranslation()
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('delivery', 'can_edit'),
      can_delete: state.getPermission('delivery', 'can_delete'),
    }
  })
  const {
    data,
    form,
    value,
    setTrue,
    branches,
    setFalse,
    onSubmit,
    isLoading,
    handleDelete,
    isLoadingDelete,
    isLoadingUpdate,
  } = usePickUp()

  return status ? (
    isLoading ? (
      <Skeleton width='40px' height='17px' variant='rounded' sx={{ borderRadius: '4px' }} />
    ) : (
      <Status
        sx={theme => ({
          backgroundColor: data?.data.is_active
            ? theme.palette.allColors.GREEN40
            : theme.palette.allColors.RED20,
          color: data?.data.is_active ? theme.palette.allColors.GREEN : theme.palette.allColors.RED,
        })}
      >
        {t(data?.data.is_active ? 'active' : 'in_active')}
      </Status>
    )
  ) : isLoading ? (
    <Skeleton
      height={150}
      variant='rounded'
      sx={{
        width: '100%',
        maxWidth: '519px',
        borderRadius: '9px',
        minWidth: { xs: '100%', md: '519px' },
      }}
    />
  ) : (
    <>
      <Container>
        <Box width='100%' display='flex' justifyContent='space-between'>
          <Box gap='17px' display='flex' alignItems='center'>
            <Typography variant='title20' fontWeight='500'>
              {t('pick_up')}
            </Typography>
            {data?.data.is_active && <Status>{t('active')}</Status>}
          </Box>
          {data?.data.is_active ? (
            can_edit || can_delete ? (
              <Button
                size='small'
                onClick={setTrue}
                variant='outlined-purple'
                sx={{ minWidth: '98px' }}
                startIcon={<IconEditOutline />}
              >
                {t('edit')}
              </Button>
            ) : null
          ) : (
            <Button
              size='small'
              onClick={setTrue}
              variant='contained-green'
              sx={{ minWidth: '96px' }}
            >
              {t('add')}
            </Button>
          )}
        </Box>
        {data?.data.is_active && branches.length !== 0 && (
          <Content>
            {branches.map(b => (
              <Stack
                p='12px'
                gap='13px'
                key={b.id}
                component='li'
                direction='row'
                alignItems='center'
              >
                <Stack>
                  <IconLocationMap />
                </Stack>
                <Stack>
                  <Typography variant='text60'>{b.name}</Typography>
                  <Typography
                    variant='text'
                    color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                  >
                    {b.address}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Content>
        )}
      </Container>
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        <FormProvider {...form}>
          <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
            <Box
              display='flex'
              p='7px 7px 0 32px'
              component='header'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='title30'>{t('add_take_away')}</Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Stack pb='15px'>
                <InputSwitch name='shipping_time' control={form.control} label='pick_up_time' />
              </Stack>
              <DeliveryBranches type='PICKUP' count={data?.data.branches.length} />
            </Box>
            <Box className='footer'>
              <Stack
                gap='14px'
                width='100%'
                direction='row'
                maxWidth={data?.data.is_active ? '481px' : '316px'}
              >
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                {data?.data.is_active && can_delete && (
                  <LoadingButton
                    fullWidth
                    variant='filled-red'
                    onClick={handleDelete}
                    loading={isLoadingDelete}
                  >
                    {t('delete')}
                  </LoadingButton>
                )}
                {can_edit && (
                  <LoadingButton
                    fullWidth
                    type='submit'
                    variant='contained'
                    loading={isLoadingUpdate}
                  >
                    {t('save')}
                  </LoadingButton>
                )}
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
