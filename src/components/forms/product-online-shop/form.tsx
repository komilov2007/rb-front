import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import { Tags } from './components/tags'
import { Ikpu } from './components/ikpu'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { Price } from './components/price'
import { ROUTER } from '@/constants/router'
import { Header } from '@/components/header'
import { FormProvider } from 'react-hook-form'
import { Spinner } from '@/components/spinner'
import { useTheme } from '@mui/material/styles'
import { Variants } from './components/variants'
import { Category } from './components/category'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { GenerateAi } from '@/components/generate-ai'
import useMediaQuery from '@mui/material/useMediaQuery'
import { TabLanguages } from '@/components/tab-languages'
import { WriteToAdmin } from '@/components/write-to-admin'
import { InformationHelp } from '@/components/information-help'
import { StyledContainer, Wrapper, WrapperHeader } from './style'
import { Dimensions } from './components/dimensions'
import { AdditionalInformation } from './components/additional-information'
import { InputTextEditor } from '@/components/inputs/input-text-editor/input'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import { ReactComponent as IconWolt } from '@/assets/icons/wolt.svg'
import { InputSwitch } from '@/components/inputs/input-switch'
import {
  useFormProductOnlineShop,
  type FormProductOnlineShopProps,
} from './useFormProductOnlineShop'

