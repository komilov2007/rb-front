import Box from '@mui/material/Box'
import { WrapInput } from './style'
import { type ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import { LATE_TIMES } from './constants'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import { Controller } from 'react-hook-form'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import { useProfileStore } from '@/store/profile'
import RadioGroup from '@mui/material/RadioGroup'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { useSelect, type SelectLateProps } from './useSelect'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconClockCircle } from '@/assets/icons/clock-circle.svg'
import { ReactComponent as IconWorkDeadLine } from '@/assets/icons/work-deadline.svg'
import { ReactComponent as IconRemoveCircle } from '@/assets/icons/remove-circle.svg'

export const SelectLate = (props: SelectLateProps) => {
  const { t } = useTranslation()
  const { can_edit, can_delete } = useProfileStore(state => ({
    can_edit: state.getPermission('orders', 'can_edit'),
    can_delete: state.getPermission('orders', 'can_delete'),
  }))
  const {
    data,
    form,
    modal,
    value,
    onSubmit,
    isLoading,
    changeTime,
    handleChangeTime,
    handleUpdateTime,
  } = useSelect(props)

  if (!can_edit && props.variant === 'body') {
    return null
  }

  return (
    <>
      {props.variant === 'body' ? (
        data?.data.late_time ? null : (
          <Stack
            maxWidth='326px'
            component='form'
            alignItems='center'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Stack
              mt='20px'
              alignItems='center'
              justifyContent='center'
              sx={{
                svg: {
                  width: { xs: '50%', md: '100%' },
                  height: { xs: '50%', md: '100%' },
                },
              }}
            >
              <IconWorkDeadLine />
            </Stack>
            <Typography
              m='25px 0 4px'
              align='center'
              variant='title70'
              fontSize={{ xs: '16px', md: '20px' }}
            >
              {t('set_late_time')}
            </Typography>
            <Typography mb='24px' align='center' variant='text30'>
              {t('enter_time_to_keep_track_of_late_orders')}
            </Typography>
            <Button size='mediumSmall' sx={{ minWidth: '147px' }} onClick={modal.setTrue}>
              {t('set_time')}
            </Button>
          </Stack>
        )
      ) : (
        <Stack display={props.mobile ? { xs: 'flex', md: 'none' } : { xs: 'none', md: 'flex' }}>
          <Select
            open={false}
            displayEmpty
            value={value}
            onClick={modal.setTrue}
            onChange={handleChangeTime}
            disabled={isLoading || changeTime.isLoading}
            sx={theme => ({
              height: '42px',
              borderRadius: '5px !important',
              minWidth: { xs: 'unset', md: '133px' },
              backgroundColor: theme.palette.allColors.WHITE,
              fieldset: {
                borderColor: theme.palette.allColors.GRAY10,
              },
              '.MuiSelect-select': {
                paddingRight: '14px !important',
              },
              '.MuiOutlinedInput-input': {
                paddingTop: '9px !important',
                paddingBottom: '9px !important',
              },
            })}
            IconComponent={() =>
              isLoading || changeTime.isLoading ? (
                <Stack pr='10px'>
                  <Spinner
                    center
                    sx={{
                      '.MuiCircularProgress-root': {
                        width: '20px !important',
                        height: '20px !important',
                      },
                    }}
                  />
                </Stack>
              ) : (
                <>
                  {can_edit && value ? (
                    <IconButton
                      onClick={handleUpdateTime}
                      sx={{ p: 0, mr: '10px', zIndex: '999', display: { xs: 'none', md: 'flex' } }}
                    >
                      <IconRemoveCircle />
                    </IconButton>
                  ) : null}
                </>
              )
            }
            renderValue={() => {
              const isHour = Number(value) >= 60
              const hour = isHour ? (Number(value) / 60).toFixed(1) : value
              const minut = Number(value) % 60 >= 10 ? Number(value) % 60 : `0${Number(value) % 60}`
              const type = isHour ? 'number_hour' : 'number_minut'

              return (
                <Stack p='6px 0' gap='8px' direction='row' alignItems='center'>
                  <Stack>
                    <IconClockCircle />
                  </Stack>
                  <Stack justifyContent='center' display={{ xs: 'none', md: 'flex' }}>
                    <Typography
                      variant='text250'
                      component='span'
                      color={theme => theme.palette.allColors.GRAY30}
                    >
                      {t('late_time')}
                    </Typography>
                    {value ? (
                      <Typography variant='text' color={theme => theme.palette.allColors.BLACK30}>
                        {t(type, {
                          value: isHour ? `${Math.floor(Number(value) / 60)}:${minut}` : hour,
                        })}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>
              ) as ReactNode
            }}
          />
        </Stack>
      )}
      <SwipeableDrawer
        anchor='right'
        open={modal.value}
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
            <Typography variant='title30'>{t('set_late_time')}</Typography>
            <IconButton onClick={modal.setFalse}>
              <IconRemove />
            </IconButton>
          </Box>
          <Box className='content'>
            <Stack gap='12px' m='24px 0 28px' justifyContent='center' direction='row'>
              <WrapInput>
                <Input
                  name='hour'
                  type='tel'
                  control={form.control}
                  onChange={() => {
                    form.setValue('option', 1)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment sx={{ mt: '10px' }} position='end'>
                        {t('hour')}
                      </InputAdornment>
                    ),
                  }}
                />
              </WrapInput>
              <Typography pt='13px' variant='title140'>
                :
              </Typography>
              <WrapInput>
                <Input
                  control={form.control}
                  name='minut'
                  type='tel'
                  onChange={() => {
                    form.setValue('option', undefined)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment sx={{ mt: '10px' }} position='end'>
                        {t('minut')}
                      </InputAdornment>
                    ),
                  }}
                />
              </WrapInput>
            </Stack>
            <Controller
              name='option'
              control={form.control}
              render={({ field: { onChange, ...rest } }) => {
                return (
                  <RadioGroup
                    onChange={e => {
                      onChange(e)
                      const time = e.target.value
                      const isHour = Number(time) >= 60
                      const hour = isHour ? Number(time) / 60 : 0
                      const minut = isHour ? Number(time) % 60 : Number(time)
                      form.setValue('hour', hour)
                      form.setValue('minut', minut)
                    }}
                    {...rest}
                  >
                    {LATE_TIMES.map((time, i) => {
                      const isHour = Number(time) >= 60
                      const hour = isHour ? (Number(time) / 60).toFixed(1) : time
                      const minut =
                        Number(time) % 60 >= 10 ? Number(time) % 60 : `0${Number(time) % 60}`
                      const type = isHour ? 'number_hour' : 'number_minut'

                      return (
                        <FormControlLabel
                          key={i}
                          value={time}
                          label={t(type, {
                            value: isHour ? `${Math.floor(Number(time) / 60)}:${minut}` : hour,
                          })}
                          control={<Radio />}
                        />
                      )
                    })}
                  </RadioGroup>
                )
              }}
            />
          </Box>
          <Box className='footer'>
            <Stack gap='14px' width='100%' direction='row' maxWidth='481px'>
              <Button fullWidth variant='outlined-transparent' onClick={modal.setFalse}>
                {t('cancel')}
              </Button>
              {can_delete && (
                <LoadingButton
                  fullWidth
                  variant='filled-red'
                  onClick={handleUpdateTime}
                  loading={changeTime.isLoading}
                >
                  {t('delete')}
                </LoadingButton>
              )}
              {can_edit && (
                <LoadingButton
                  fullWidth
                  type='submit'
                  variant='contained'
                  loading={changeTime.isLoading}
                >
                  {t('save')}
                </LoadingButton>
              )}
            </Stack>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
