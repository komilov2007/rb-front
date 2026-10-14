import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { FormProvider } from 'react-hook-form'
import { Spinner } from '@/components/spinner'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { Select } from '@/components/selects/select'
import { DISCOUNT_OPTIONS } from '@/constants/discount'
import InputAdornment from '@mui/material/InputAdornment'
import { InputDate } from '@/components/inputs/input-date'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { SelectProducts } from '@/pages/admin/products/pages/discount-restaurant/components/select-products'
import { InputTimePicker } from '@/components/inputs/input-timepicker'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { useFormDiscount, type FormDiscountProps } from './useFormDiscount'
import { useTranslation } from 'react-i18next'
import { SelectBranches } from '@/components/selects/select-branches'

export const Form = (props: FormDiscountProps) => {
  const { t } = useTranslation()
  const currency = useProfileStore(state => state.me?.currency?.code)
  const { form, value, setTrue, setFalse, onSubmit, isLoading, isFetching, isLoadingDetail } =
    useFormDiscount(props)

  return (
    <>
      {props.variant === 'add' ? (
        <Button
          onClick={setTrue}
          startIcon={<IconPlus />}
          sx={theme => ({
            svg: {
              path: {
                stroke: theme.palette.allColors.WHITE,
              },
            },
          })}
        >
          {t('add_discount')}
        </Button>
      ) : (
        <IconButton radius='8px' onClick={setTrue}>
          <IconEdit />
        </IconButton>
      )}
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
              <Typography variant='title30'>
                {t(props.variant === 'add' ? 'add_discount' : 'edit_discount')}
              </Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              {(isLoadingDetail || isFetching) && props.variant === 'edit' ? (
                <Spinner center />
              ) : (
                <Stack gap='28px'>
                  <Input
                    fullWidth
                    name='name'
                    label='name'
                    control={form.control}
                    placeholder='enter_name'
                  />
                  {props.variant === 'add' && (
                    <Select
                      name='type'
                      label='discount_type'
                      control={form.control}
                      options={Object.values(DISCOUNT_OPTIONS)}
                    />
                  )}
                  <Stack width='100%' maxWidth={{ xs: '100%', md: '230px' }}>
                    {form.watch('type') === 'PERCENT' ? (
                      <Input
                        fullWidth
                        type='tel'
                        name='percent'
                        label='percent'
                        control={form.control}
                        placeholder='enter_percent'
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Typography
                                pr='7px'
                                variant='text'
                                color={theme => theme.palette.allColors.PURPLE}
                              >
                                %
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      <InputPriceFormat
                        fullWidth
                        name='amount'
                        label='amount'
                        control={form.control}
                        placeholder='enter_amount'
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Typography
                                pr='7px'
                                variant='text'
                                color={theme => theme.palette.allColors.PURPLE}
                              >
                                {currency}
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Stack>
                  <SelectProducts discount_id={props.id} />
                  <Stack gap='7px'>
                    <Typography variant='title50'>{t('finish_date_time')}</Typography>
                    <Stack gap='18px' direction='row'>
                      <InputDate
                        disablePast
                        name='date'
                        format='DD.MM.YYYY'
                        control={form.control}
                        views={['year', 'month', 'day']}
                      />
                      <InputTimePicker name='time' control={form.control} />
                    </Stack>
                  </Stack>
                  <SelectBranches name='branches' control={form.control} />
                </Stack>
              )}
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton type='submit' fullWidth variant='contained' loading={isLoading}>
                  {t(props.variant === 'add' ? 'add' : 'edit')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
