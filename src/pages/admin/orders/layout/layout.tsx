import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { type SyntheticEvent } from 'react'
import TabContext from '@mui/lab/TabContext'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { Suspense } from '@/components/suspense'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { useOrderStore } from '@/store/order'
import { useProfileStore } from '@/store/profile'
import { Actions } from '@/components/orders/actions'
import { ORDERS_STATUS_TABS } from '@/constants/order'
import { getOrderStatusCount } from '@/apis/admin/order'
import { OrderCreate } from '@/components/orders/create'
import { AssemblySheet } from '@/components/orders/assembly-sheet'
import { getBitoToken } from '@/apis/admin/bito'
import type { OrderStatusesTabProps } from '@/types/order'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as IconInteractive } from '@/assets/icons/interactive.svg'

const Layout = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { setBitoIsDebt } = useOrderStore(state => ({
    setBitoIsDebt: state.setBitoIsDebt,
  }))

  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.ORDER_STATUS_COUNT],
    queryFn: getOrderStatusCount,
  })

  useQuery({
    queryKey: [REACT_QUERY_KEYS.BITO_DETAIL],
    queryFn: getBitoToken,
    onSuccess: res => {
      if (res.data?.is_debt !== undefined) {
        setBitoIsDebt(res.data.is_debt)
      }
    },
  })

  const status = Object.values(ORDERS_STATUS_TABS).find(
    o => o.value === location.pathname.replace(`${ROUTER.ADMIN}/${ROUTER.ORDERS}`, ''),
  )?.status as OrderStatusesTabProps

  const can_edit = useProfileStore(state => state.getPermission('orders', 'can_edit'))

  const onChangeTab = (_: SyntheticEvent, tab: string) => {
    navigate(tab)
  }

  return (
    <Stack pt='10px' height='100%'>
      {isLoading ? (
        <Spinner center />
      ) : (
        <>
          <Stack
            px='10px'
            gap='5px'
            justifyContent='space-between'
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Stack
              gap='5px'
              width='100%'
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='title30' component='h3'>
                {t('list_of_orders')}
              </Typography>
              <Stack display={{ xs: 'flex', md: 'none' }}>
                <Actions isLate={status === 'LATE'} mobile status={status} />
              </Stack>
            </Stack>
            <Stack
              gap='10px'
              width='100%'
              direction={{ xs: 'column', md: 'row' }}
              maxWidth={{ xs: '100%', md: can_edit ? '600px' : '400px' }}
            >
              <AssemblySheet />
              <Stack gap='10px' direction='row' width='100%'>
                <Button
                  fullWidth
                  component={Link}
                  size='mediumSmall'
                  variant='outlined'
                  startIcon={<IconInteractive />}
                  to={ROUTER.ORDERS_AUTO_RESPONDER}
                >
                  {t('autoresponder')}
                </Button>
                {can_edit && <OrderCreate />}
              </Stack>
            </Stack>
          </Stack>
          <Stack overflow='hidden' height='100%'>
            <TabContext value={location.pathname}>
              <TabList
                variant='scrollable'
                scrollButtons={false}
                onChange={onChangeTab}
                aria-label='order-tabs'
                sx={{
                  px: '10px',
                  '::after': {
                    left: '10px',
                    width: 'calc(100% - 20px)',
                  },
                }}
              >
                {Object.values(ORDERS_STATUS_TABS).map(({ label, value, status, color }) => (
                  <Tab
                    key={value}
                    value={`${ROUTER.ADMIN}/${ROUTER.ORDERS}${value}`}
                    label={
                      <Stack gap='5px' direction='row' alignItems='center'>
                        {t(label)}{' '}
                        {status && color && Number(data?.data[status]) > 0 && (
                          <Stack
                            height='22px'
                            direction='row'
                            component='span'
                            alignItems='center'
                            sx={theme => ({
                              p: '0 6px',
                              borderRadius: '20px',
                              backgroundColor: theme.palette.allColors[color],
                            })}
                          >
                            <Typography
                              component='p'
                              minWidth='13px'
                              variant='inherit'
                              color={theme => theme.palette.allColors.WHITE}
                            >
                              {data?.data[status]}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    }
                  />
                ))}
              </TabList>
              <Suspense>
                <Stack pt='10px' height='100%' flexGrow={1} sx={{ overflowY: 'auto' }}>
                  <Outlet />
                </Stack>
              </Suspense>
            </TabContext>
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default Layout
