import { Image } from '../image'
import { Counter } from '../counter'
import Stack from '@mui/material/Stack'
import { useDetail } from './useDetail'
import Radio from '@mui/material/Radio'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { Pagination } from 'swiper/modules'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import { Swiper, SwiperSlide } from 'swiper/react'
import { numberFormat } from '@/utils/number-format'
import { forwardRef, useImperativeHandle } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Controller, FormProvider } from 'react-hook-form'
import { type OrderProductsProps } from '@/types/products'
import { Footer, WrapClose, WrapperCarousel } from './style'
import FormControlLabel from '@mui/material/FormControlLabel'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { ReactComponent as IconCart } from '@/assets/icons/cart.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

import 'swiper/css'
import 'swiper/css/pagination'

export const Detail = forwardRef((props: OrderProductsProps, ref) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const currency = useProfileStore(state => state.me?.currency?.code)
  const {
    count,
    data,
    form,
    value,
    single,
    setTrue,
    multiple,
    setFalse,
    onSubmit,
    isLoading,
    handleUpdateCount,
  } = useDetail(props)

  useImperativeHandle(ref, () => {
    return {
      setTrue,
    }
  }, [setTrue])

  return (
    <Dialog
      fullWidth
      fullScreen={matches}
      open={value}
      scroll='body'
      onClose={setFalse}
      PaperProps={matches ? { sx: { borderRadius: 0 } } : undefined}
    >
      <Stack height='100%' flexGrow={1}>
        {isLoading ? (
          <Stack flexGrow={1} minHeight='400px' justifyContent='center'>
            <Spinner center />
          </Stack>
        ) : (
          <FormProvider {...form}>
            <Stack
              height='100%'
              flexGrow={1}
              component='form'
              position='relative'
              justifyContent='space-between'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <WrapClose>
                <IconButton
                  onClick={setFalse}
                  sx={theme => ({
                    p: 0,
                    width: '36px',
                    height: '36px',
                    backgroundColor: theme.palette.allColors.WHITE,
                    ':hover': {
                      backgroundColor: theme.palette.allColors.WHITE,
                    },
                  })}
                >
                  <IconRemove />
                </IconButton>
              </WrapClose>
              <Stack>
                <WrapperCarousel
                  sx={{
                    borderRadius: matches ? '0' : '18px 18px 0 0',
                  }}
                >
                  <Swiper slidesPerView={1} modules={[Pagination]} pagination={true}>
                    {data?.photos.map((photo, index) => (
                      <SwiperSlide key={index}>
                        <Stack height='330px'>
                          <Image
                            src={photo.photo}
                            alt=''
                            radius={matches ? '0' : '18px 18px 0 0'}
                          />
                        </Stack>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </WrapperCarousel>
                <Stack p='20px'>
                  <Typography variant='title10'>{data?.name}</Typography>
                  <Typography
                    m='4px 0 9px'
                    fontSize='16px'
                    variant='title70'
                    color={theme => theme.palette.allColors.PURPLE}
                  >
                    {numberFormat(data?.price as string)} {currency}
                  </Typography>
                  <Typography
                    component='p'
                    variant='title20'
                    color={theme => theme.palette.allColors.BLACK130}
                    dangerouslySetInnerHTML={{ __html: data?.desc as string }}
                  />
                  <Stack mt='24px' gap='24px'>
                    <Stack gap='9px'>
                      <Typography variant='title50' component='h5'>
                        {data?.parameter?.name}
                      </Typography>
                      <Controller
                        name='parameter'
                        control={form.control}
                        render={({ field, fieldState: { invalid } }) => (
                          <RadioGroup
                            {...field}
                            error={invalid}
                            value={field.value ?? ''}
                            sx={{
                              ml: '-9px',
                            }}
                          >
                            {data?.parameter?.skus.map(({ id, price, name }) => (
                              <FormControlLabel
                                key={id}
                                value={id}
                                control={<Radio />}
                                sx={{
                                  '.MuiFormControlLabel-label': {
                                    width: '100%',
                                  },
                                }}
                                label={
                                  <Stack
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                  >
                                    <Typography
                                      color={theme =>
                                        invalid ? theme.palette.allColors.RED : 'inherit'
                                      }
                                    >
                                      {name}
                                    </Typography>
                                    <Typography variant='text' component='h6'>
                                      {numberFormat(price)} {currency}
                                    </Typography>
                                  </Stack>
                                }
                              />
                            ))}
                          </RadioGroup>
                        )}
                      />
                    </Stack>

                    <Stack gap='24px'>
                      {single.fields.map((f, index) => (
                        <Stack gap='9px' key={f.id}>
                          <Typography variant='title50' component='h5'>
                            {data?.parameter?.name}
                          </Typography>
                          <Controller
                            control={form.control}
                            name={`single.${index}.value`}
                            render={({ field, fieldState: { invalid } }) => (
                              <RadioGroup
                                {...field}
                                error={invalid}
                                value={field.value ?? ''}
                                sx={{
                                  ml: '-9px',
                                }}
                              >
                                {f?.skus.map(({ id, price, name }) => (
                                  <FormControlLabel
                                    key={id}
                                    value={id}
                                    control={<Radio />}
                                    sx={{
                                      '.MuiFormControlLabel-label': {
                                        width: '100%',
                                      },
                                    }}
                                    label={
                                      <Stack
                                        direction='row'
                                        alignItems='center'
                                        justifyContent='space-between'
                                      >
                                        <Typography
                                          color={theme =>
                                            invalid ? theme.palette.allColors.RED : 'inherit'
                                          }
                                        >
                                          {name}
                                        </Typography>
                                        <Typography variant='text' component='h6'>
                                          + {numberFormat(price)} {currency}
                                        </Typography>
                                      </Stack>
                                    }
                                  />
                                ))}
                              </RadioGroup>
                            )}
                          />
                        </Stack>
                      ))}
                    </Stack>

                    <Stack gap='24px'>
                      {multiple.fields.map((f, index) => (
                        <Stack gap='9px' key={f.id}>
                          <Typography>{f.name}</Typography>
                          {f.skus.map((parameter, i) => (
                            <InputCheckbox
                              key={i}
                              component='li'
                              sx={{
                                ml: '-9px',
                                '.MuiFormControlLabel-label': {
                                  width: '100%',
                                },
                              }}
                              label={
                                <Stack width='100%' direction='row' justifyContent='space-between'>
                                  <Typography>{parameter.name}</Typography>
                                  <Typography>
                                    + {numberFormat(parameter.price)} {currency}
                                  </Typography>
                                </Stack>
                              }
                              control={form.control}
                              id={`multiple.${index}.skus.${i}.check`}
                              name={`multiple.${index}.skus.${i}.check`}
                              error={!!form.formState.errors.multiple}
                            />
                          ))}
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Footer>
                <Counter
                  {...props}
                  count={count}
                  variant='detail'
                  handleUpdateCount={handleUpdateCount}
                />
                <Button
                  fullWidth
                  type='submit'
                  startIcon={<IconCart />}
                  sx={{ height: { xs: '44px', md: '54px' }, borderRadius: '12px !important' }}
                >
                  {t('add_to_cart')}
                </Button>
              </Footer>
            </Stack>
          </FormProvider>
        )}
      </Stack>
    </Dialog>
  )
})
