import dayjs, { type Dayjs } from 'dayjs'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import LinearProgress from '@mui/material/LinearProgress'
import { useIsFetching } from '@tanstack/react-query'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FilterWrapper, PeriodChip } from './style'
import { ReactComponent as IconCalendarOutline } from '@/assets/icons/calendar-outline.svg'

const PERIODS = [
  { label: 'today', value: 'daily' },
  { label: 'weekly', value: 'weekly' },
  { label: 'monthly', value: 'monthly' },
  { label: 'quarterly', value: 'quarterly' },
  { label: 'yearly', value: 'yearly' },
]

const getRange = (period: string) => {
  const to = dayjs().format('YYYY-MM-DD')
  let from = to

  switch (period) {
    case 'daily':
      from = dayjs().format('YYYY-MM-DD')
      break
    case 'weekly':
      from = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
      break
    case 'monthly':
      from = dayjs().subtract(1, 'month').format('YYYY-MM-DD')
      break
    case 'quarterly':
      from = dayjs().subtract(3, 'month').format('YYYY-MM-DD')
      break
    case 'yearly':
      from = dayjs().subtract(1, 'year').format('YYYY-MM-DD')
      break
  }

  return { from, to }
}

interface DateRangeFilterProps {
  from: string
  to: string
  period: string
  onApply: (from: string, to: string, period: string) => void
}

const datePickerSx = {
  width: { xs: '100%', md: '160px' },
  '& .MuiInputBase-root': { height: '36px', fontSize: '14px' },
}

export const DateRangeFilter = ({ from, to, period, onApply }: DateRangeFilterProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isFetching = useIsFetching({
    predicate: query =>
      typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('dashboard-'),
  })
  const [localFrom, setLocalFrom] = useState(from)
  const [localTo, setLocalTo] = useState(to)
  const [localPeriod, setLocalPeriod] = useState(period)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handlePeriodClick = (value: string) => () => {
    const range = getRange(value)
    setLocalPeriod(value)
    setLocalFrom(range.from)
    setLocalTo(range.to)
    onApply(range.from, range.to, value)
  }

  const handleApply = () => {
    onApply(localFrom, localTo, '')
    setDrawerOpen(false)
  }

  const datePickerContent = (
    <>
      <Stack direction='row' gap='8px' alignItems='center' width='100%'>
        <DatePicker
          value={dayjs(localFrom)}
          maxDate={dayjs(localTo)}
          onChange={(value: Dayjs | null) => {
            if (value) {
              setLocalFrom(value.format('YYYY-MM-DD'))
              setLocalPeriod('')
            }
          }}
          format='DD/MM/YYYY'
          slotProps={{ textField: { size: 'small', sx: datePickerSx } }}
        />
        <Typography variant='text'>—</Typography>
        <DatePicker
          value={dayjs(localTo)}
          minDate={dayjs(localFrom)}
          maxDate={dayjs()}
          onChange={(value: Dayjs | null) => {
            if (value) {
              setLocalTo(value.format('YYYY-MM-DD'))
              setLocalPeriod('')
            }
          }}
          format='DD/MM/YYYY'
          slotProps={{ textField: { size: 'small', sx: datePickerSx } }}
        />
      </Stack>
      <Button
        size='small'
        variant='contained'
        onClick={handleApply}
        fullWidth={isMobile}
        sx={{ height: '36px', whiteSpace: 'nowrap', minWidth: { md: '100px' } }}
      >
        {t('apply')}
      </Button>
    </>
  )

  return (
    <FilterWrapper>
      {isFetching > 0 && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
            borderRadius: '12px 12px 0 0',
          }}
        />
      )}
      <Stack direction='row' gap='4px' alignItems='center' overflow='auto'>
        <Typography
          variant='title20'
          whiteSpace='nowrap'
          mr='4px'
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          {t('period')}:
        </Typography>
        <Stack direction='row' gap='4px' alignItems='center' flexWrap='wrap'>
          {PERIODS.map(p => (
            <PeriodChip
              key={p.value}
              type='button'
              active={localPeriod === p.value}
              onClick={handlePeriodClick(p.value)}
            >
              {t(p.label)}
            </PeriodChip>
          ))}
        </Stack>
        {isMobile && (
          <IconButton
            size='small'
            onClick={() => {
              setDrawerOpen(true)
            }}
            sx={{ ml: 'auto' }}
          >
            <IconCalendarOutline />
          </IconButton>
        )}
      </Stack>

      {isMobile ? (
        <Drawer
          anchor='bottom'
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false)
          }}
          PaperProps={{ sx: { borderRadius: '16px 16px 0 0', p: 2 } }}
        >
          <Box
            sx={{ width: 40, height: 4, bgcolor: 'grey.300', borderRadius: 2, mx: 'auto', mb: 2 }}
          />
          <Typography variant='title20' mb={1.5}>
            {t('period')}
          </Typography>
          <Stack gap={1.5}>{datePickerContent}</Stack>
        </Drawer>
      ) : (
        <Stack direction='row' gap='8px' alignItems='center' ml='auto'>
          {datePickerContent}
        </Stack>
      )}
    </FilterWrapper>
  )
}
