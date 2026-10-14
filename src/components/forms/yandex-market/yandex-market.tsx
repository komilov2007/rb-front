import { Wrapper } from './style'
import Box from '@mui/material/Box'
import { getUser } from '@/utils/user'
import Stack from '@mui/material/Stack'
import { Copy } from '@/components/copy'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import InputLabel from '@mui/material/InputLabel'
import LoadingButton from '@mui/lab/LoadingButton'
import ImageYandexMarket from '@/assets/images/yandex-market.webp'
import { type YandexMarketProps, useYandexMarket } from './useYandexMarket'
import { getCurrentDomainMeta } from '@/constants/domain-themes'

export const YandexMarket = (props: YandexMarketProps) => {
  const { t } = useTranslation()
  const user = getUser()
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
  } = useYandexMarket(props)
  const hasToken = !!token.data?.data.api_key

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
                      <img src={ImageYandexMarket} alt='YandexMarket' />
                    </Stack>
                    <Stack justifyContent='center'>
                      <Typography variant='title50'>Yandex Market</Typography>
                      <Typography variant='text270' maxWidth='300px'>
                        {t(
                          'connect_your_yandex_market_store_to_appname_and_receive_all_orders_automatically_in_the_appname_system_save_your_time_and_energy',
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
                      name='api_key'
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

                <Stack>
                  <InputLabel sx={{ mb: '5px', transform: 'none' }}>Webhook url</InputLabel>
                  <Stack ml='-8px' gap='10px' direction='row' alignItems='center'>
                    <Copy
                      text={`https://api.robosell.uz/api/v2/robomarket/webhook/yandex/market/${user.shop}`}
                    />
                    <Typography noWrap>
                      {`https://api.robosell.uz/api/v2/robomarket/webhook/yandex/market/${user.shop}`}
                    </Typography>
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        </FormProvider>
      </Wrapper>
    </Box>
  )
}
