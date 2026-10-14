import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { SelectReviewStatus } from '@/components/selects/select-review-status'

const Page = () => {
  const { t } = useTranslation()
  const {
    data,
    page,
    limit,
    status,
    columns,
    setStatus,
    isLoading,
    isFetching,
    handlePage,
    handleSort,
    handleLimit,
  } = usePage()

  return (
    <Stack width='100%' height='100%'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('reviews')}{' '}
          <Typography
            variant='text'
            component='span'
            color={theme => theme.palette.allColors.PURPLE10}
          >
            {data.data.count} {t('review_title')}
          </Typography>
        </Typography>
        <Header>
          <SelectReviewStatus value={status} onChange={setStatus} />
        </Header>
      </Box>
      <Table
        enableSorting
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle='no_reviews'
        onSortingChange={handleSort}
        options={{
          columns,
          data: data.data.results,
        }}
      />
      <Pagination
        page={page}
        limit={limit}
        disabled={isLoading}
        total={data.data.count}
        onChangePage={handlePage}
        onChangeLimit={handleLimit}
      />
    </Stack>
  )
}

export default Page
