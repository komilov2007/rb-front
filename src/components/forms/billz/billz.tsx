import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { Select } from '@/components/selects/select'
import { useBillz, type BillzProps } from './useBillz'
import { InputSwitch } from '@/components/inputs/input-switch'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { ReactComponent as IconDots } from '@/assets/icons/dots.svg'
import { BILLZ_PRICE_TYPES, BILLZ_VERSIONS } from '@/constants/billz'
import { ReactComponent as IconBillz } from '@/assets/icons/billz.svg'

export const Billz = (props: BillzProps) => {
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
    deleteMutationBillz,
  } = useBillz(props)

  return (
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
                <IconBillz />
              </Stack>
              <Stack justifyContent='center'>
                <Typography variant='title50'>Billz</Typography>
                <Typography variant='text270' maxWidth='300px'>
                  {t(
                    'you_can_download_the_attached_example_and_use_them_as_a_starting_pint_for_your_own_file',
                  )}
                </Typography>
              </Stack>
            </Stack>
            {token.data?.data?.billz?.secret_token ? (
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
            {!upload.value && token.data?.data?.billz?.secret_token ? (
              <Stack gap='14px' justifyContent='flex-end' direction='row'>
                <LoadingButton
                  size='small'
                  variant='filled-red'
                  onClick={handleDelete}
                  sx={{ minWidth: '130px' }}
                  loading={deleteMutationBillz.isLoading}
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
                <Select
                  name='version'
                  label='version'
                  placeholder='Version'
                  control={form.control}
                  options={Object.values(BILLZ_VERSIONS)}
                />
                <Select
                  name='price_type'
                  label='price_type'
                  placeholder='price_type'
                  control={form.control}
                  options={BILLZ_PRICE_TYPES}
                />
                <InputTextarea
                  name='secret_token'
                  label='secret_token'
                  control={form.control}
                  sx={{ height: '130px' }}
                  placeholder='enter_the_token_here'
                />
                <Stack p='10px'>
                  <InputSwitch
                    name='have_photo'
                    control={form.control}
                    label='only_products_with_pictures'
                  />
                </Stack>
                {form.watch('version') === BILLZ_VERSIONS.v1.value && (
                  <Input
                    fullWidth
                    name='username'
                    label='username'
                    control={form.control}
                    placeholder='enter_username'
                  />
                )}
                <Stack gap='14px' justifyContent='flex-end' direction='row'>
                  {token.data?.data?.billz?.secret_token?.length && (
                    <LoadingButton
                      size='small'
                      variant='filled-red'
                      onClick={handleDelete}
                      sx={{ minWidth: '130px' }}
                      loading={deleteMutationBillz.isLoading}
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
  )
}
