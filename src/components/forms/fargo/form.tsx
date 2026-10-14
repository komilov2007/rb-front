import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import { FormProvider } from 'react-hook-form'
import { useFormUzpost } from './useFormUzpost'
import { ProductStock } from '../product-stock'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { Status, Wrapper, Container } from './style'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconFargo } from '@/assets/icons/fargo.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { SelectCityMerchant } from '@/components/selects/select-city-merchant'
import { SelectPaymentTypes } from '@/components/selects/select-payment-types'
import { ReactComponent as IconEditOutline } from '@/assets/icons/edit-outline.svg'
import { getCurrentDomainMeta } from '@/constants/domain-themes'

interface FormFargoProps {
  variant: 'delivery' | 'robo-market'
}

export const FormFargo = (props: FormFargoProps) => {
  const {
    t,
    open,
    form,
    modal,
    hasToken,
    onSubmit,
    handleOpen,
    getMerchant,
    handleDelete,
    postMerchant,
    deleteMerchant,
  } = useFormUzpost()

  const content = () => (
    <>
      <Box p='5px 32px 50px'>
        <Wrapper>
          <FormProvider {...form}>
            <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
              <Stack direction='row' justifyContent='space-between'>
                <Stack gap='10px' direction='row'>
                  <Stack
                    sx={{
                      svg: {
                        width: '36px',
                        height: '36px',
                      },
                    }}
                  >
                    <IconFargo />
                  </Stack>
                  <Stack justifyContent='center'>
                    <Typography variant='title50'>FARGO</Typography>
                    <Typography variant='text270'>
                      {t(
                        'it_is_the_largest_national_postal_service_in_uzbekistan_providing_delivery_services_across_all_regions_of_the_country_now_through_integration_with_appname_you_can_automatically_send_track_and_manage_your_orders',
                        { appName: getCurrentDomainMeta().appName },
                      )}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              {open.value || !hasToken ? (
                <Stack gap='15px' marginTop={'20px'}>
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
                  <InputPriceFormat
                    name='min_price'
                    control={form.control}
                    placeholder='enter_price'
                    label='minimum_order_amount'
                  />
                  <SelectPaymentTypes />
                  <SelectCityMerchant service_type='FARGO_DELIVERY' />
                  <Stack gap='15px' justifyContent='flex-end' direction='row'>
                    {open.value && (
                      <LoadingButton
                        size='small'
                        variant='filled-red'
                        onClick={open.setFalse}
                        sx={{ minWidth: '130px' }}
                      >
                        {t('cancel')}
                      </LoadingButton>
                    )}
                    <LoadingButton
                      size='small'
                      type='submit'
                      variant='contained'
                      sx={{ minWidth: '130px' }}
                      loading={postMerchant.isLoading}
                    >
                      {t('save')}
                    </LoadingButton>
                  </Stack>
                </Stack>
              ) : (
                <Stack gap='15px' justifyContent='flex-end' direction='row' marginTop={'20px'}>
                  <LoadingButton
                    size='small'
                    variant='filled-red'
                    onClick={handleDelete}
                    sx={{ minWidth: '130px' }}
                    loading={deleteMerchant.isLoading}
                  >
                    {t('delete')}
                  </LoadingButton>
                  <LoadingButton
                    size='small'
                    variant='contained'
                    onClick={open.setTrue}
                    sx={{ minWidth: '130px' }}
                  >
                    {t('edit')}
                  </LoadingButton>
                </Stack>
              )}
            </Box>
          </FormProvider>
        </Wrapper>
      </Box>
    </>
  )

  return (
    <>
      {props.variant === 'delivery' ? (
        getMerchant.isLoading ? (
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
                  <Stack gap='10px' direction='row' alignItems='center'>
                    <Stack
                      justifyContent='center'
                      sx={{
                        svg: {
                          width: '36px',
                          height: '36px',
                        },
                      }}
                    >
                      <IconFargo />
                    </Stack>
                    <Typography variant='title20' fontWeight='500'>
                      FARGO
                    </Typography>
                  </Stack>
                  {hasToken && <Status>{t('active')}</Status>}
                </Box>
                {hasToken ? (
                  <Button
                    size='small'
                    onClick={handleOpen}
                    variant='outlined-purple'
                    sx={{ minWidth: '98px' }}
                    startIcon={<IconEditOutline />}
                  >
                    {t('edit')}
                  </Button>
                ) : (
                  <Button
                    size='small'
                    onClick={handleOpen}
                    variant='contained-green'
                    sx={{ minWidth: '96px' }}
                  >
                    {t('add')}
                  </Button>
                )}
              </Box>
            </Container>
          </>
        )
      ) : (
        <>
          {getMerchant.isLoading ? (
            <Skeleton height='42px' width='100%' variant='rounded' />
          ) : (
            <LoadingButton
              onClick={modal.setTrue}
              variant='outlined-purple'
              loading={getMerchant.isLoading}
            >
              {t(hasToken ? 'installed' : 'install')}
            </LoadingButton>
          )}
        </>
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
        {content()}
      </SwipeableDrawer>
      <ProductStock />
    </>
  )
}
