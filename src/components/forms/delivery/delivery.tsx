import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useDelivery } from './useDelivery'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import { DELIVERIES } from '@/constants/delivery'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import { DeliveryBranches } from '../delivery-branches'
import InputAdornment from '@mui/material/InputAdornment'
import { TabLanguages } from '@/components/tab-languages'
import { FormProvider, Controller } from 'react-hook-form'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import { SelectCity } from '@/components/selects/select-city'
import { InputSwitch } from '@/components/inputs/input-switch'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { Status, Content, Container, BranchContent } from './style'
import { SelectCountry } from '@/components/selects/select-country'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { SelectPaymentTypes } from '@/components/selects/select-payment-types'
import { ReactComponent as IconEditOutline } from '@/assets/icons/edit-outline.svg'
import { ReactComponent as IconLocationMap } from '@/assets/icons/location-map.svg'

interface DeliveryProps {
  status?: boolean
}

export const Delivery = ({ status }: DeliveryProps) => {
  const { t } = useTranslation()
  const { currency, can_edit, can_delete } = useProfileStore(state => {
    return {
      currency: state.me?.currency?.code,
      can_edit: state.getPermission('delivery', 'can_edit'),
      can_delete: state.getPermission('delivery', 'can_delete'),
    }
  })
  const {
    data,
    form,
    value,
    panels,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleDelete,
    isLoadingDelete,
    isLoadingUpdate,
  } = useDelivery()

  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
      <InputTextarea
        name={p.name}
        label={p.label}
        control={form.control}
        sx={{ height: '110px' }}
        placeholder='for_example_delivery_is_made_through_the_millennium'
      />
    ),
  }))

  return status ? (
    isLoading ? (
      <Skeleton width='40px' height='17px' variant='rounded' sx={{ borderRadius: '4px' }} />
    ) : (
      <Typography
        variant='status'
        component='div'
        sx={theme => ({
          color: data?.data.is_active ? undefined : theme.palette.allColors.RED,
          backgroundColor: data?.data.is_active ? undefined : theme.palette.allColors.RED20,
        })}
      >
        {t(data?.data.is_active ? 'active' : 'in_active')}
      </Typography>
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
              {t('delivery')}
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
        {data?.data.is_active && (
          <Content>
            <Typography variant='text' component='h3' fontWeight='300'>
              {t('delivery_type')}{' '}
              <Typography
                variant='text'
                component='span'
                color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
              >
                {t(DELIVERIES[data.data.delivery].label)}
              </Typography>
            </Typography>
            {data.data.cities.length > 0 && (
              <Typography variant='text' component='h3' fontWeight='300'>
                {t('city')}:{' '}
                <Typography
                  variant='text'
                  component='span'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {data.data.cities.map(c => c.name).join(', ')}
                </Typography>
              </Typography>
            )}
            {data?.data.is_active && data.data.branches.length !== 0 && (
              <BranchContent>
                {data.data.branches
                  .filter(b => b.service.includes('DELIVERY'))
                  .map(b => (
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
              </BranchContent>
            )}
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
              <Typography variant='title30'>{t('add_delivery')}</Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Stack pb='15px'>
                <InputSwitch name='shipping_time' control={form.control} label='delivery_time' />
              </Stack>
              <FormControl fullWidth component='fieldset' sx={{ mb: '25px' }}>
                <Controller
                  name='delivery'
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      sx={{ gap: '16px' }}
                      onChange={e => {
                        field.onChange(e)
                        form.clearErrors()
                      }}
                    >
                      {Object.values(DELIVERIES).map(({ value, label }) => (
                        <FormControlLabel
                          key={value}
                          value={value}
                          label={t(label)}
                          control={<Radio />}
                          sx={{
                            '.MuiFormControlLabel-label': {
                              fontSize: 16,
                              fontWeight: 400,
                            },
                          }}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </FormControl>
              <Stack gap='24px'>
                <InputPriceFormat
                  name='min_price'
                  control={form.control}
                  placeholder='enter_price'
                  label='minimum_order_amount'
                />
                {form.watch('delivery') === DELIVERIES.CUSTOM.value && (
                  <Stack>
                    <TabLanguages panels={PANELS} />
                  </Stack>
                )}
                {form.watch('delivery') === DELIVERIES.FIXED.value && (
                  <InputPriceFormat
                    name='price'
                    label='shipping_cost'
                    control={form.control}
                    placeholder='enter_price'
                  />
                )}
                {(form.watch('delivery') === DELIVERIES.FLEXABLE.value ||
                  form.watch('delivery') === DELIVERIES.FIXED.value) && (
                  <Stack gap='24px'>
                    <InputSwitch
                      control={form.control}
                      name='is_free_threshold'
                      label='enable_free_delivery_for_orders_above_amount'
                    />
                    {form.watch('is_free_threshold') && (
                      <InputPriceFormat
                        name='max_price'
                        control={form.control}
                        placeholder='enter_price'
                        label='minimum_amount_for_free_delivery'
                      />
                    )}
                  </Stack>
                )}
                {form.watch('delivery') === DELIVERIES.FLEXABLE.value && (
                  <Stack
                    gap='14px'
                    sx={{
                      '.MuiFormControl-root': {
                        height: '30px',
                        maxWidth: '150px',
                        '.MuiInputBase-root': {
                          borderRadius: '6px',
                        },
                        input: {
                          paddingLeft: '10px !important',
                        },
                      },
                    }}
                  >
                    <Typography mt='5px'>{t('parameter')}</Typography>
                    <Box display='flex' alignItems='center'>
                      <Typography component='span'>{t('initial')}</Typography>
                      <Box width='fit-content' m='0 8px'>
                        <InputPriceFormat
                          name='inital_km'
                          control={form.control}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <Typography
                                  pr='6px'
                                  variant='text'
                                  color={theme => theme.palette.allColors.PURPLE}
                                >
                                  km
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      <Typography component='span'>{t('for')}</Typography>
                      <Box m='0 8px'>
                        <InputPriceFormat
                          name='inital_km_price'
                          control={form.control}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <Typography
                                  pr='6px'
                                  variant='text'
                                  color={theme => theme.palette.allColors.PURPLE}
                                >
                                  {currency}
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center'>
                      <Typography component='span'>{t('for_each_subsequent_km')}</Typography>
                      <Box m='0 8px'>
                        <InputPriceFormat
                          name='every_km_price'
                          control={form.control}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <Typography
                                  pr='6px'
                                  variant='text'
                                  color={theme => theme.palette.allColors.PURPLE}
                                >
                                  {currency}
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Box>
                  </Stack>
                )}
                <SelectPaymentTypes />
                <SelectCountry />
                <SelectCity />
                <Stack gap='10px'>
                  <Typography
                    component='h3'
                    fontWeight='400'
                    variant='title10'
                    textTransform='uppercase'
                  >
                    {t('branches')}
                  </Typography>
                  <DeliveryBranches type='DELIVERY' count={data?.data.branches.length} />
                </Stack>
              </Stack>
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
