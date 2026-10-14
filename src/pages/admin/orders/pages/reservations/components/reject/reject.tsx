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

export const Reject = (props: RejectProps) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit, isLoading } = useReject(props)

  return (
    <>
      <Button
        onClick={setTrue}
        variant='contained-red'
        fullWidth={props.variant === 'modal'}
        size={props.variant === 'table' ? 'extraSmall' : undefined}
      >
        {t('reservation_reject')}
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
              <Typography variant='title30'>{t('reject_reservation')}</Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <FormControl>
                <Controller
                  name='reason'
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Box sx={{ gap: '12px 14px', display: 'flex', flexWrap: 'wrap' }}>
                        {Object.values(REASONS).map(({ value, label }) => (
                          <Label
                            key={value}
                            htmlFor={`reservation-reason-${value}`}
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
                              value={value}
                              icon={<div />}
                              checkedIcon={<div />}
                              id={`reservation-reason-${value}`}
                            />
                          </Label>
                        ))}
                      </Box>
                    </RadioGroup>
                  )}
                />
              </FormControl>
              {form.watch('reason') === REASONS.OTHER.value && (
                <Stack mt='32px'>
                  <InputTextarea
                    name='comment'
                    control={form.control}
                    sx={{ height: '120px' }}
                    placeholder='enter_reason_here'
                    labelMinimum={`${form.watch('comment')?.length ?? 0}/500`}
                  />
                </Stack>
              )}
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton
                  fullWidth
                  type='submit'
                  variant='contained'
                  loading={isLoading}
                  disabled={!form.watch('reason')}
                >
                  {t('submit')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
