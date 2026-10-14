import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Map } from '@/components/forms/map'
import { FormProvider } from 'react-hook-form'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { Socials } from '@/components/forms/socials'
import { Languages } from '@/components/forms/languages'
import { Schedules } from '@/components/forms/schedules'
import { TabLanguages } from '@/components/tab-languages'
import { UploadCrop } from '@/components/uploads/upload-crop'
import { type SettingsProps, useFormSettings } from './useFormSettings'
import { SelectCurrency } from '@/components/selects/select-currency/select'
import { InputTextEditor } from '@/components/inputs/input-text-editor/input'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import { InputPhoneInternational } from '@/components/inputs/input-phone-international'

const Settings = (props: SettingsProps) => {
  const { t } = useTranslation()
  const {
    data,
    form,
    PATH,
    panels,
    isAdmin,
    onError,
    onSubmit,
    isLoading,
    isFetching,
    handleCancel,
    isLoadingUpdate,
    languageRadioRef,
  } = useFormSettings(props)
  const can_edit = useProfileStore(state => state.getPermission('settings', 'can_edit'))

  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
      <InputTextEditor
        name={p.name}
        label={p.label}
        control={form.control}
        placeholder={t('enter_about_your_company_detail_for_users')}
      />
    ),
  }))

  return (
    <FormProvider {...form}>
      {isLoading || isFetching ? (
        <Box height='300px'>
          <Spinner center />
        </Box>
      ) : (
        <Stack
          overflow='auto'
          component='form'
          p={isAdmin ? '20px' : 0}
          className='scrollPageLayout'
          onSubmit={form.handleSubmit(onSubmit, onError)}
          alignItems={isAdmin ? 'flex-start' : 'center'}
        >
          <Box pt='20px' width='100%' maxWidth='571px'>
            <Stack mb='46px'>
              <UploadCrop variant='logo' hasInstruction name='logo' control={form.control} />
            </Stack>
            <Stack ref={languageRadioRef}>
              <Languages />
            </Stack>
            <Stack mb='46px'>
              <Input
                fullWidth
                name='name'
                label='company_name'
                control={form.control}
                placeholder='enter_company_name'
              />
            </Stack>
            <Stack mb='46px'>
              <TabLanguages panels={PANELS} />
            </Stack>
            <Stack mb='46px'>
              <InputPhoneInternational
                fullWidth
                name='business_phone'
                label='contact_number'
                control={form.control}
                placeholder='enter_phone_number'
                defaultValue={data?.data.business_phone}
              />
            </Stack>
            <Socials />
            <SelectCurrency />
            <Schedules />
            <Box gap='15px' mt='43px' display='flex' flexDirection='column'>
              <Typography variant='title10'>{t('address')}</Typography>
              <Input
                fullWidth
                name='branch_name'
                label='branch_name'
                control={form.control}
                placeholder='enter_branch_name'
              />
              <Map />
            </Box>
          </Box>
          {props.variant === 'admin' ? (
            <Stack width='100%' maxWidth='1110px' alignItems='flex-end'>
              <Stack gap='14px' width='100%' mt='122px' direction='row' justifyContent='flex-end'>
                <div>
                  <Button
                    fullWidth
                    onClick={handleCancel}
                    sx={{ minWidth: '170px' }}
                    variant='outlined-transparent'
                  >
                    {t('cancel')}
                  </Button>
                </div>
                {can_edit && (
                  <div>
                    <LoadingButton
                      fullWidth
                      type='submit'
                      variant='contained'
                      loading={isLoadingUpdate}
                      sx={{ minWidth: '170px' }}
                    >
                      {t('save_changes')}
                    </LoadingButton>
                  </div>
                )}
              </Stack>
            </Stack>
          ) : (
            <Box
              sx={theme => ({
                pr: '36px',
                mt: '84px',
                gap: '20px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                [theme.breakpoints.down('md')]: {
                  pr: '0',
                  mt: '20px',
                },
              })}
            >
              <Button
                to={PATH}
                size='large'
                component={Link}
                variant='text-gray'
                startIcon={<IconArrowLeft />}
              >
                {t('back')}
              </Button>
              <LoadingButton
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                loading={isLoadingUpdate}
                sx={{ maxWidth: '190px' }}
              >
                {t('next')}
              </LoadingButton>
            </Box>
          )}
        </Stack>
      )}
    </FormProvider>
  )
}

export default Settings
