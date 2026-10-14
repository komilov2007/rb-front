import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import ImageAmoCRM from '@/assets/images/amo-crm.webp'
import { type AmoCRMProps, useAmoCRM } from './useAmoCRM'
import { getCurrentDomainMeta } from '@/constants/domain-themes'

export const AmoCRM = (props: AmoCRMProps) => {
  const { t } = useTranslation()
  const {
    form,
    token,
    onSubmit,
    isLoading,
    handleDelete,
    deleteMutation,
    edit,
    handleEdit,
    cancelEdit,
  } = useAmoCRM(props)
  const hasToken = !!token.data?.data?.token

  return (
    <Box className='content'>
      <Wrapper>
        <FormProvider {...form}>
          <Stack component='form' onSubmit={form.handleSubmit(onSubmit)}>
            {token.isLoading ? (
              <Skeleton height='100px' width='100%' variant='rounded' />
            ) : (
              <>
                <Stack direction='row' justifyContent='space-between'>
                  <Stack gap='10px' direction='row'>
                    <Stack
                      sx={{
                        img: {
                          width: '36px',
                          height: '36px',
                        },
                      }}
                    >
                      <img src={ImageAmoCRM} alt='AmoCRM' />
                    </Stack>
                    <Stack justifyContent='center'>
                      <Typography variant='title50'>Amo CRM</Typography>
                      <Typography variant='text270' maxWidth='300px'>
                        {t(
                          'connect_appname_with_amocrm_and_automatically_send_orders_to_the_crm_system',
                          { appName: getCurrentDomainMeta().appName },
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>

                {edit || !hasToken ? (
                  <Stack gap='15px' marginTop={'20px'}>
                    <Input
                      fullWidth
                      name='token'
                      label='token'
                      control={form.control}
                      placeholder='enter_token'
                    />

                    <Input
                      fullWidth
                      name='subdomain'
                      label='sub_domain'
                      control={form.control}
                      placeholder='enter_sub_domain'
                    />

                    <Stack gap='15px' justifyContent='flex-end' direction='row'>
                      <LoadingButton
                        size='small'
                        type='submit'
                        variant='contained'
                        sx={{ minWidth: '130px' }}
                        loading={isLoading}
                      >
                        {t('save')}
                      </LoadingButton>

                      {edit && (
                        <LoadingButton
                          size='small'
                          variant='filled-red'
                          onClick={cancelEdit}
                          sx={{ minWidth: '130px' }}
                        >
                          {t('cancel')}
                        </LoadingButton>
                      )}
                    </Stack>
                  </Stack>
                ) : (
                  <Stack gap='15px' justifyContent='flex-end' direction='row' marginTop={'20px'}>
                    <LoadingButton
                      size='small'
                      variant='filled-red'
                      onClick={handleDelete}
                      sx={{ minWidth: '130px' }}
                      loading={deleteMutation.isLoading}
                    >
                      {t('delete')}
                    </LoadingButton>
                    <LoadingButton
                      size='small'
                      variant='contained'
                      loading={isLoading}
                      onClick={handleEdit}
                      sx={{ minWidth: '130px' }}
                    >
                      {t('edit')}
                    </LoadingButton>
                  </Stack>
                )}
              </>
            )}
          </Stack>
        </FormProvider>
      </Wrapper>
    </Box>
  )
}
