import { Card } from './style'
import Stack from '@mui/material/Stack'
import { Empty } from '@/components/empty'
import { getCards } from '@/apis/admin/atmos'
import Skeleton from '@mui/material/Skeleton'
import { useQuery } from '@tanstack/react-query'
import { getCreditCardIcon } from '@/utils/credit-card'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { AddCreditCard } from '@/components/forms/add-credit-card'
import { DeleteCreditCard } from '@/components/deletes/credit-card'

const Page = () => {
  const {
    data = { data: [] },
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: getCards,
    queryKey: [REACT_QUERY_KEYS.ATMOS_CARDS],
  })

  return (
    <>
      {isLoading || isFetching ? (
        <Stack width='100%' gap='15px' p='24px 32px'>
          <Stack width='100%' alignItems='flex-end'>
            <Skeleton height='40px' width='100%' variant='rounded' sx={{ maxWidth: '200px' }} />
          </Stack>
          <Stack component='ul' gap='10px' overflow='auto'>
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} height='80px' width='100%' variant='rounded' component='li' />
            ))}
          </Stack>
        </Stack>
      ) : data.data.length === 0 ? (
        <Stack flexGrow={1} justifyContent='center'>
          <Stack alignItems='center'>
            <Empty title='no_your_credit_cards' />
            <Stack mt='10px'>
              <AddCreditCard variant='profile-empty' />
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack width='100%' flexGrow={1} gap='15px' p='24px 32px'>
          <Stack alignItems='flex-end'>
            <AddCreditCard variant='profile' />
          </Stack>
          <Stack flexGrow={1} component='ul' gap='10px'>
            {data?.data.map(({ id, card_number }) => {
              const Icon = getCreditCardIcon(card_number)
              return (
                <Card key={id}>
                  <Stack gap='10px' alignItems='center' direction='row'>
                    <Icon />
                    {card_number}
                  </Stack>
                  <DeleteCreditCard id={id} />
                </Card>
              )
            })}
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default Page
