import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { Header } from '@/components/header'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import { useProfileStore } from '@/store/profile'
import RadioGroup from '@mui/material/RadioGroup'
import LoadingButton from '@mui/lab/LoadingButton'
import { StyledContainer, Wrapper } from './style'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'
import { Controller, FormProvider } from 'react-hook-form'
import { InputDate } from '@/components/inputs/input-date'
import { WriteToAdmin } from '@/components/write-to-admin'
import FormControlLabel from '@mui/material/FormControlLabel'
import { InformationHelp } from '@/components/information-help'
import { DISCOUNT_OPTIONS_ONLINE_SHOP } from '@/constants/discount'
import { InputTimePicker } from '@/components/inputs/input-timepicker'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { useFormDiscount, type FormDiscountProps } from './useFormDiscount'
import { SelectProducts } from '@/components/forms/discount-online-shop/components/select-products'

export const FormDiscountOnlineShop = (props: FormDiscountProps) => {
  const { t } = useTranslation()
  const currency = useProfileStore(state => state.me?.currency?.code)
  const { form, handleBack, onSubmit, isLoading, isFetching, isLoadingDetail, discountId } =
    useFormDiscount(props)
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const content = (
    <Stack height='100%' overflow='auto' width='100%'>
      <StyledContainer maxWidth='lg' gridTemplateColumns='0.24fr 0.52fr 0.24fr'>
        <Stack component='aside' />
        <Stack
          gap='24px'
          className='container'
          component='form'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Box className='content'>
            <Stack gap='28px'>
              <Wrapper>
                <Stack
                  gap='10px'
                  p='10px 18px'
                  direction='row'
                  alignItems='center'
                  sx={theme => ({
                    borderBottom: `1px solid ${theme.palette.allColors.GRAY780}`,
                  })}
                >
                  <Typography variant='title160'>{t('discount_name')}</Typography>
                  <InformationHelp title='Text' />
                </Stack>
                <Stack p='18px'>
                  <Input
                    fullWidth
                    name='name'
                    label='name'
                    control={form.control}
                    placeholder='enter_name'
                  />
                </Stack>
              </Wrapper>
              <Wrapper>
                <Stack
                  gap='10px'
                  p='10px 18px'
                  direction='row'
                  alignItems='center'
                  sx={theme => ({
                    borderBottom: `1px solid ${theme.palette.allColors.GRAY780}`,
                  })}
                >
                  <Typography variant='title160'>{t('discount_type')}</Typography>
                  <InformationHelp title='Text' />
                </Stack>
                <Stack p='18px'>
                  <FormControl fullWidth component='fieldset' sx={{ ml: '-9px' }}>
                    <Controller
                      name='discount_type'
                      control={form.control}
                      render={({ field: { value, onChange, ...rest } }) => (
                        <RadioGroup
                          {...rest}
                          value={value ?? ''}
                          onChange={e => {
                            onChange(e)
                          }}
                          sx={{ gap: '40px', flexDirection: 'row' }}
                        >
                          {Object.values(DISCOUNT_OPTIONS_ONLINE_SHOP).map(({ value, label }) => (
                            <FormControlLabel
                              key={value}
                              value={value}
                              control={<Radio />}
                              label={
                                <Typography
                                  variant='text200'
                                  sx={theme => ({ color: theme.palette.allColors.BLACK200 })}
                                >
                                  {t(label)}
                                </Typography>
                              }
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Stack>

                <Stack p='18px'>
                  {form.watch('discount_type') === 'PERCENT' ? (
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
              </Wrapper>

              <Wrapper>
                <Stack
                  gap='10px'
                  p='10px 18px'
                  direction='row'
                  alignItems='center'
                  sx={theme => ({
                    borderBottom: `1px solid ${theme.palette.allColors.GRAY780}`,
                  })}
                >
                  <Typography variant='title160'>{t('attach_discount')}</Typography>
                  <InformationHelp title='Text' />
                </Stack>
                <Stack p='18px'>
                  <SelectProducts discount_id={Number(discountId)} />
                </Stack>
                <Stack gap='7px' p='18px'>
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
              </Wrapper>

              <Wrapper>
                <Stack
                  gap='10px'
                  p='10px 18px'
                  direction='row'
                  alignItems='center'
                  sx={theme => ({
                    borderBottom: `1px solid ${theme.palette.allColors.GRAY780}`,
                  })}
                >
                  <Typography variant='title160'>{t('min_amount')}</Typography>
                  <Typography variant='text300'>{t('optional')}</Typography>
                  <InformationHelp title='Text' />
                </Stack>

                <Stack p='18px'>
                  <InputPriceFormat
                    fullWidth
                    name='min_order_value'
                    label={t('enter_min_amount')}
                    control={form.control}
                    placeholder={t('enter_min_amount')}
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
              </Wrapper>
            </Stack>
          </Box>
          <Wrapper>
            <Stack p='18px' gap='14px'>
              {mobile && (
                <Button fullWidth variant='outlined-transparent'>
                  {t('cancel')}
                </Button>
              )}
              <LoadingButton
                fullWidth
                variant='contained'
                onClick={form.handleSubmit(onSubmit)}
                loading={isLoading}
              >
                {t(props.variant === 'add' ? 'save' : 'edit')}
              </LoadingButton>
            </Stack>
          </Wrapper>
        </Stack>
        <Stack component='aside' position='relative'>
          <Stack position='sticky' top='0'>
            <WriteToAdmin title='having_trouble_adding_a_discount' />
          </Stack>
        </Stack>
      </StyledContainer>
    </Stack>
  )

  return (
    <>
      <Dialog
        open
        fullScreen
        PaperProps={{
          sx: theme => ({ borderRadius: '0', backgroundColor: theme.palette.allColors.GRAY770 }),
        }}
      >
        {(isLoadingDetail || isFetching) && props.variant === 'edit' ? (
          <Spinner center />
        ) : (
          <FormProvider {...form}>
            <Stack
              gap='18px'
              height='100%'
              component='form'
              overflow='hidden'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Header>
                {!mobile && (
                  <>
                    <Button
                      fullWidth
                      variant='outlined-transparent'
                      size='small'
                      onClick={handleBack}
                    >
                      {t('cancel')}
                    </Button>
                    <LoadingButton
                      fullWidth
                      size='small'
                      type='submit'
                      variant='contained'
                      loading={isLoading}
                    >
                      {t('save')}
                    </LoadingButton>
                  </>
                )}
              </Header>
              {content}
            </Stack>
          </FormProvider>
        )}
      </Dialog>
    </>
  )
}
