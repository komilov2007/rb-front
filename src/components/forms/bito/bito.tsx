import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import ImageBito from '@/assets/images/bito.png'
import { type BitoProps, useBito } from './useBito'
import { SelectPriceType } from '@/components/selects/select-price-type'
import { SelectOrganizationsBito } from '@/components/selects/select-organizations-bito'
import { SelectEmployeesBito } from '@/components/selects/select-employees-bito'
import IconButton from '@mui/material/IconButton'
import { ReactComponent as IconDots } from '@/assets/icons/dots.svg'
import { InputSwitch } from '@/components/inputs/input-switch'

export const Bito = (props: BitoProps) => {
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
    handleClick,
    importLaoding,
  } = useBito(props)
  const hasToken = !!token.data?.data.token

  return (
    <Box className='content'>
      <Wrapper>
        <FormProvider {...form}>
          <Stack component='form' onSubmit={form.handleSubmit(onSubmit)}>
            {token.isLoading ? (
              <Skeleton height='100px' width='100%' variant='rounded' />
            ) : (
              <>
                <Stack direction='row' justifyContent='space-between' alignItems='start'>
                  <Stack gap='10px' direction='row'>
                    <Stack
                      sx={{
                        img: {
                          width: '36px',
                          height: '36px',
                        },
                      }}
                    >
                      <img src={ImageBito} alt='Bito logo' />
                    </Stack>
                    <Stack justifyContent='center'>
                      <Typography variant='title50'>Bito</Typography>
                      <Typography variant='text270' maxWidth='300px'>
                        {t('bito_is_a_system_designed_to_help_you_manage_your_warehouse')}
                      </Typography>
                    </Stack>
                  </Stack>
                  <IconButton
                    onClick={handleEdit}
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
                </Stack>

                {edit || !hasToken ? (
                  <Stack gap='15px' marginTop={'20px'}>
                    <Input
                      fullWidth
                      name='token'
                      label='token'
                      control={form.control}
                      placeholder='enter_token'
                      onChange={() => {
                        form.setValue('price_type', '')
                        form.setValue('organization_id', '')
                      }}
                    />
                    <SelectPriceType />
                    <SelectOrganizationsBito />
                    <SelectEmployeesBito />
                    <InputSwitch
                      name='is_debt'
                      label='sell_on_credit'
                      control={form.control}
                      labelPlacement='start'
                      sx={{ justifyContent: 'space-between' }}
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
                      loading={importLaoding}
                      onClick={handleClick}
                      sx={{ minWidth: '130px' }}
                    >
                      {t('import')}
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
