import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useSettings } from './useSettings'
import { Spinner } from '@/components/spinner'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconFilter } from '@/assets/icons/filter.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

export const Settings = () => {
  const { t } = useTranslation()
  const can_edit = useProfileStore(state => state.getPermission('IKPU', 'can_edit'))
  const {
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    isLoadingIkpuSettings,
    isFetchingIkpuSettings,
  } = useSettings()

  return (
    <>
      <Button variant='outlined' startIcon={<IconFilter />} onClick={setTrue}>
        {t('nds_settings')}
      </Button>
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
              <Typography variant='title30'>{t('nds_settings')}</Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              {isLoadingIkpuSettings || isFetchingIkpuSettings ? (
                <Spinner center />
              ) : (
                <Stack gap='28px'>
                  <Input
                    fullWidth
                    type='tel'
                    name='vat_percent'
                    label='nds_percentage'
                    control={form.control}
                    placeholder='enter_nds_percentage'
                  />
                  <Input
                    fullWidth
                    type='tel'
                    name='mxik_code'
                    control={form.control}
                    placeholder='enter_ikpu'
                    label='one_single_ikpu_for_all_products'
                  />
                  <Input
                    fullWidth
                    type='tel'
                    name='package_code'
                    control={form.control}
                    placeholder='enter_package_code'
                    label='one_packaging_code_for_all_products'
                  />
                  <Input
                    fullWidth
                    type='tel'
                    name='unit_code'
                    control={form.control}
                    placeholder='enter_unit_code'
                    label='single_unit_code_for_all_products'
                  />
                </Stack>
              )}
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' justifyContent='flex-end'>
                <div>
                  <Button
                    fullWidth
                    onClick={setFalse}
                    sx={{ minWidth: '170px' }}
                    variant='outlined-transparent'
                  >
                    {t('cancel')}
                  </Button>
                </div>
                {can_edit && (
                  <LoadingButton
                    type='submit'
                    fullWidth
                    variant='contained'
                    loading={isLoading}
                    sx={{ minWidth: '170px' }}
                  >
                    {t('save_changes')}
                  </LoadingButton>
                )}
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
