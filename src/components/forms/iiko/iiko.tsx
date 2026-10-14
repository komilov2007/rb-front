import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { useIiko, type IikoProps } from './useIiko'
import { ReactComponent as IconDots } from '@/assets/icons/dots.svg'
import { ReactComponent as IconIiko } from '@/assets/icons/iiko.svg'
import { SelectSpotIiko } from '@/components/selects/select-spot-iiko'

export const Iiko = (props: IikoProps) => {
  const { t } = useTranslation()
  const {
    form,
    token,
    upload,
    onSubmit,
    isLoading,
    handleClick,
    secretToken,
    handleDelete,
    deleteMutationIiko,
  } = useIiko(props)

  return (
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
                    svg: {
                      width: '36px',
                      height: '36px',
                    },
                  }}
                >
                  <IconIiko />
                </Stack>
                <Stack justifyContent='center'>
                  <Typography variant='title50'>iiko</Typography>
                  <Typography variant='text270' maxWidth='300px'>
                    {t(
                      'you_can_download_the_attached_example_and_use_them_as_a_starting_pint_for_your_own_file',
                    )}
                  </Typography>
                </Stack>
              </Stack>
              {token.data?.data.iiko ? (
                upload.value ? null : (
                  <div>
                    <IconButton
                      onClick={upload.setTrue}
                      sx={{
                        m: '-12px -16px 0 0',
                        svg: {
                          width: '24px !important',
                          height: '24px !important',
                        },
                      }}
                    >
                      <IconDots />
                    </IconButton>
                  </div>
                )
              ) : null}
            </Stack>
            <Stack gap='10px' mt='20px'>
              {!upload.value && token.data?.data.iiko ? (
                <Stack gap='14px' justifyContent='flex-end' direction='row'>
                  <LoadingButton
                    size='small'
                    variant='filled-red'
                    onClick={handleDelete}
                    sx={{ minWidth: '130px' }}
                    loading={deleteMutationIiko.isLoading}
                  >
                    {t('delete')}
                  </LoadingButton>
                  <LoadingButton
                    size='small'
                    variant='contained'
                    loading={isLoading}
                    onClick={handleClick}
                    sx={{ minWidth: '130px' }}
                  >
                    {t('import')}
                  </LoadingButton>
                </Stack>
              ) : (
                <>
                  <Input
                    fullWidth
                    name='api_login'
                    label='api_login'
                    control={form.control}
                    placeholder='enter_api_login'
                    onChange={() => {
                      form.setValue('branches', [])
                    }}
                  />
                  <SelectSpotIiko branches={token.data?.data.iiko?.branches ?? []} />
                  <Stack gap='14px' justifyContent='flex-end' direction='row'>
                    {token.data?.data?.iiko?.api_login &&
                      token.data?.data?.iiko?.api_login?.length > 0 && (
                        <LoadingButton
                          size='small'
                          variant='filled-red'
                          onClick={handleDelete}
                          sx={{ minWidth: '130px' }}
                          loading={deleteMutationIiko.isLoading}
                        >
                          {t('delete')}
                        </LoadingButton>
                      )}
                    <LoadingButton
                      size='small'
                      type='submit'
                      variant='contained'
                      sx={{ minWidth: '130px' }}
                      loading={secretToken.isLoading || isLoading}
                    >
                      {t('save')}
                    </LoadingButton>
                  </Stack>
                </>
              )}
            </Stack>
          </>
        )}
      </Stack>
    </FormProvider>
  )
}
