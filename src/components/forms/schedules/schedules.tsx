import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SCHEDULES_LABELS } from '@/constants/schedules'
import { type SchemaTypeSchedules } from '@/utils/schema'
import InputAdornment from '@mui/material/InputAdornment'
import { InputSwitch } from '@/components/inputs/input-switch'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ReactComponent as IconHalfMoonLight } from '@/assets/icons/half-moon-light.svg'
import { Hours } from './hours'

export const Schedules = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeSchedules>()
  const { fields } = useFieldArray({
    name: 'schedules',
    control: form.control,
  })

  return (
    <Box>
      <Typography variant='title10'>{t('working_time')}</Typography>
      <Box gap='22px' mt='14px' display='flex' flexDirection='column' component='ul'>
        {fields.map((item, index) => {
          return (
            <Box
              gap='55px'
              key={item.id}
              component='li'
              display='grid'
              gridTemplateColumns='135px auto'
              sx={theme => ({
                alignItems: 'flex-start',
                [theme.breakpoints.down('md')]: {
                  gap: '15px',
                  gridTemplateColumns: 'auto',
                },
              })}
            >
              <InputSwitch
                control={form.control}
                label={SCHEDULES_LABELS[item.day - 1]}
                name={`schedules.${index}.is_closed`}
              />
              {form.watch(`schedules.${index}.is_closed`) ? (
                <Hours index={index} />
              ) : (
                <TextField
                  fullWidth
                  value={t('closed')}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position='start'>
                        <IconHalfMoonLight />
                      </InputAdornment>
                    ),
                  }}
                  sx={theme => ({
                    '.MuiInputBase-root': {
                      paddingLeft: '11px !important',
                    },
                    '.MuiOutlinedInput-root input': {
                      fontSize: '12px !important',
                      fontWeight: '400 !important',
                      color: `${theme.palette.allColors.GRAY100} !important`,
                    },
                  })}
                />
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
