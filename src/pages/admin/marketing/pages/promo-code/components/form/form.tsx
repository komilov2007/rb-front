import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import { Input } from '@/components/inputs/input'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import { InputDate } from '@/components/inputs/input-date'
import { Controller, FormProvider } from 'react-hook-form'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { PROMO_CODE_OPTIONS } from '@/constants/promo-code'
import FormControlLabel from '@mui/material/FormControlLabel'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { InputTimePicker } from '@/components/inputs/input-timepicker'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { useFormPromoCode, type FormPromoCodeProps } from './useFormPromoCode'

export const FormPromoCode = (props: FormPromoCodeProps) => {
  const { t } = useTranslation()
  const currency = useProfileStore(state => state.me?.currency?.code)
  const {
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleOpen,
    isFetching,
    isLoadingDetail,
  } = useFormPromoCode(props)

  return (
    <>
      {props.variant === 'add' ? (
        <Button
          onClick={handleOpen}
          startIcon={<IconPlus />}
          sx={theme => ({
            svg: {
              path: {
                stroke: theme.palette.allColors.WHITE,
              },
            },
          })}
        >
          {t('create_promokod')}
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
                {t(props.variant === 'add' ? 'create_promo_code' : 'edit_promo_code')}
              </Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              {(isFetching || isLoadingDetail) && props.variant === 'edit' ? (
                <Spinner center />
              ) : (
                <>
                  {props.variant === 'add' && (
                    <Controller
                      name='type'
                      control={form.control}
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          sx={{
                            mb: '37px',
                            width: 'fit-content',
                          }}
                        >
                          {Object.values(PROMO_CODE_OPTIONS).map(({ value, label }) => (
                            <FormControlLabel
                              key={value}
                              value={value}
                              control={<Radio />}
                              label={
                                <Typography
                                  variant='text'
                                  color={theme => theme.palette.allColors.BLACK30}
                                >
                                  {t(label)}
                                </Typography>
                              }
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                  )}
                  <Stack gap='28px'>
                    <Stack gap='28px' direction='row'>
                      <Stack width='100%'>
                        <Input
                          fullWidth
                          name='code'
                          label='promokod'
                          control={form.control}
                          placeholder='enter_promo_code'
                          sx={{
                            maxWidth: '255px',
                            input: {
                              textTransform: 'uppercase',
                            },
                          }}
                        />
                        <InputCheckbox
                          name='first_order'
                          control={form.control}
                          label='for_order_1_only'
                          sx={{
                            ml: '-9px',
                            width: 'fit-content',
                          }}
                        />
                      </Stack>
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
                    <Stack gap='18px' direction='row'>
                      <Input
                        fullWidth
                        name='limit'
                        type='tel'
                        label='limit'
                        control={form.control}
                        placeholder='enter_limit'
                      />
                      <InputPriceFormat
                        fullWidth
                        name='min_amount'
                        label='min_amount'
                        control={form.control}
                        placeholder='enter_min_amount'
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
                    </Stack>
                    <Stack gap='7px'>
                      <Typography variant='title50'>{t('finish_date_time')}</Typography>
                      <Stack gap='18px' direction='row'>
                        <InputDate
                          disablePast
                          name='end_date'
                          format='DD.MM.YYYY'
                          control={form.control}
                          views={['year', 'month', 'day']}
                        />
                        <InputTimePicker name='end_time' control={form.control} />
                      </Stack>
                    </Stack>
                  </Stack>
                </>
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
