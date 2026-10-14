import dayjs from 'dayjs'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useSearchParams } from 'react-router-dom'
import { useProfileStore } from '@/store/profile'
import { numberFormat } from '@/utils/number-format'
import { ReactComponent as IconRemoveCircleFill } from '@/assets/icons/remove-circle-fill.svg'
import { type FilterKey } from '@/types/mailing'

export const FilterChips = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currency = useProfileStore(state => state.me?.currency?.code)

  const minOrders = searchParams.get('min_orders')
  const maxOrders = searchParams.get('max_orders')
  const minOrdersSum = searchParams.get('min_orders_sum')
  const maxOrdersSum = searchParams.get('max_orders_sum')
  const startDate = searchParams.get('start_date')
  const endDate = searchParams.get('end_date')
  const country = searchParams.get('country')
  const cities = searchParams.getAll('cities')
  const countryName = searchParams.get('country_name')
  const cityNames = searchParams.getAll('cities_name').join(', ')

  const handleDelete = (key: keyof FilterKey) => () => {
    setSearchParams(params => {
      params.delete('page')

      if (key === 'orders') {
        params.delete('min_orders')
        params.delete('max_orders')
      } else if (key === 'orders_sum') {
        params.delete('min_orders_sum')
        params.delete('max_orders_sum')
      } else if (key === 'country') {
        params.delete('country')
        params.delete('country_name')
        params.delete('cities')
        params.delete('cities_name')
      } else if (key === 'cities') {
        params.delete('cities')
        params.delete('cities_name')
      } else if (key === 'date') {
        params.delete('start_date')
        params.delete('end_date')
      } else {
        params.delete(key)
      }

      return params
    })
  }

  if (
    !minOrders &&
    !maxOrders &&
    !minOrdersSum &&
    !maxOrdersSum &&
    !country &&
    cities.length === 0 &&
    !startDate &&
    !endDate
  ) {
    return null
  }

  return (
    <Stack m='10px 0 10px 0' gap='12px' direction='row' flexWrap='wrap'>
      {country && (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('country')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('country')}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {countryName ?? country}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
      {cities.length > 0 && (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('cities')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('cities')}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {cityNames || cities.join(', ')}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
      {(minOrders || maxOrders) && (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('orders')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('order_number')}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {minOrders}-{maxOrders}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
      {(minOrdersSum || maxOrdersSum) && (
        <Stack width='fit-content'>
          <Chip
            variant='filled'
            onDelete={handleDelete('orders_sum')}
            deleteIcon={<IconRemoveCircleFill />}
            label={
              <Typography variant='text'>
                {t('order_amount', { currency })}
                <Typography
                  ml='5px'
                  component='span'
                  fontWeight='500'
                  variant='inherit'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {numberFormat(minOrdersSum ?? 0)}-{numberFormat(maxOrdersSum ?? 0)}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
      {(startDate || endDate) && (
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
                  {dayjs(startDate).format('DD/MM/YYYY')}-{dayjs(endDate).format('DD/MM/YYYY')}
                </Typography>
              </Typography>
            }
          />
        </Stack>
      )}
    </Stack>
  )
}
