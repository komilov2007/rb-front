import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { PreviewBanner } from './preview'
import { Example, ExampleCategory } from '../banner-example'
import Divider from '@mui/material/Divider'
import { Header } from '@/components/header'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import RadioGroup from '@mui/material/RadioGroup'
import LoadingButton from '@mui/lab/LoadingButton'
import { StyledContainer, Wrapper } from './style'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import { TabLanguages } from '@/components/tab-languages'
import { Controller, FormProvider } from 'react-hook-form'
import { WriteToAdmin } from '@/components/write-to-admin'
import { BANNER_TYPE, LINK_TYPE } from '@/constants/banner'
import FormControlLabel from '@mui/material/FormControlLabel'
import { InformationHelp } from '@/components/information-help'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import { useFormBannerOnlineShop, type FormBannerProps } from './useFormBannerOnlineShop'
import { UploadBannerOnlineShopImage } from '@/components/uploads/upload-banner-online-shop'
import { SelectProductsOnlineShopBanner } from '@/components/selects/select-products-online-shop-banner/select'
import { SelectCategoriesOnlineShopProducts } from '@/components/selects/select-categories-online-shop-products'

export const FormBannerOnlineShop = (props: FormBannerProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    form,
    data,
    panels,
    detail,
    btnName,
    onSubmit,
    linkType,
    isCreate,
    isLoading,
    handleBack,
    bannerType,
    mobilePhoto,
    handleSubscription,
    handleDeleteCategory,
  } = useFormBannerOnlineShop(props)

  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
      <>
        <Stack>
          <Input
            fullWidth
            name={p.name}
            label={p.label}
            control={form.control}
            placeholder='example_cta'
          />
        </Stack>
      </>
    ),
  }))

  const content = (
    <>
      <Stack height='100%' overflow='auto' width='100%'>
        <StyledContainer
          maxWidth={isCreate ? '650px' : 'lg'}
          gridTemplateColumns={isCreate ? '1fr' : '0.24fr 0.52fr 0.24fr'}
        >
          {mobile && (
            <Stack mb='10px' alignItems='flex-start'>
              <Button variant='text-gray' onClick={handleBack} startIcon={<IconArrowLeft />}>
                {t('back')}
              </Button>
            </Stack>
          )}
          {!isCreate && (
            <Stack component='aside' mb='24px' position='relative'>
              <Stack position='sticky' top='0'>
                <WriteToAdmin title='having_trouble_adding_a_banner' />
              </Stack>
            </Stack>
          )}
          <Stack>
            <Stack
              gap='24px'
              component='form'
              className='container'
              onSubmit={form.handleSubmit(onSubmit)}
            >
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
                  <Typography variant='title160'>{t('banner_type')}</Typography>
                  <InformationHelp title='Text' />
                </Stack>
                <Stack p='18px'>
                  <FormControl fullWidth component='fieldset' sx={{ ml: '-9px' }}>
                    <Controller
                      name='banner_type'
                      control={form.control}
                      render={({ field: { value, onChange, ...rest } }) => (
                        <RadioGroup
                          {...rest}
                          value={value ?? ''}
                          onChange={e => {
                            onChange(e)
                            form.setValue('mobile_photo', '')
                            if (
                              e.target.value === BANNER_TYPE.CATEGORY.value &&
                              linkType === LINK_TYPE.PRODUCT.value
                            ) {
                              form.setValue('link_type', null)
                              form.setValue('product_id', null)
                              form.setValue('product_name', '')
                            }
                          }}
                          sx={{ gap: { sm: '20px', md: '40px' }, flexDirection: 'row' }}
                        >
                          {Object.values(BANNER_TYPE).map(({ value, label }) => (
                            <FormControlLabel
                              key={value}
                              value={value}
                              control={<Radio />}
                              disabled={!data.data.enableMainBanner && value === 'MAIN'}
                              onClick={
                                value === BANNER_TYPE.MAIN.value ? handleSubscription : undefined
                              }
                              label={
                                <Typography
                                  variant='text200'
                                  sx={theme => ({
                                    color:
                                      !data.data.enableMainBanner &&
                                      value === BANNER_TYPE.MAIN.value
                                        ? theme.palette.allColors.GRAY30
                                        : theme.palette.allColors.BLACK200,
                                  })}
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
                  <Typography variant='title160'>{t('mobile_banner')}</Typography>
                  <InformationHelp title='Text' />
                </Stack>
                <Stack p='18px'>
                  <UploadBannerOnlineShopImage
                    variant='mobile'
                    name='mobile_photo'
                    control={form.control}
                    htmlFor='upload-banner-online-shop-image'
                    hasVideo={bannerType === BANNER_TYPE.MAIN.value}
                    textSize={
                      bannerType === BANNER_TYPE.CATEGORY.value
                        ? '1000px_x_400px_is_recommended_file_size_up_to_10_mb'
                        : '1080px_x_1920px_is_recommended_file_size_up_to_4_mb'
                    }
                  />
                </Stack>
                {bannerType !== BANNER_TYPE.CATEGORY.value && (
                  <>
                    <Stack
                      gap='10px'
                      p='10px 18px'
                      direction='row'
                      alignItems='center'
                      sx={theme => ({
                        borderBottom: `1px solid ${theme.palette.allColors.GRAY780}`,
                      })}
                    >
                      <Typography variant='title160'>{t('desktop_banner')}</Typography>
                      <InformationHelp title='Text' />
                    </Stack>
                    <Stack p='18px' pb={0}>
                      <UploadBannerOnlineShopImage
                        variant='desktop'
                        name='desktop_photo'
                        control={form.control}
                        setValue={form.setValue}
                        htmlFor='upload-desktop-banner-online-shop-image'
                        hasVideo={bannerType === BANNER_TYPE.MAIN.value}
                        textSize='1600px_x_500px_is_recommended_file_size_up_to_4_mb'
                      />
                    </Stack>
                  </>
                )}
                <Stack p='18px' pt={0}>
                  <Divider sx={{ my: '20px' }} />
                  {bannerType === BANNER_TYPE.CATEGORY.value ? <ExampleCategory /> : <Example />}
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
                  <Typography variant='title160'>
                    {bannerType === BANNER_TYPE.CATEGORY.value ? t('select_category') : t('link')}
                  </Typography>
                  <InformationHelp title='Text' />
                </Stack>
                <Stack p='18px' gap='24px'>
                  {bannerType !== BANNER_TYPE.CATEGORY.value && (
                    <FormControl fullWidth component='fieldset'>
                      <Controller
                        name='link_type'
                        control={form.control}
                        render={({ field: { value, onChange, ...rest } }) => (
                          <RadioGroup
                            {...rest}
                            value={value ?? ''}
                            onChange={onChange}
                            sx={{ flexDirection: 'row' }}
                          >
                            {Object.values(LINK_TYPE).map(({ value, label }) => (
                              <FormControlLabel
                                key={value}
                                value={value}
                                control={<Radio />}
                                disabled={
                                  value === LINK_TYPE.PRODUCT.value &&
                                  bannerType === BANNER_TYPE.CATEGORY.value
                                }
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
                            {linkType && bannerType === BANNER_TYPE.MAIN.value && (
                              <Button
                                sx={{ width: '100px', ml: '10px' }}
                                variant='outlined'
                                size='small'
                                onClick={handleDeleteCategory}
                              >
                                {t('delete')}
                              </Button>
                            )}
                          </RadioGroup>
                        )}
                      />
                    </FormControl>
                  )}
                  {bannerType === BANNER_TYPE.CATEGORY.value ? (
                    <SelectCategoriesOnlineShopProducts />
                  ) : linkType ? (
                    <>
                      {linkType === LINK_TYPE.PRODUCT.value ? (
                        <SelectProductsOnlineShopBanner />
                      ) : (
                        <SelectCategoriesOnlineShopProducts />
                      )}
                      {bannerType === BANNER_TYPE.MAIN.value && (
                        <Stack>
                          <TabLanguages panels={PANELS} />
                        </Stack>
                      )}
                    </>
                  ) : null}
                </Stack>
              </Wrapper>
              <Wrapper sx={{ p: '18px', mb: '24px' }}>
                <LoadingButton
                  loading={isLoading}
                  fullWidth
                  onClick={form.handleSubmit(onSubmit)}
                  size='small'
                  variant='contained'
                >
                  {t('save')}
                </LoadingButton>
                {mobile && (
                  <Button
                    sx={{ mt: '8px' }}
                    fullWidth
                    variant='outlined-transparent'
                    size='small'
                    onClick={handleBack}
                  >
                    {t('cancel')}
                  </Button>
                )}
              </Wrapper>
            </Stack>
          </Stack>
          {!mobile && (
            <Stack component='aside' position='relative'>
              <Stack position='sticky' top='0'>
                <PreviewBanner img={mobilePhoto} variant={bannerType} btnName={btnName} />
              </Stack>
            </Stack>
          )}
        </StyledContainer>
      </Stack>
    </>
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
        {detail.isLoading && props.variant === 'edit' ? (
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
