import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { type FormProductProps } from './type'
import { Spinner } from '@/components/spinner'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { Parameter } from './components/parameter'
import { GenerateAi } from '@/components/generate-ai'
import { TabLanguages } from '@/components/tab-languages'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Subcription } from '@/components/modals/subcription'
import { SelectUnit } from '@/components/selects/select-unit/select'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { SelectCategory } from '@/components/selects/select-category'
import { useFormProductRestarunat } from './useFormProductRestarunat'
import { AdditionalParameter } from './components/additional-parameter'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { SelectBranches } from '@/components/selects/select-branches/select'
import { InputTextEditor } from '@/components/inputs/input-text-editor/input'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import { UploadImageMultiple } from '@/components/uploads/upload-image-multiple'

export const FormProductRestarunat = (props: FormProductProps) => {
  const { t } = useTranslation()
  const {
    skip,
    form,
    PATH,
    name,
    desc,
    value,
    panels,
    detail,
    tariff,
    setTrue,
    canOpen,
    setFalse,
    onSubmit,
    isLoading,
    handlSkip,
    languages,
    onTrigger,
    isLoadingDetail,
    isFetchingDetail,
    languageRadioRef,
    handleTranslateTitle,
    translateTitleLoading,
    is_yandex_eats_integrated,
    handleGenerateDescription,
    generateDescriptionLoading,
  } = useFormProductRestarunat(props)

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
                  disabled={!(name?.length > 1)}
                  onClick={handleTranslateTitle}
                  loading={translateTitleLoading}
                  loadingIndicator='translating'
                  message='enter_product_name'
                />
              )}
            </Stack>
          </Stack>
          <SelectCategory
            hasAll
            name='category'
            label='category'
            control={form.control}
            placeholder='select_category'
          />
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
        </Stack>
        <Box mt='28px' gap='24px' display='flex' flexDirection='column'>
          <Box gap='18px' display='flex'>
            <InputPriceFormat
              control={form.control}
              name='price'
              label='price'
              placeholder='enter_price'
            />
            {!is_yandex_eats_integrated && <SelectUnit name='unit' control={form.control} />}
          </Box>
          {is_yandex_eats_integrated && (
            <Box gap='18px' display='flex'>
              <Input
                fullWidth
                type='number'
                name='measure'
                label='measure'
                control={form.control}
                placeholder='enter_measure'
              />
              <SelectUnit name='unit' control={form.control} />
            </Box>
          )}
        </Box>
        <Box>
          <Parameter name={p.name} />
          <AdditionalParameter name={p.name} />
        </Box>
      </>
    ),
  }))

  return (
    <>
      {props.variant === 'create' ? (
        detail.isLoading || detail.isFetching ? (
          <Spinner center />
        ) : (
          <FormProvider {...form}>
            <Box
              component='form'
              onSubmit={form.handleSubmit(onSubmit)}
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            >
              <Box width='100%' maxWidth='610px' ref={languageRadioRef}>
                <UploadImageMultiple />
                <Box
                  gap='24px'
                  display='flex'
                  flexDirection='column'
                  mt={{ xs: '20px', md: '48px' }}
                >
                  <TabLanguages panels={PANELS} />
                  <SelectBranches name='branches' control={form.control} />
                </Box>
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
                      onClick={onTrigger}
                      sx={{ maxWidth: '190px' }}
                    >
                      {t('next')}
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </FormProvider>
        )
      ) : props.variant === 'add' ? (
        <>
          <Button
            fullWidth
            onClick={setTrue}
            startIcon={props.noPlus ? undefined : <IconPlus />}
            sx={theme => ({
              svg: {
                path: {
                  stroke: theme.palette.allColors.WHITE,
                },
              },
            })}
          >
            {t('add_product')}
          </Button>
        </>
      ) : (
        <IconButton radius='8px' onClick={setTrue}>
          <IconEdit />
        </IconButton>
      )}
      {value && (
        <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
          {props.variant === 'add' && !canOpen ? (
            <Subcription
              variant='drawer'
              title={tariff === 'START' ? 'You_are_on_the_Start_plan' : ''}
              description={
                tariff === 'START'
                  ? 'This_plan_allows_you_to_add_up_to_50_products_Upgrade_to_Basic_or_Pro_to_list_more'
                  : ''
              }
            />
          ) : (isLoadingDetail || isFetchingDetail) && props.variant === 'edit' ? (
            <Spinner center />
          ) : (
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
                    {t(props.variant === 'add' ? 'add_product' : 'edit_product')}
                  </Typography>
                  <IconButton onClick={setFalse}>
                    <IconRemove />
                  </IconButton>
                </Box>
                <Box className='content'>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Box width='100%' maxWidth='610px' ref={languageRadioRef}>
                      <UploadImageMultiple />
                      <Typography>{t('Upload_Image')}</Typography>
                      <Typography fontSize={12}>
                        {t(
                          'Upload_your_product_image_in_JPEG_PNG_or_WEBP_format_Max_file_size_10_MB',
                        )}
                      </Typography>

                      <Box mt='48px' gap='24px' display='flex' flexDirection='column'>
                        <TabLanguages
                          isRestaurant={props.variant === 'edit' && true}
                          panels={PANELS}
                        />
                        <SelectBranches name='branches' control={form.control} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className='footer'>
                  <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                    <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                      {t('cancel')}
                    </Button>
                    <LoadingButton
                      type='submit'
                      fullWidth
                      variant='contained'
                      loading={isLoading}
                      onClick={onTrigger}
                    >
                      {t(props.variant === 'add' ? 'add' : 'edit')}
                    </LoadingButton>
                  </Stack>
                </Box>
              </Box>
            </FormProvider>
          )}
        </SwipeableDrawer>
      )}
    </>
  )
}
