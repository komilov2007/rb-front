import dayjs from 'dayjs'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { BranchChip } from '../branch-chip'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { PLATFORMS } from '@/constants/busniness'
import { PAYMENT_TYPES } from '@/constants/payment'
import { type PlatformsProps } from '@/types/busniness'
import { type PaymentTypeProps } from '@/types/payment'
import { type DateTypeProps } from '@/types/date-period'
import { type SchemaTypeOrderFilter } from '@/utils/schema'
import { useLocation, useNavigate } from 'react-router-dom'
import { DATE_PERIOD_FILTER } from '@/constants/date-period'
import { ReactComponent as IconRemoveCircleFill } from '@/assets/icons/remove-circle-fill.svg'
import { ALL_OPTION } from '@/constants/option'

type FormFiledsProps = keyof SchemaTypeOrderFilter

export const FilterChips = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    state,
    search,
    pathname,
  }: { state: SchemaTypeOrderFilter; search: string; pathname: string } = useLocation()

  const handleDelete = (item: FormFiledsProps) => () => {
    const list = Object.entries(state)
      .filter(([key]) =>
        item === 'date' && key === 'period' ? false : item === 'platform' ? true : item !== key,
      )
      .map(([key, value]) =>
        item === 'platform' && key === item ? [key, ALL_OPTION.value] : [key, value],
      )
    const data = Object.fromEntries(item === 'date' ? [...list, ['date', 'ALL']] : list)
    navigate(`${pathname}${search}`, { state: data })
  }

  if (!state) {
    return null
  }

  return (
    <Stack mb='16px' gap='12px' direction='row' flexWrap='wrap'>
      {state.payment_type && state.payment_type?.length > 0 && (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('payment_type')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('payment_type')}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {state.payment_type
                    .map(p => t(PAYMENT_TYPES[p.state as PaymentTypeProps].label))
                    .join(', ')}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
      {state.service_type && state.service_type?.length > 0 && (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('service_type')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('order_type')}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {state.service_type.map(s => t(s.title)).join(', ')}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
      {state.platform && state.platform !== 'ALL' && (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('platform')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('platform')}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {t(PLATFORMS[state.platform as PlatformsProps].label)}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
      {state.branch && state.branch !== 'ALL' && (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('branch')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('branch')}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  <BranchChip id={state.branch} />
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
      {state.status && state?.status?.length > 0 && (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('status')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('status')}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {state.status.map(s => t(s.label)).join(', ')}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
      {state.date && state.date !== 'ALL' ? (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('date')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('date_period')}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {state?.date === DATE_PERIOD_FILTER.CUSTOM.value
                    ? state.period && (
                        <>
                          {dayjs(state.period[0]).format('DD/MM/YYYY')}-
                          {dayjs(state.period[1]).format('DD/MM/YYYY')}
                        </>
                      )
                    : t(DATE_PERIOD_FILTER[state.date as DateTypeProps].label)}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      ) : null}
      {state.employee && (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('employee')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('employee')}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {state.employee.name}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
    </Stack>
  )
}
