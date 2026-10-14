import { Container } from './style'
import { type ControlProps } from '@/types/components'
import { Controller, type FieldValues } from 'react-hook-form'
import { Calendar as DateCalendar } from 'react-multi-date-picker'

export const Calendar = <T extends FieldValues>({ name, control }: ControlProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Container>
            <DateCalendar
              range
              rangeHover
              value={value}
              onChange={onChange}
              maxDate={new Date()}
              weekStartDayIndex={1}
              headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
            />
          </Container>
        )
      }}
    />
  )
}
