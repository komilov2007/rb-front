import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import ImageUzumMarket from '@/assets/images/uzum-market.png'
import { type UzumMarketProps, useUzumMarket } from './useUzumMarket'
import { getCurrentDomainMeta } from '@/constants/domain-themes'

export const UzumMarket = (props: UzumMarketProps) => {
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
  } = useUzumMarket(props)
  const hasToken = !!token.data?.data.key

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
                      <img src={ImageUzumMarket} alt='Uzum Market logo' />
                    </Stack>
                    <Stack justifyContent='center'>
                      <Typography variant='title50'>Uzum Market</Typography>
                      <Typography variant='text270' maxWidth='300px'>
                        {t(
                          'uzum_market_is_an_integration_that_allows_you_to_view_and_manage_orders_from_uzum_market_directly_within_the_appname_platform_managing_orders_is_now_easier_and_more_efficient',
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
                      name='key'
                      label='api_key'
                      control={form.control}
                      placeholder='enter_api_key'
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
