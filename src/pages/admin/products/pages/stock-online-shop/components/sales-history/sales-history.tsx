import Box from '@mui/material/Box'
import { Container } from './style'
import Chart from 'react-apexcharts'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Image } from '@/components/image'
import { Table } from '@/components/table'
import Skeleton from '@mui/material/Skeleton'
import { Spinner } from '@/components/spinner'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useSalesHistory } from './useSalesHistory'
import type { StockOnlineShopProps } from '@/types/stock'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconDirectionDownLinear } from '@/assets/icons/direction-down-linear.svg'
import { formatNumber } from '@/utils/number-format'

export const SalesHistory = (props: StockOnlineShopProps) => {
  const theme = useTheme()
  const {
    t,
    data,
    value,
    month,
    columns,
    history,
    setTrue,
    currency,
    setFalse,
    setMonth,
    isLoading,
  } = useSalesHistory(props)

  return (
    <>
      <Button
        size='small'
        variant='text'
        onClick={setTrue}
        sx={{
          textDecoration: 'underline',
          svg: { transform: 'rotate(90deg)' },
          ':hover': { textDecoration: 'underline' },
        }}
        endIcon={<IconDirectionDownLinear />}
      >
        {t('sales_history')}
      </Button>
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        <Box className='container'>
          <Box
            display='flex'
            p='7px 7px 0 32px'
            component='header'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='title30'>{t('sales_history')}</Typography>
            <IconButton onClick={setFalse}>
              <IconRemove />
            </IconButton>
          </Box>
          <Box className='content'>
            {isLoading ? (
              <Spinner center />
            ) : (
              <>
                <Container>
                  <Stack gap='15px' direction='row' alignItems='center'>
                    <Image
                      radius='5px'
                      alt={props.name}
                      src={props.photo}
                      sx={{ height: '37px', width: '42px', minHeight: '37px', minWidth: '42px' }}
                    />
                    <Typography variant='text340' fontWeight={400}>
                      {props.name}
                    </Typography>
                  </Stack>
                  <Stack gap='20px' direction='row' alignItems='center'>
                    <Typography variant='text330'>
                      {t('total_number_of_sales')}:{' '}
                      <Typography variant='text340' component='span'>
                        {t('count_pcs', { count: data?.data.product.total_sold })}
                      </Typography>
                    </Typography>
                    <Typography variant='text330'>
                      {t('total_amount')}:{' '}
                      <Typography variant='text340' component='span'>
                        {data?.data.product.total_amount} {currency}
                      </Typography>
                    </Typography>
                  </Stack>
                </Container>
                {month && typeof month.index === 'number' && (
                  <>
                    {history.isLoading ? (
                      <Stack mt='20px' gap='10px'>
                        <Skeleton />
                        <Stack direction='row' gap='15px'>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </Stack>
                      </Stack>
                    ) : (
                      <Stack mt='20px' gap='10px'>
                        <Typography>{t('month_statistics', { month: month.month })}</Typography>
                        <Stack direction='row' gap='15px'>
                          <Typography variant='text330'>
                            {t('total_sales')}:{' '}
                            <Typography variant='text340' component='span'>
                              {formatNumber(month?.total_amount)}
                            </Typography>
                          </Typography>
                          <Typography variant='text330'>
                            {t('cost_price')}:{' '}
                            <Typography variant='text340' component='span'>
                              {formatNumber(month?.total_income)}
                            </Typography>
                          </Typography>
                          <Typography variant='text330'>
                            {t('profit')}:{' '}
                            <Typography variant='text340' component='span'>
                              {formatNumber(month?.total_profit)}
                            </Typography>
                          </Typography>
                        </Stack>
                      </Stack>
                    )}{' '}
                  </>
                )}
                <Chart
                  height='330'
                  options={{
                    chart: {
                      type: 'bar',
                      height: 330,
                      events: {
                        click: function (_, __, opts) {
                          const month = data?.data.monthly_record.find(
                            (_, i) => i === opts.dataPointIndex,
                          )
                          setMonth(month)
                        },
                      },
                      zoom: {
                        enabled: false,
                      },
                      toolbar: {
                        show: false,
                      },
                    },
                    labels: [],
                    dataLabels: {
                      enabled: true,
                      formatter: (val: number) => formatNumber(val),
                    },
                    plotOptions: {
                      bar: {
                        columnWidth: 50,
                        borderRadius: 8,
                      },
                    },
                    yaxis: {
                      show: false,
                    },
                  }}
                  type='bar'
                  series={[
                    {
                      name: t('earnings'),
                      data:
                        data?.data.monthly_record.map((m, i) => ({
                          x: m.month,
                          y: m.total_amount,
                          fillColor:
                            i === month?.index
                              ? theme.palette.allColors.GREEN
                              : theme.palette.allColors.PURPLE,
                        })) ?? [],
                    },
                  ]}
                />
                {month && typeof month.index === 'number' ? (
                  history.isLoading ? (
                    <Stack gap='5px'>
                      <Skeleton height='42px' variant='rectangular' />
                      <Stack gap='5px'>
                        <Skeleton height='60px' variant='rectangular' />
                        <Skeleton height='60px' variant='rectangular' />
                        <Skeleton height='60px' variant='rectangular' />
                      </Stack>
                    </Stack>
                  ) : (
                    history.data?.data &&
                    history.data?.data.length > 0 && (
                      <Table
                        isLoading={history.isLoading}
                        isFetching={history.isFetching}
                        emptyTitle='you_have_no_products'
                        options={{
                          columns,
                          data: history.data.data,
                        }}
                      />
                    )
                  )
                ) : null}
              </>
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
