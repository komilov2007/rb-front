import Stack from '@mui/material/Stack'
import { useParams } from 'react-router-dom'
import { Orders } from './components/orders'
import { Card, Cards, Wrapper } from './style'
import { Spinner } from '@/components/spinner'
import { useQuery } from '@tanstack/react-query'
import { type ParamProps } from '@/types/params'
import { Customer } from './components/customer'
import Typography from '@mui/material/Typography'
import { getDetailCustomer } from '@/apis/admin/customer'
import { type DetailCustomerProps } from '@/types/customer'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconFile } from '@/assets/icons/file.svg'
import { ReactComponent as IconBucket } from '@/assets/icons/bucket.svg'
import { ReactComponent as IconDollar } from '@/assets/icons/dollar.svg'
import { ReactComponent as IconCash } from '@/assets/icons/cash.svg'
import { useTranslation } from 'react-i18next'

const Page = () => {
  const { t } = useTranslation()
  const { customerId } = useParams<ParamProps>()
  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.CUSTOMER_DETAIL, customerId],
    queryFn: async () => await getDetailCustomer(String(customerId)),
  })

  return (
    <Stack
      gap='18px'
      width='100%'
      flexGrow={1}
      height='100%'
      className='transparent'
      direction={{ xs: 'column', md: 'row' }}
      overflow={{ xs: 'auto', md: 'hidden' }}
    >
      {isLoading ? (
        <Spinner center />
      ) : (
        <>
          <Wrapper sx={{ maxWidth: { xs: '100%', md: '343px' } }}>
            <Customer {...(data?.data as DetailCustomerProps)} />
          </Wrapper>
          <Wrapper>
            <Stack sx={{ p: '20px 24px 22px' }}>
              <Typography
                mb='13px'
                component='h2'
                variant='title50'
                lineHeight='normal'
                textTransform='uppercase'
              >
                {t('order_history')}
              </Typography>
              <Cards
                sx={{
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                }}
              >
                <Card>
                  <IconFile />
                  <Typography variant='title70' component='h3'>
                    {data?.data.order_history.orders}
                  </Typography>
                  <Typography lineHeight='15px' variant='text'>
                    {t('number_of_orders')}
                  </Typography>
                </Card>
                <Card>
                  <IconBucket />
                  <Typography variant='title70' component='h3'>
                    {data?.data.order_history.successfull_orders}
                  </Typography>
                  <Typography lineHeight='15px' variant='text'>
                    {t('successful_order')}
                  </Typography>
                </Card>
                <Card>
                  <IconDollar />
                  <Typography variant='title70' component='h3'>
                    {data?.data.order_history.paid_amount}
                  </Typography>
                  <Typography lineHeight='15px' variant='text'>
                    {t('paid_amount')}
                  </Typography>
                </Card>
                <Card>
                  <IconCash />
                  <Typography variant='title70' component='h3'>
                    {data?.data.total_used_ball}
                  </Typography>
                  <Typography lineHeight='15px' variant='text'>
                    {t('used_bonus')}
                  </Typography>
                </Card>
              </Cards>
            </Stack>
            <Orders />
          </Wrapper>
        </>
      )}
    </Stack>
  )
}

export default Page
