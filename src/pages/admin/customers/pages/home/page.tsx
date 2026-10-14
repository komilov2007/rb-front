import { Header } from './style'
import { usePage } from './usePage'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { FormBonus } from '@/components/forms/bonus'
import { InputSearch } from '@/components/inputs/input-search'

const Page = () => {
  const { t } = useTranslation()
  const {
    page,
    data,
    limit,
    columns,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    handleClickRow,
  } = usePage()

  return (
    <Stack width='100%' height='100%' flexGrow={1} overflow='hidden'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('list_of_customers')}{' '}
          <Typography
            variant='text'
            component='span'
            color={theme => theme.palette.allColors.PURPLE10}
          >
            {t('user', { count: data.data.count })}
          </Typography>
        </Typography>
        <Header>
          <InputSearch
            size='small'
            value={searchValue}
            onChange={handleSearch}
            sx={{ maxWidth: '350px' }}
            placeholder='search_for_customer_name_username_phone_number'
          />
          <FormBonus />
        </Header>
      </Box>
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        onRowClick={handleClickRow}
        emptyTitle='you_have_no_customers'
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
