import Box from '@mui/material/Box'
import { Example } from './example'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { Alert } from '@/components/alert'
import { ROUTER } from '@/constants/router'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { Footer, WrapIconIphone } from './style'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import RadioGroup from '@mui/material/RadioGroup'
import LoadingButton from '@mui/lab/LoadingButton'
import { SCROLL_TYPES } from '@/constants/category'
import FormControl from '@mui/material/FormControl'
import { GenerateAi } from '@/components/generate-ai'
import InputAdornment from '@mui/material/InputAdornment'
import { TabLanguages } from '@/components/tab-languages'
import { Controller, FormProvider } from 'react-hook-form'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import { UploadImage } from '@/components/uploads/upload-image'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import ImageIphoneCategory from '@/assets/images/iphone-category.png'
import { SelectCategory } from '@/components/selects/select-category'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import {
  useFormCategoryRestarunat,
  type FormCategoryRestarunatProps,
} from './useFormCategoryRestarunat'

export const FormCategoryRestarunat = (props: FormCategoryRestarunatProps) => {
  const { t } = useTranslation()
  const {
    skip,
    form,
    PATH,
    name,
    value,
    panels,
    detail,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handlSkip,
    languages,
    handleClearParent,
    handleTranslateTitle,
    translateTitleLoading,
  } = useFormCategoryRestarunat(props)

  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
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
              disabled={!(name?.length > 1)}
              onClick={handleTranslateTitle}
              loading={translateTitleLoading}
              message='enter_product_name'
            />
          )}
        </Stack>
      </Stack>
    ),
  }))

  return (
    <>
      {props.variant === 'create' ? (
        detail.isLoading || detail.isFetching ? (
          <Spinner center />
        ) : (
          <FormProvider {...form}>
            <Stack component='form' alignItems='center' onSubmit={form.handleSubmit(onSubmit)}>
              <Box width='100%' maxWidth='610px'>
                <UploadImage size='400:400' name='photo' control={form.control} />
                <Example />
                <TabLanguages panels={PANELS} />
              </Box>
              <Footer>
                <LoadingButton
                  size='large'
                  onClick={handlSkip}
                  variant='text-green'
                  loading={skip.isLoading}
                >
                  {t('skip')}
                </LoadingButton>
                <Stack
                  width='100%'
                  gap='20px'
                  flexGrow={1}
                  direction='row'
                  justifyContent='flex-end'
                  maxWidth={{ xs: '100%', md: '300px' }}
                >
                  <Button
                    fullWidth
                    size='large'
                    component={Link}
                    variant='text-gray'
                    startIcon={<IconArrowLeft />}
                    to={`${PATH}/${ROUTER.CREATE_SETTINGS}`}
                  >
                    {t('back')}
                  </Button>
                  <LoadingButton
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    loading={isLoading}
                  >
                    {t('next')}
                  </LoadingButton>
                </Stack>
              </Footer>
            </Stack>
          </FormProvider>
        )
      ) : props.variant === 'add' ? (
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
          {t('add_category')}
        </Button>
      ) : (
        <IconButton radius='8px' onClick={setTrue}>
          <IconEdit />
        </IconButton>
      )}
      {value && (
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
                  {t(props.variant === 'add' ? 'add_category' : 'edit_category')}
                </Typography>
                <IconButton onClick={setFalse}>
                  <IconRemove />
                </IconButton>
              </Box>
              <Box className='content'>
                {props.variant === 'edit' && (detail.isLoading || detail.isFetching) ? (
                  <Spinner center />
                ) : (
                  <>
                    <Stack mt='20px' mb='50px'>
                      <UploadImage size='400:400' name='photo' control={form.control} />
                      <Typography>{t('Upload_Image')}</Typography>
                      <Typography fontSize={12}>
                        {t(
                          'Upload_your_product_image_in_JPEG_PNG_or_WEBP_format_Max_file_size_10_MB',
                        )}
                      </Typography>
                    </Stack>
                    <Stack gap='20px'>
                      <TabLanguages panels={PANELS} />
                      {(props.variant === 'edit' || props.variant === 'add') && (
                        <SelectCategory
                          name='parent'
                          label='parent_category'
                          control={form.control}
                          categoryId={detail.data?.data.id}
                          placeholder='select_parent_category'
                          endAdornment={
                            typeof form.watch('parent') === 'number' && (
                              <InputAdornment sx={{ marginRight: '50px' }} position='end'>
                                <IconButton sx={{ p: '4px' }} onClick={handleClearParent}>
                                  <IconRemove />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        />
                      )}
                    </Stack>
                    <Stack mt='20px'>
                      <Typography fontSize={14}>{t('product_placement')}</Typography>
                      <FormControl fullWidth component='fieldset'>
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
                    <Stack mt='20px'>
                      <Alert>
                        <Typography
                          variant='text'
                          lineHeight='22px'
                          color={theme => theme.palette.allColors.BLACK30}
                        >
                          {t('the_category_you_added_looks_like_this_example')}
                        </Typography>
                        <WrapIconIphone>
                          <img src={ImageIphoneCategory} />
                        </WrapIconIphone>
                      </Alert>
                    </Stack>
                  </>
                )}
              </Box>
              <Box className='footer'>
                <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                  <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                    {t('cancel')}
                  </Button>
                  <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                    {t(props.variant === 'add' ? 'add' : 'edit')}
                  </LoadingButton>
                </Stack>
              </Box>
            </Box>
          </FormProvider>
        </SwipeableDrawer>
      )}
    </>
  )
}
