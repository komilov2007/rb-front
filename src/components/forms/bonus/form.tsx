import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { Image } from '@/components/image'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import { useBoolean } from '@/hooks/useBoolean'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { yupResolver } from '@hookform/resolvers/yup'
import ImageCashback from '@/assets/images/cashback.png'
import InputAdornment from '@mui/material/InputAdornment'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { getCashback, updateCashback } from '@/apis/common'
import { useMutation, useQuery } from '@tanstack/react-query'
import { InputSwitch } from '@/components/inputs/input-switch'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { schemaBonus, type SchemaTypeBonus } from '@/utils/schema'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { ReactComponent as IconSettingsFill } from '@/assets/icons/settings-fill.svg'

export const FormBonus = () => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const form = useForm<SchemaTypeBonus>({
    mode: 'onChange',
    resolver: yupResolver(schemaBonus),
    defaultValues: schemaBonus.cast({}, { assert: false }),
  })
  const currency = useProfileStore(state => state.me?.currency.code)
  const { isLoading } = useQuery({
    queryFn: getCashback,
    enabled: modal.value,
    queryKey: [REACT_QUERY_KEYS.CASHBACK_DETAIL],
    onSuccess: res => {
      form.reset({
        cashback_amount: res.data.cashback_amount,
        cashback_enabled: res.data.cashback_enabled,
      })
    },
  })

  const { mutate, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: async (data: SchemaTypeBonus) => await updateCashback(data),
    onSuccess: () => {
      toast.success(t('settings_saved_successfully'))
      modal.setFalse()
    },
  })

  const onSubmit = (data: SchemaTypeBonus) => {
    mutate(data)
  }

  return (
    <>
      <Button variant='outlined' startIcon={<IconSettingsFill />} onClick={modal.setTrue}>
        {t('ball_sozlamalari')}
      </Button>
      <SwipeableDrawer
        open={modal.value}
        anchor='right'
        onOpen={modal.setTrue}
        onClose={modal.setFalse}
      >
        <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
          <Box
            display='flex'
            p='7px 7px 0 32px'
            component='header'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='title30'>{t('bonus_point')}</Typography>
            <IconButton onClick={modal.setFalse}>
              <IconRemove />
            </IconButton>
          </Box>
          {isLoading ? (
            <Spinner center />
          ) : (
            <>
              <Box className='content'>
                <Stack mb='46px' gap='20px'>
                  <InputSwitch
                    name='cashback_enabled'
                    control={form.control}
                    label='enable_bonus_points_for_customers'
                  />
                  {form.watch('cashback_enabled') && (
                    <>
                      <InputPriceFormat
                        fullWidth
                        label='bonus_amount'
                        control={form.control}
                        name='cashback_amount'
                        placeholder='enter_amount'
                        InputProps={{
                          startAdornment: undefined,
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Typography
                                variant='text'
                                color={theme => theme.palette.allColors.PURPLE}
                              >
                                {currency}
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {(form.watch('cashback_amount') ?? 0) > 0 && (
                        <Stack gap='5px' direction='row' alignItems='center'>
                          <Typography variant='text30' whiteSpace='nowrap'>
                            1 {t('point')} ={' '}
                          </Typography>
                          <Typography variant='title10'>
                            {form.watch('cashback_amount')} {currency}
                          </Typography>
                        </Stack>
                      )}
                    </>
                  )}
                  <Typography variant='title50'>{t('bonus_point_description')}</Typography>
                  <Typography variant='title50'>{t('bonus_amount_description')}</Typography>
                  <Typography variant='title50'>{t('encourage_with_bonus_points')}</Typography>
                  <Image src={ImageCashback} alt='cashback' />
                </Stack>
              </Box>
              <Box className='footer'>
                <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                  <Button fullWidth variant='outlined-transparent' onClick={modal.setFalse}>
                    {t('cancel')}
                  </Button>
                  <LoadingButton
                    fullWidth
                    type='submit'
                    variant='contained'
                    loading={isLoadingUpdate}
                  >
                    {t('save')}
                  </LoadingButton>
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  )
}
