import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import { Header } from '@/components/header'
import { Example } from '../category-example'
import { useMediaQuery } from '@mui/material'
import { Spinner } from '@/components/spinner'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import { useProductStore } from '@/store/product'
import { Input } from '@/components/inputs/input'
import { StyledContainer, Wrapper } from './style'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import { GenerateAi } from '@/components/generate-ai'
import { TabLanguages } from '@/components/tab-languages'
import { Controller, FormProvider } from 'react-hook-form'
import { WriteToAdmin } from '@/components/write-to-admin'
import FormControlLabel from '@mui/material/FormControlLabel'
import { InformationHelp } from '@/components/information-help'
import { CATEGORY_TYPES, SCROLL_TYPES } from '@/constants/category'
import { ReactComponent as IconPlusFill } from '@/assets/icons/plus-fill.svg'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import { SelectCategoriesOnlineShop } from '@/components/selects/select-categories-online-shop'
import { UploadCategoryOnlineShopImage } from '@/components/uploads/upload-category-online-shop-image'
import { UploadCategoryOnlineShopBanner } from '@/components/uploads/upload-category-online-shop-banner'
import {
  useFormCategoryOnlineShop,
  type FormCategoryOnlineShopProps,
} from './useFormCategoryOnlineShop'

export const FormCategoryOnlineShop = (props: FormCategoryOnlineShopProps) => {
  const {
    t,
    form,
    name,
    modal,
    panels,
    detail,
    topRef,
    onSubmit,
    isLoading,
    languages,
    handleBack,
    handleTranslateTitle,
    translateTitleLoading,
  } = useFormCategoryOnlineShop(props)

  const uploadLoading = useProductStore(state => state.uploadLoading)
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
      <Stack position='relative'>
        <Input
          fullWidth
          name={p.name}
          label={p.label}
          control={form.control}
          placeholder='enter_category_name'
        />
        <Stack top='-15px' right='0' position='absolute'>
          {languages.length > 1 && (
            <GenerateAi
              title='translate'
              loadingIndicator='translating'
              disabled={!(name?.length > 1)}
              onClick={handleTranslateTitle}
              loading={translateTitleLoading}
              message='enter_category_name'
            />
          )}
        </Stack>
      </Stack>
    ),
  }))

  return (
    <>
      {props.variant === 'create' && (
        <Button
          fullWidth
          variant='text'
          onClick={modal.setTrue}
          startIcon={<IconPlusFill />}
          sx={{ justifyContent: 'flex-start' }}
        >
          {t('add_new_category')}
        </Button>
      )}
      <Dialog
        fullScreen
        open={modal.value}
        sx={{ zIndex: 1300000 }}
        PaperProps={{
          sx: theme => ({
            borderRadius: '0',
            backgroundColor: theme.palette.allColors.GRAY770,
          }),
        }}
      >
        <FormProvider {...form}>
          <Stack gap='18px' height='100%' component='form' overflow='hidden' onSubmit={onSubmit}>
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
                    type='submit'
                    fullWidth
                    size='small'
                    variant='contained'
                    loading={isLoading}
                    disabled={uploadLoading}
                  >
                    {t('save')}
                  </LoadingButton>
                </>
              )}
            </Header>
            {detail.isLoading && props.variant === 'edit' ? (
              <Spinner center />
            ) : (
              <Stack height='100%' overflow='auto' width='100%'>
                <StyledContainer>
                  {mobile && (
                    <Stack mb='10px' alignItems='flex-start'>
                      <Button
                        variant='text-gray'
                        onClick={handleBack}
                        startIcon={<IconArrowLeft />}
                      >
                        {t('back')}
                      </Button>
                    </Stack>
                  )}
                  <Stack component='aside' />
                  <Stack gap='24px' component='body'>
                    <Wrapper ref={topRef} sx={{ p: '18px' }}>
                      <TabLanguages panels={PANELS} />
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
                        <Typography variant='title160'>{t('category_type')}</Typography>
                        <InformationHelp title='Text' />
                      </Stack>
                      <Stack p='18px'>
                        <FormControl fullWidth component='fieldset' sx={{ ml: '-9px' }}>
                          <Controller
                            name='category_type'
                            control={form.control}
                            render={({ field: { onChange, ...rest } }) => (
                              <RadioGroup
                                {...rest}
                                onChange={e => {
                                  onChange(e)
                                  if (e.target.value === CATEGORY_TYPES.ADD.value) {
                                    form.setValue('parent_id', null)
                                  }
                                }}
                                sx={{ gap: '40px', flexDirection: 'row' }}
                              >
                                {Object.values(CATEGORY_TYPES).map(({ value, label }) => (
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
                        {form.watch('category_type') === CATEGORY_TYPES.ASSIGN.value && (
                          <Stack mt='20px'>
                            <SelectCategoriesOnlineShop />
                          </Stack>
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
                        <Typography variant='title160'>{t('category_image')}</Typography>
                        <InformationHelp title='Text' />
                      </Stack>
                      <Stack p='18px'>
                        <UploadCategoryOnlineShopImage />
                        <Divider sx={{ my: '20px' }} />
                        <Example />
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
                        <Typography variant='title160'>{t('product_placement')}</Typography>
                        <InformationHelp title='Text' />
                      </Stack>
                      <Stack p='18px'>
                        <FormControl fullWidth component='fieldset' sx={{ ml: '-9px' }}>
                          <Controller
                            name='scroll_type'
                            control={form.control}
                            render={({ field }) => (
                              <RadioGroup {...field} sx={{ gap: '40px', flexDirection: 'row' }}>
                                {Object.values(SCROLL_TYPES).map(({ value, label }) => (
                                  <FormControlLabel
                                    key={value}
                                    value={value}
                                    label={t(label)}
                                    control={<Radio />}
                                    sx={{ fontWeight: 400 }}
                                  />
                                ))}
                              </RadioGroup>
                            )}
                          />
                        </FormControl>
                      </Stack>
                    </Wrapper>
                    {form.watch('category_type') === CATEGORY_TYPES.ADD.value && (
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
                          <Typography variant='title160'>{t('attach_banner')}</Typography>
                          <Typography variant='text300'>{t('optional')}</Typography>
                          <InformationHelp title='Text' />
                        </Stack>
                        <Stack p='18px'>
                          <UploadCategoryOnlineShopBanner />
                        </Stack>
                      </Wrapper>
                    )}
                    <Wrapper sx={{ p: '18px', mb: '24px' }}>
                      <Button disabled={uploadLoading} fullWidth type='submit' size='small'>
                        {t('save')}
                      </Button>
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

                  <Stack component='aside' position='relative'>
                    <Stack position='sticky' top='0'>
                      <WriteToAdmin title='having_trouble_adding_a_category' />
                    </Stack>
                  </Stack>
                </StyledContainer>
              </Stack>
            )}
          </Stack>
        </FormProvider>
      </Dialog>
    </>
  )
}
