import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { Controller, FormProvider } from 'react-hook-form'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import RadioGroup from '@mui/material/RadioGroup'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormShop, type FormShopProps } from './useFormShop'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { BUSINESS_TYPES, PLATFORMS_FORM } from '@/constants/busniness'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { Select } from '@/components/selects/select'

const FormShop = (props: FormShopProps) => {
  const { t } = useTranslation()
  const isMultibank = useProfileStore(state => state.isMultibank)
  const {
    user,
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    isVariantAdmin,
    isLoadingDetail,
    isFetchingDetail,
    countryList,
    categoryList,
    businessType,
    categoryLoading,
    countryLoading,
    otherValue,
  } = useFormShop(props)

  const content = (
    <>
      <Box mb={{ xs: '50px', md: '100px' }} width='100%'>
        <Box width='100%' maxWidth='478px'>
          <Typography
            variant='title'
            component='h1'
            sx={{ mb: { xs: '13px', md: '23px' }, mt: { xs: '13px', md: '0' } }}
          >
            {t('business_details')}
          </Typography>
          <Input
            fullWidth
            name='name'
            label='company_name'
            control={form.control}
            placeholder='enter_company_name'
          />
        </Box>
        <Box
          width='100%'
          display='flex'
          flexDirection='column'
          sx={{ pt: { xs: '18px', md: '28px' }, gap: { xs: '15px', md: '28px' } }}
        >
          <FormControl fullWidth component='fieldset' error={!!form.formState.errors.business_type}>
            <FormLabel component='legend'>{t('business_type')}</FormLabel>
            <Controller
              name='business_type'
              control={form.control}
              render={({ field, fieldState: { invalid } }) => (
                <RadioGroup
                  row
                  {...field}
                  sx={theme => ({
                    gap: { xs: '13px', md: '83px' },
                    svg: {
                      g: {
                        rect: {
                          stroke: invalid ? theme.palette.allColors.RED : undefined,
                        },
                      },
                    },
                  })}
                >
                  {Object.values(BUSINESS_TYPES).map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={t(label)}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl>
          <FormControl fullWidth component='fieldset' error={!!form.formState.errors.platforms}>
            <FormLabel component='legend'>{t('choose_platform')}</FormLabel>
            <Controller
              name='platforms'
              control={form.control}
              render={({ field, fieldState: { invalid } }) => (
                <RadioGroup
                  sx={theme => ({
                    gap: { xs: '0 63px', md: '0 83px' },
                    svg: {
                      g: {
                        rect: {
                          stroke: invalid ? theme.palette.allColors.RED : undefined,
                        },
                      },
                    },
                  })}
                  row
                  {...field}
                >
                  {PLATFORMS_FORM.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={t(label)}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl>
          <Select
            name='country'
            label='country'
            options={countryList.data}
            loading={countryLoading}
            control={form.control}
            placeholder='select_country'
          />

          <Select
            name='business_category'
            label='business_category'
            disabled={!businessType}
            options={categoryList.data}
            loading={categoryLoading}
            control={form.control}
            placeholder='select_business_category'
          />
          {otherValue && (
            <Input
              fullWidth
              name='category_name'
              label='category_name'
              control={form.control}
              placeholder='enter_category_name'
            />
          )}
        </Box>
      </Box>
      <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isLoading}>
        {t('next')}
      </LoadingButton>
    </>
  )

  return (
    <Stack>
      {isVariantAdmin ? (
        <>
          <Button
            onClick={setTrue}
            sx={theme => ({
              padding: 0,
              width: '32px',
              height: '32px',
              minWidth: '32px',
              background: isMultibank ? theme.palette.allColors.GREEN80 : undefined,
              '&:hover': {
                background: isMultibank ? theme.palette.allColors.GREEN80 : undefined,
              },
              svg: {
                width: '24px',
                height: '24px',
                path: {
                  stroke: isMultibank
                    ? theme.palette.allColors.GREEN70
                    : theme.palette.allColors.WHITE,
                },
              },
            })}
          >
            <IconPlus />
          </Button>
          <Dialog
            fullWidth
            scroll='body'
            open={value}
            onClose={setFalse}
            component='form'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Stack p='24px'>
              <Stack
                alignItems='flex-end'
                sx={{
                  top: 0,
                  right: 0,
                  mb: '32px',
                  p: '7px 7px 0 0',
                  position: 'absolute',
                }}
              >
                <IconButton onClick={setFalse}>
                  <IconRemove />
                </IconButton>
              </Stack>
              {content}
            </Stack>
          </Dialog>
        </>
      ) : (
        <FormProvider {...form}>
          <Box
            flexGrow={1}
            width='100%'
            display='flex'
            minHeight='80vh'
            component='form'
            flexDirection='column'
            justifyContent='space-between'
            onSubmit={form.handleSubmit(onSubmit)}
            paddingBottom={{ xs: '10px', md: '0' }}
          >
            {(isLoadingDetail || isFetchingDetail) && user.shop ? <Spinner center /> : content}
          </Box>
        </FormProvider>
      )}
    </Stack>
  )
}

export default FormShop
