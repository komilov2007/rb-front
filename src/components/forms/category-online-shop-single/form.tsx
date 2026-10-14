import { Footer } from './style'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { Example } from '../category-example'
import { Spinner } from '@/components/spinner'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { GenerateAi } from '@/components/generate-ai'
import { TabLanguages } from '@/components/tab-languages'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import { UploadCategoryOnlineShopImage } from '@/components/uploads/upload-category-online-shop-image'
import {
  useFormCategoryRestarunat,
  type FormCategoryRestarunatProps,
} from './useFormCategoryRestarunat'

export const FormCategoryOnlineShopSingle = (props: FormCategoryRestarunatProps) => {
  const { t } = useTranslation()
  const {
    skip,
    form,
    PATH,
    name,
    topRef,
    panels,
    detail,
    onSubmit,
    isLoading,
    handlSkip,
    languages,
    translateTitleButton,
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
          {!translateTitleButton.value && languages.length > 1 && (
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
      {detail.isLoading || detail.isFetching ? (
        <Spinner center />
      ) : (
        <FormProvider {...form}>
          <Stack component='form' alignItems='center' onSubmit={onSubmit}>
            <Stack mt='20px' gap='24px' width='100%' maxWidth='610px' ref={topRef}>
              <TabLanguages panels={PANELS} />
              <Stack gap='20px' py='18px'>
                <UploadCategoryOnlineShopImage />
                <Example />
              </Stack>
            </Stack>
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
      )}
    </>
  )
}
