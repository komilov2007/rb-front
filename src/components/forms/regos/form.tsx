import { Wrapper, CheckboxCard } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useFormRegos } from './useFormRegos'
import { FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { type RoboMarketAppDetaiProps } from '@/types/robo-market'
import { ReactComponent as IconDots } from '@/assets/icons/dots.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { SelectPriceTypeRegos } from '@/components/selects/select-price-type-regos'
import { SelectWarehouseRegos } from '@/components/selects/select-warehouse-regos'

export const FormRegos = (props: RoboMarketAppDetaiProps) => {
  const {
    t,
    open,
    form,
    token,
    modal,
    onSubmit,
    hasToken,
    handleImport,
    postMerchant,
    handleDelete,
    importMerchant,
    deleteMerchant,
  } = useFormRegos()

  return (
    <>
      {token.isLoading ? (
        <Skeleton height='42px' width='100%' variant='rounded' />
      ) : (
        <LoadingButton onClick={modal.setTrue} variant='outlined-purple'>
          {t(hasToken ? 'installed' : 'install')}
        </LoadingButton>
      )}
      <SwipeableDrawer
        anchor='right'
        open={modal.value}
        onOpen={modal.setTrue}
        onClose={modal.setFalse}
      >
        <Box
          display='flex'
          p='7px 7px 0 32px'
          component='header'
          alignItems='center'
          justifyContent='flex-end'
        >
          <IconButton onClick={modal.setFalse}>
            <IconRemove />
          </IconButton>
        </Box>
        <Box p='5px 32px 50px'>
          <Wrapper>
            <FormProvider {...form}>
              <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
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
                      <img src={props.icon} alt={props.name} />
                    </Stack>
                    <Stack justifyContent='center'>
                      <Typography variant='title50'>{props.name}</Typography>
                      <Typography variant='text270'>{t('app_description')}</Typography>
                    </Stack>
                    {open.value || !hasToken ? null : (
                      <div>
                        <IconButton
                          onClick={open.setTrue}
                          sx={{
                            svg: {
                              width: '24px !important',
                              height: '24px !important',
                            },
                          }}
                        >
                          <IconDots />
                        </IconButton>
                      </div>
                    )}
                  </Stack>
                </Stack>
                {open.value || !hasToken ? (
                  <Stack gap='15px' marginTop={'20px'}>
                    <Input
                      fullWidth
                      name='integration_id'
                      label='integration_id'
                      control={form.control}
                      placeholder='enter_integration_id'
                      onChange={() => {
                        form.setValue('warehouse_id', null)
                        form.setValue('price_type_id', null)
                      }}
                    />
                    <SelectWarehouseRegos />
                    <SelectPriceTypeRegos />
                    <CheckboxCard checked={form.watch('only_with_photo')} htmlFor='only_with_photo'>
                      <Stack>
                        <Typography variant='title50'>{t('only_with_photo')}</Typography>
                        <Typography variant='text270'>
                          {t('only_with_photo_description')}
                        </Typography>
                      </Stack>
                      <InputCheckbox
                        label=''
                        id='only_with_photo'
                        name='only_with_photo'
                        control={form.control}
                      />
                    </CheckboxCard>
                    <CheckboxCard checked={form.watch('only_in_stock')} htmlFor='only_in_stock'>
                      <Stack>
                        <Typography variant='title50'>{t('only_in_stock')}</Typography>
                        <Typography variant='text270'>{t('only_in_stock_description')}</Typography>
                      </Stack>
                      <InputCheckbox
                        label=''
                        id='only_in_stock'
                        name='only_in_stock'
                        control={form.control}
                      />
                    </CheckboxCard>
                    <Stack gap='15px' justifyContent='flex-end' direction='row'>
                      {open.value && (
                        <LoadingButton
                          size='small'
                          variant='filled-red'
                          onClick={open.setFalse}
                          sx={{ minWidth: '130px' }}
                        >
                          {t('cancel')}
                        </LoadingButton>
                      )}
                      <LoadingButton
                        size='small'
                        type='submit'
                        variant='contained'
                        sx={{ minWidth: '130px' }}
                        loading={postMerchant.isLoading}
                      >
                        {t('save')}
                      </LoadingButton>
                    </Stack>
                  </Stack>
                ) : (
                  <Stack gap='15px' justifyContent='flex-end' direction='row' marginTop={'20px'}>
                    <LoadingButton
                      size='small'
                      variant='filled-red'
                      onClick={handleDelete}
                      sx={{ minWidth: '130px' }}
                      loading={deleteMerchant.isLoading}
                    >
                      {t('delete')}
                    </LoadingButton>
                    <LoadingButton
                      size='small'
                      variant='contained'
                      onClick={handleImport}
                      sx={{ minWidth: '130px' }}
                      loading={importMerchant.isLoading}
                    >
                      {t('import')}
                    </LoadingButton>
                  </Stack>
                )}
              </Box>
            </FormProvider>
          </Wrapper>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
