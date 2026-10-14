import { Cards } from './style'
import Stack from '@mui/material/Stack'
import { Card } from './components/card'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { getPaymentList } from '@/apis/admin/payment'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getTitle } from '@/constants/domain-themes'

const Page = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.PAYMENT_LIST],
    queryFn: getPaymentList,
  })
  const hasAccessStripe = getTitle().stripe

  return (
    <Stack p='25px 20px' overflow='auto'>
      <Typography mb={{ xs: '9px', md: '18px' }} variant='title30' component='h2'>
        {t('payment_methods')}
      </Typography>
      <Cards>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i: number) => (
              <Skeleton
                key={i}
                variant='rounded'
                sx={{ height: '70px', width: '100%', borderRadius: '10px' }}
              />
            ))
          : data?.data.map(p =>
              p.state === 'STRIPE' && !hasAccessStripe ? null : <Card key={p.id} {...p} />,
            )}
      </Cards>
    </Stack>
  )
}

export default Page