export const FormProductOnlineShop = (props: FormProductOnlineShopProps) => {
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('lg'))
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    t,
    skip,
    form,
    PATH,
    name,
    desc,
    panels,
    detail,
    topRef,
    is_wolt,
    isCreate,
    onSubmit,
    isLoading,
    handlSkip,
    languages,
    handleBack,
    handleClear,
    handleTranslateTitle,
    translateTitleLoading,
    handleGenerateDescription,
    generateDescriptionLoading,
  } = useFormProductOnlineShop(props)

  useEffect(() => {
    window.addEventListener('beforeunload', handleClear)

    return () => {
      window.removeEventListener('beforeunload', handleClear)
    }
  }, [handleClear])

  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
      <>
        <Stack gap='24px'>
          <Stack position='relative'>
            <Input
              fullWidth
              name={p.name}
              label={p.label}
              control={form.control}
              placeholder='enter_product_name'
            />
            <Stack top='-15px' right='0' position='absolute'>
              {languages.length > 1 && (
                <GenerateAi
                  title='translate'
                  loadingIndicator='translating'
                  onClick={handleTranslateTitle}
                  disabled={!(name?.length > 1)}
                  loading={translateTitleLoading}
                  message='enter_product_name'
                />
              )}
            </Stack>
          </Stack>
          <Box width={'100%'} maxWidth={desktop ? '560px' : 'calc(100vw - 90px)'}>
            <Stack position='relative'>
              <InputTextEditor
                name={p.description}
                control={form.control}
                label={p.descriptionLabel}
                placeholder='type_description_about_your_product'
              />
              <Stack position='absolute' top='-15px' right='0'>
                <GenerateAi
                  title='generate'
                  loadingIndicator='generating'
                  onClick={handleGenerateDescription}
                  loading={generateDescriptionLoading}
                  message='enter_product_name'
                  disabled={!(name?.length > 1 || (desc?.length ?? 0) > 1)}
                />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </>
    ),
  }))

  const content = (
    <>
      {(detail.isLoading || detail.isFetching) && (props.variant === 'edit' || isCreate) ? (
        <Spinner center />
      ) : (
        <Stack width='100%' overflow='auto'>
          <StyledContainer
            maxWidth={isCreate ? '650px' : 'lg'}
            gridTemplateColumns={isCreate ? '1fr' : '0.24fr 0.52fr 0.24fr'}
          >
            {mobile && (
              <Stack mb='10px' alignItems='flex-start'>
                <Button
                  component={Link}
                  variant='text-gray'
                  startIcon={<IconArrowLeft />}
                  to={`${PATH}/${ROUTER.CREATE_CATEGORY}`}
                >
                  {t('back')}
                </Button>
              </Stack>
            )}
            {!isCreate && <Stack component='aside' />}
            <Stack gap='24px' alignSelf='center' maxWidth={isCreate ? '650px' : 'lg'}>
              <Wrapper ref={topRef} isCreate={isCreate} sx={{ p: '18px' }}>
                <TabLanguages panels={PANELS} />
              </Wrapper>
              <Wrapper isCreate={isCreate} sx={{ p: '18px' }}>
                <Category isCreate={isCreate} />
              </Wrapper>
              <Wrapper isCreate={isCreate}>
                <WrapperHeader>
                  <Typography variant='title160'>{t('price')}</Typography>
                </WrapperHeader>
                <Stack sx={{ p: '18px' }}>
                  <Price isCreate={isCreate} />
                </Stack>
              </Wrapper>
              {is_wolt && (
                <>
                  <Wrapper isCreate={isCreate} sx={{ p: '18px' }}>
                    <Ikpu />
                  </Wrapper>
                  <Wrapper isCreate={isCreate}>
                    <Stack>
                      <WrapperHeader
                        sx={{ gap: '0px', flexDirection: 'column', alignItems: 'flex-start' }}
                      >
                        <Typography variant='title160'>{t('export')}</Typography>
                        <Typography variant='text300'>
                          {t('select_integrations_to_export_product')}
                        </Typography>
                      </WrapperHeader>
                      <Stack p='18px'>
                        <InputSwitch
                          name='export_to_wolt'
                          control={form.control}
                          labelPlacement='start'
                          disabled={props.variant === 'edit'}
                          sx={{ justifyContent: 'space-between' }}
                          label={
                            <Stack gap='10px' direction='row' alignItems='center'>
                              <IconWolt />
                              <Stack>
                                <Typography variant='title40'>Wolt</Typography>
                                <Typography variant='text'>
                                  {t('export_to_wolt_marketplace')}
                                </Typography>
                              </Stack>
                            </Stack>
                          }
                        />
                      </Stack>
                    </Stack>
                  </Wrapper>
                </>
              )}
              {!isCreate && (
                <>
                  <Wrapper isCreate={isCreate}>
                    <WrapperHeader>
                      <Typography variant='title160'>{t('variants')}</Typography>
                    </WrapperHeader>
                    <Variants />
                  </Wrapper>
                  <Wrapper isCreate={isCreate}>
                    <WrapperHeader>
                      <Typography variant='title160'>{t('additional_information')}</Typography>
                      <Typography variant='text300'>{t('optional')}</Typography>
                      <InformationHelp title='Text' />
                    </WrapperHeader>
                    <AdditionalInformation />
                  </Wrapper>
                  <Wrapper isCreate={isCreate}>
                    <WrapperHeader>
                      <Typography variant='title160'>{t('dimensions')}</Typography>
                    </WrapperHeader>
                    <Dimensions />
                  </Wrapper>
                  <Wrapper isCreate={isCreate} sx={{ p: '18px' }}>
                    <Tags />
                  </Wrapper>
                </>
              )}
              <Wrapper isCreate={isCreate} sx={{ p: '18px', mb: '24px' }}>
                {isCreate ? (
                  <Stack
                    gap='10px'
                    justifyContent='space-between'
                    mt={{ xs: '20px', md: '84px' }}
                    alignItems={{ xs: 'flex-end', md: 'center' }}
                    flexDirection={{ xs: 'column-reverse', md: 'row' }}
                  >
                    <LoadingButton
                      size='large'
                      sx={{ ml: '-16px' }}
                      onClick={handlSkip}
                      variant='text-green'
                      loading={skip.isLoading}
                    >
                      {t('skip')}
                    </LoadingButton>
                    <Stack
                      gap='20px'
                      width='100%'
                      flexGrow={1}
                      direction='row'
                      justifyContent='flex-end'
                      maxWidth={{ xs: '100%', md: '300px' }}
                    >
                      <Button
                        size='large'
                        component={Link}
                        variant='text-gray'
                        startIcon={<IconArrowLeft />}
                        to={`${PATH}/${ROUTER.CREATE_CATEGORY}`}
                      >
                        {t('back')}
                      </Button>
                      <LoadingButton
                        fullWidth
                        size='large'
                        type='submit'
                        variant='contained'
                        loading={isLoading}
                        sx={{ maxWidth: '190px' }}
                      >
                        {t('next')}
                      </LoadingButton>
                    </Stack>
                  </Stack>
                ) : (
                  <Stack gap='8px'>
                    <LoadingButton
                      fullWidth
                      type='submit'
                      size='small'
                      variant='contained'
                      loading={isLoading}
                    >
                      {t('save')}
                    </LoadingButton>
                    {mobile && (
                      <>
                        <LoadingButton
                          fullWidth
                          size='small'
                          variant='outlined-purple'
                          sx={{ minWidth: 'fit-content' }}
                        >
                          {t('save_as_draft')}
                        </LoadingButton>
                        <Button
                          fullWidth
                          variant='outlined-transparent'
                          size='small'
                          onClick={handleBack}
                        >
                          {t('cancel')}
                        </Button>
                      </>
                    )}
                  </Stack>
                )}
              </Wrapper>
            </Stack>
            {!isCreate && (
              <Stack component='aside' position='relative'>
                <Stack position='sticky' top='0'>
                  <WriteToAdmin title='having_trouble_adding_a_product' />
                </Stack>
              </Stack>
            )}
          </StyledContainer>
        </Stack>
      )}
    </>
  )

  if (isCreate) {
    return (
      <FormProvider {...form}>
        <Stack
          gap='18px'
          height='100%'
          component='form'
          overflow='hidden'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {content}
        </Stack>
      </FormProvider>
    )
  }

  return (
    <Dialog
      open
      fullScreen
      PaperProps={{
        sx: theme => ({ borderRadius: '0', backgroundColor: theme.palette.allColors.GRAY770 }),
      }}
    >
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
                <Button fullWidth variant='outlined-transparent' size='small' onClick={handleBack}>
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
    </Dialog>
  )
}
