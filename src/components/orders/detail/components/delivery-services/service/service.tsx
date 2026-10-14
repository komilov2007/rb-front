import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import { FormControlLabel } from './style'
import { getFargo } from '@/apis/admin/fargo'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { getUzpost } from '@/apis/admin/uzpost'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { type OrderSefviceOptionProps } from '@/types/order'
import { ORDER_SERVICE_OPTIONS } from '@/constants/order'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getBts } from '@/apis/admin/bts'
import { useProfileStore } from '@/store/profile'

export const Service = ({ Icon, value, label }: OrderSefviceOptionProps) => {
  const { t } = useTranslation()
  const { is_free, is_basic, is_expired } = useProfileStore(state => ({
    is_free: state.me?.subscription.is_free,
    is_basic: state.me?.subscription.is_basic,
    is_expired: state.me?.subscription.is_expired,
  }))

  const hasAccess = (is_basic || is_expired) && !is_free

  const btsEnabled = value === ORDER_SERVICE_OPTIONS.BTS.value
  const fargoEnabled = value === ORDER_SERVICE_OPTIONS.FARGO.value
  const uzpostEnabled = value === ORDER_SERVICE_OPTIONS.UZPOST.value

  const bts = useQuery({
    queryFn: getBts,
    enabled: btsEnabled,
    queryKey: [REACT_QUERY_KEYS.BTS_DETAIL],
  })

  const fargo = useQuery({
    queryFn: getFargo,
    enabled: fargoEnabled && !hasAccess,
    queryKey: [REACT_QUERY_KEYS.FARGO_DETAIL],
  })

  const uzpost = useQuery({
    queryFn: getUzpost,
    enabled: uzpostEnabled && !hasAccess,
    queryKey: [REACT_QUERY_KEYS.UZPOST_DETAIL],
  })

  return (
    <>
      {(fargo.isLoading && fargoEnabled) ||
      (uzpost.isLoading && uzpostEnabled) ||
      (bts.isLoading && btsEnabled) ? (
        <Skeleton height='52px' variant='rounded' sx={{ borderRadius: '9px' }} />
      ) : (fargo.data?.data.min_price && fargoEnabled && !hasAccess) ||
        (uzpost.data?.data.username && uzpostEnabled && !hasAccess) ||
        (bts.data?.data.token && btsEnabled) ||
        value === ORDER_SERVICE_OPTIONS.YOUR_DELIVERY.value ? (
        <FormControlLabel
          key={value}
          value={value}
          control={<Radio />}
          label={
            <Stack gap='10px' direction='row' alignItems='center'>
              {Icon && (
                <Stack
                  justifyContent='center'
                  sx={{
                    svg: {
                      width: '40px',
                      height: '30px',
                    },
                  }}
                >
                  <Icon />
                </Stack>
              )}
              <Typography
                component='p'
                align='left'
                maxWidth='300px'
                variant='text110'
                color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
              >
                {t(label)}
              </Typography>
            </Stack>
          }
        />
      ) : null}
    </>
  )
}
