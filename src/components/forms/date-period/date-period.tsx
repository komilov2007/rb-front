import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import weekday from 'dayjs/plugin/weekday'
import { Calendar } from '@/components/calendar'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import { type SchemaTypeDatePeriod } from '@/utils/schema'
import { DATE_PERIOD_FILTER } from '@/constants/date-period'
import { Controller, useFormContext } from 'react-hook-form'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useTranslation } from 'react-i18next'

dayjs.extend(weekday)

export const DatePeriod = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeDatePeriod>()

  return (
    <Stack>
      <Typography variant='title10' fontWeight='400' component='h3'>
        {t('date_period')}
      </Typography>
      <Stack mb='6px'>
        <Controller
          name='date'
          control={form.control}
          render={({ field: { onChange, ...rest } }) => {
            return (
              <RadioGroup
                {...rest}
                onChange={e => {
                  onChange(e)
                  if (e.target.value === DATE_PERIOD_FILTER.DAILY.value) {
                    const start = dayjs().toDate()
                    const end = dayjs().toDate()

                    form.setValue('period', [start, end])
                  }
                  if (e.target.value === DATE_PERIOD_FILTER.WEEKLY.value) {
                    const start =
                      dayjs().day() === 0
                        ? dayjs().weekday(-dayjs().day())
                        : dayjs().weekday(dayjs().day())
                    const end = dayjs().weekday(dayjs().day())

                    form.setValue('period', [start.toDate(), end.toDate()])
                  }
                  if (e.target.value === DATE_PERIOD_FILTER.MONTHLY.value) {
                    const start = dayjs().date(1).toDate()
                    const end = dayjs().toDate()

                    form.setValue('period', [start, end])
                  }
                  if (e.target.value === DATE_PERIOD_FILTER.YEARLY.value) {
                    const start = dayjs().set('month', 0).set('D', 1).toDate()
                    const end = dayjs().toDate()

                    form.setValue('period', [start, end])
                  }
                }}
                sx={{ ml: '-9px' }}
              >
                {Object.values(DATE_PERIOD_FILTER).map(({ value, label }) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    label={t(label)}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
            )
          }}
        />
      </Stack>
      {form.watch('date') === DATE_PERIOD_FILTER.CUSTOM.value && (
        <Calendar name='period' control={form.control} />
      )}
    </Stack>
  )
}
