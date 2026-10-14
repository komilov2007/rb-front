import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import type { SchemaTypeSchedules } from '@/utils/schema'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ReactComponent as IconAdd } from '@/assets/icons/add.svg'
import { InputTimePicker } from '@/components/inputs/input-timepicker'
import { ReactComponent as IconCloseError } from '@/assets/icons/close-error.svg'

interface HoursProps {
  index: number
}

export const Hours = ({ index }: HoursProps) => {
  const form = useFormContext<SchemaTypeSchedules>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `schedules.${index}.hours`,
  })

  const handleAppend = () => {
    append({
      open: dayjs().format('YYYY-MM-DD 00:00:00'),
      close: dayjs().format('YYYY-MM-DD 23:59:59'),
    })
  }

  const handleRemove = (index: number) => () => {
    remove(index)
  }

  return (
    <Stack spacing={3} pr='90px'>
      {fields.map((field, nestIndex) => {
        const handleClearClose = () => {
          form.clearErrors(`schedules.${index}.hours.${nestIndex}.close`)
        }
        const handleClearOpen = () => {
          form.clearErrors(`schedules.${index}.hours.${nestIndex}.open`)
        }
        return (
          <Box gap='20px' display='flex' key={field.id} position='relative'>
            <InputTimePicker
              control={form.control}
              onChange={handleClearClose}
              maxTime={dayjs(field.close)}
              name={`schedules.${index}.hours.${nestIndex}.open`}
            />
            <InputTimePicker
              control={form.control}
              onChange={handleClearOpen}
              minTime={dayjs(field.open)}
              name={`schedules.${index}.hours.${nestIndex}.close`}
            />
            <Stack
              pt='10px'
              top='-5px'
              spacing={1.5}
              direction='row'
              position='absolute'
              right={fields.length - 1 === nestIndex && fields.length > 1 ? '-95px' : '-45px'}
            >
              {fields.length > 1 && (
                <IconButton radius='50%' onClick={handleRemove(nestIndex)}>
                  <IconCloseError />
                </IconButton>
              )}
              {fields.length - 1 === nestIndex && (
                <IconButton radius='50%' onClick={handleAppend}>
                  <IconAdd />
                </IconButton>
              )}
            </Stack>
          </Box>
        )
      })}
    </Stack>
  )
}
