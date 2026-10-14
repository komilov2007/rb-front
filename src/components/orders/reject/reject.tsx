import { Label } from './style'
import Box from '@mui/material/Box'
import { REASONS } from './constants'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import { useReject, type RejectProps } from './useReject'
import { Controller, FormProvider } from 'react-hook-form'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { Subcription } from '@/components/modals/subcription'

export const Reject = (props: RejectProps) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit, isLoading } = useReject(props)
  const disabled =
    props.status === 'DELIVERED' ||
    props.status === 'COMPLETED' ||
    props.status === 'CANCEL' ||
    props.status === 'CANCELED_BY_CUSTOMER'

  return (
    <>
      <Button disabled={disabled} size='extraSmall' onClick={setTrue} variant='contained-red'>
        {t('reject')}
      </Button>
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        {!props.is_visible ? (
          <Subcription
            variant='drawer'
            title='Order_limit_reached'
            description='Youre_currently_on_the_Start_plan_which_allows_up_to_10_orders_per_month'
          />
        ) : (
          <FormProvider {...form}>
            <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
              <Box
                display='flex'
                p='7px 7px 0 32px'
                component='header'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography variant='title30'>{t('reject_order')}</Typography>
                <IconButton onClick={setFalse}>
                  <IconRemove />
                </IconButton>
              </Box>
              <Box className='content'>
                <FormControl>
                  <Controller
                    name='admin_comment'
                    control={form.control}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <Box sx={{ gap: '12px 14px', display: 'flex', flexWrap: 'wrap' }}>
                          {Object.values(REASONS).map(({ value, label }) => (
                            <Label
                              key={value}
                              htmlFor={value}
                              sx={theme => ({
                                background:
                                  field.value === value
                                    ? theme.palette.allColors.PURPLE80
                                    : undefined,
                              })}
                            >
                              <Typography
                                fontSize='14px'
                                variant='title20'
                                color={theme =>
                                  field.value === value ? theme.palette.allColors.WHITE : undefined
                                }
                              >
                                {t(label)}
                              </Typography>
                              <Radio
                                id={value}
                                value={value}
                                icon={<div />}
                                checkedIcon={<div />}
                              />
                            </Label>
                          ))}
                        </Box>
                      </RadioGroup>
                    )}
                  />
                </FormControl>
                {form.watch('admin_comment') === REASONS.OTHER.value && (
                  <Stack mt='32px'>
                    <InputTextarea
                      name='comment'
                      control={form.control}
                      sx={{ height: '120px' }}
                      placeholder='enter_reason_here'
                      labelMinimum={`${form.watch('comment')?.length}/500`}
                    />
                  </Stack>
                )}
              </Box>
              <Box className='footer'>
                <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                  <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                    {t('cancel')}
                  </Button>
                  <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                    {t('submit')}
                  </LoadingButton>
                </Stack>
              </Box>
            </Box>
          </FormProvider>
        )}
      </SwipeableDrawer>
    </>
  )
}
